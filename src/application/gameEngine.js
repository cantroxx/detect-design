import {
  campaign,
  cases,
  firstCaseId,
  getCaseById,
  getCaseHotspots,
  getCaseIndex,
  getEvidenceItems,
  getNextCaseId
} from '../domain/gameData.js';

const emptyStyleScores = () =>
  Object.fromEntries(Object.keys(campaign.profiles).map((styleId) => [styleId, 0]));

const emptyCampaignStats = () =>
  Object.fromEntries(Object.keys(campaign.statLabels).map((statId) => [statId, 0]));

const createCaseProgress = () => ({
  collected: [],
  selected: null,
  links: [],
  briefing: [],
  briefingReady: false,
  ending: null
});

export function createInitialState() {
  return {
    screen: 'menu',
    activeCaseId: firstCaseId,
    introIndex: 0,
    caseProgress: { [firstCaseId]: createCaseProgress() },
    caseRecords: [],
    styleScores: emptyStyleScores(),
    campaignStats: emptyCampaignStats(),
    dialogue: null,
    message: '사건 파일 대기 중'
  };
}

export function getActiveCase(state) {
  return getCaseById(state.activeCaseId);
}

export function getCaseProgress(state, caseId = state.activeCaseId) {
  return state.caseProgress[caseId] ?? createCaseProgress();
}

export function startCase(previousState = createInitialState(), caseId = firstCaseId) {
  const targetCase = getCaseById(caseId);
  if (!isCaseUnlocked(previousState, targetCase.id)) {
    return {
      ...previousState,
      message: '이전 사건을 먼저 해결해야 열리는 사건 파일입니다.'
    };
  }

  return {
    ...previousState,
    activeCaseId: targetCase.id,
    screen: 'intro',
    introIndex: 0,
    dialogue: null,
    caseProgress: {
      ...previousState.caseProgress,
      [targetCase.id]: createCaseProgress()
    },
    message: `${targetCase.code} 프롤로그`
  };
}

export function showMenu(state) {
  return {
    ...state,
    screen: 'menu',
    dialogue: null,
    message: campaign.title
  };
}

export function advanceIntro(state) {
  const activeCase = getActiveCase(state);
  const nextIndex = state.introIndex + 1;
  if (nextIndex < activeCase.introSlides.length) {
    return {
      ...state,
      introIndex: nextIndex,
      message: `${activeCase.code} 프롤로그 ${nextIndex + 1}/${activeCase.introSlides.length}`
    };
  }
  return enterScene(state);
}

export function skipIntro(state) {
  return enterScene(state);
}

function enterScene(state) {
  const activeCase = getActiveCase(state);
  return {
    ...state,
    screen: 'scene',
    introIndex: activeCase.introSlides.length - 1,
    message: activeCase.mission.scene
  };
}

export function openHotspot(state, clueId) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const hotspot = getCaseHotspots(activeCase).find((item) => item.clueId === clueId);
  const clue = getEvidenceItems(activeCase).find((item) => item.id === clueId);
  if (!hotspot || !clue) return state;

  if (progress.collected.includes(clueId)) {
    return {
      ...state,
      dialogue: {
        title: hotspot.label,
        index: 0,
        rewardClueId: null,
        beats: [
          {
            speaker: '탐정 노트',
            text: `이미 기록한 단서입니다. ${clue.title}: ${clue.short}`
          }
        ]
      },
      message: `다시 확인: ${hotspot.label}`
    };
  }

  return {
    ...state,
    dialogue: {
      title: hotspot.label,
      index: 0,
      rewardClueId: clueId,
      beats: hotspot.dialogue
    },
    message: `조사 중: ${hotspot.label}`
  };
}

export function advanceDialogue(state) {
  if (!state.dialogue) return state;
  const nextIndex = state.dialogue.index + 1;
  if (nextIndex < state.dialogue.beats.length) {
    return {
      ...state,
      dialogue: {
        ...state.dialogue,
        index: nextIndex
      }
    };
  }

  const rewardClueId = state.dialogue.rewardClueId;
  const nextState = {
    ...state,
    dialogue: null
  };

  if (!rewardClueId) return nextState;
  return collectClue(nextState, rewardClueId);
}

export function collectClue(state, clueId) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const clue = getEvidenceItems(activeCase).find((item) => item.id === clueId);
  if (!clue) return state;
  if (progress.collected.includes(clueId)) {
    return {
      ...state,
      message: `이미 확인한 단서예요: ${clue.title}`
    };
  }
  return updateCaseProgress(state, {
    collected: [...progress.collected, clueId]
  }, `탐정 노트 갱신: ${clue.title}`);
}

export function selectClue(state, clueId) {
  const progress = getCaseProgress(state);
  if (!progress.collected.includes(clueId)) {
    return { ...state, message: '아직 찾지 못한 단서예요.' };
  }
  if (!progress.selected) {
    return updateCaseProgress(state, { selected: clueId }, '연결할 다른 단서를 골라 보세요.');
  }
  if (progress.selected === clueId) {
    return updateCaseProgress(state, { selected: null }, '선택을 취소했어요.');
  }
  return connectClues(state, progress.selected, clueId);
}

export function connectClues(state, a, b) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const key = linkKey(a, b);
  if (progress.links.includes(key)) {
    return updateCaseProgress(state, { selected: null }, '이미 연결한 단서예요.');
  }
  const link = activeCase.links.find((item) => linkKey(item.a, item.b) === key);
  if (!link) {
    return updateCaseProgress(
      state,
      { selected: null },
      '아직 두 단서 사이의 관계가 부족해요. 다른 단서를 확인해 볼까요?'
    );
  }
  return updateCaseProgress(
    state,
    {
      selected: null,
      links: [...progress.links, key]
    },
    link.reason
  );
}

export function openBriefing(state) {
  const activeCase = getActiveCase(state);
  if (!isSolved(state)) {
    return {
      ...state,
      message: '증거 보드의 관계를 먼저 모두 확인하세요.'
    };
  }
  return {
    ...state,
    screen: 'briefing',
    message: activeCase.mission.briefing
  };
}

export function selectBriefingLine(state, lineId) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  if (!activeCase.briefing.lines.some((line) => line.id === lineId)) return state;
  if (progress.briefingReady) {
    return {
      ...state,
      message: '보고서는 이미 완성되었습니다. 이제 말하는 방식을 선택하세요.'
    };
  }
  if (progress.briefing.includes(lineId)) {
    return {
      ...state,
      message: '이미 보고서에 넣은 문장입니다.'
    };
  }
  if (progress.briefing.length >= activeCase.briefing.correctOrder.length) {
    return {
      ...state,
      message: '보고서 칸이 가득 찼습니다. 다시 쓰려면 지우기를 누르세요.'
    };
  }
  return updateCaseProgress(
    state,
    { briefing: [...progress.briefing, lineId] },
    '보고서 문장을 추가했습니다.'
  );
}

export function removeBriefingLine(state, lineId) {
  const progress = getCaseProgress(state);
  if (progress.briefingReady) return state;
  return updateCaseProgress(
    state,
    { briefing: progress.briefing.filter((id) => id !== lineId) },
    '보고서 문장을 뺐습니다.'
  );
}

export function clearBriefing(state) {
  const progress = getCaseProgress(state);
  if (progress.briefingReady) return state;
  return updateCaseProgress(state, { briefing: [] }, '보고서를 비웠습니다.');
}

export function submitBriefing(state) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const expected = activeCase.briefing.correctOrder;
  if (progress.briefing.length < expected.length) {
    return {
      ...state,
      message: `보고서 문장 ${expected.length}개를 순서대로 채워야 합니다.`
    };
  }
  const correct = expected.every((lineId, index) => progress.briefing[index] === lineId);
  if (!correct) {
    return updateCaseProgress(
      state,
      { briefing: [] },
      '순서가 맞지 않습니다. 먼저 사실을 확인하고, 그다음 이유와 말하는 방법을 다시 생각해 보세요.'
    );
  }
  return updateCaseProgress(
    state,
    { briefingReady: true },
    '사건 보고서 완성. 이제 어떻게 말할지 선택하세요.'
  );
}

export function canOpenBoard(state) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  return getEvidenceItems(activeCase).every((clue) => progress.collected.includes(clue.id));
}

export function isSolved(state) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  return activeCase.links.every((item) => progress.links.includes(linkKey(item.a, item.b)));
}

export function chooseEnding(state, ending) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const endingData = activeCase.endings[ending];
  if (!endingData) return state;
  if (!progress.briefingReady) {
    return {
      ...state,
      message: '사건 보고서를 완성한 뒤 말하는 방식을 선택하세요.'
    };
  }
  const recordedState = recordCaseOutcome(state, activeCase, ending, endingData);
  const recordedProgress = getCaseProgress(recordedState);
  return {
    ...recordedState,
    screen: 'ending',
    caseProgress: {
      ...recordedState.caseProgress,
      [activeCase.id]: {
        ...recordedProgress,
        ending
      }
    },
    message: `사건 해결: ${endingData.title}`
  };
}

export function isCaseUnlocked(state, caseId) {
  const index = getCaseIndex(caseId);
  if (index <= 0) return true;
  const previous = cases[index - 1];
  return state.caseRecords.some((record) => record.caseId === previous.id);
}

export function getCaseStatus(state, caseId) {
  if (state.caseRecords.some((record) => record.caseId === caseId)) return '해결됨';
  if (isCaseUnlocked(state, caseId)) return '진행 가능';
  return '잠김';
}

export function getNextCase(state) {
  const next = cases.find((caseItem) => !state.caseRecords.some((record) => record.caseId === caseItem.id));
  return next && isCaseUnlocked(state, next.id) ? next : null;
}

export function isCampaignComplete(state) {
  return cases.every((caseItem) => state.caseRecords.some((record) => record.caseId === caseItem.id));
}

export function getDetectiveProfile(state) {
  const entries = Object.entries(state.styleScores ?? {});
  const best = entries.reduce(
    (top, current) => (current[1] > top[1] ? current : top),
    ['', 0]
  );
  if (!best[0] || best[1] === 0) return campaign.defaultProfile;
  return campaign.profiles[best[0]] ?? campaign.defaultProfile;
}

export function resolveCampaignEnding(state) {
  const stats = state.campaignStats ?? emptyCampaignStats();
  if (stats.rumorRisk >= 3) return campaign.finalEndings.rumor;
  if (stats.caution >= 8 && stats.rumorRisk <= 0) return campaign.finalEndings.guardian;
  if (stats.record >= 6 && stats.caution >= 3) return campaign.finalEndings.record;
  if (stats.empathy >= 8 && stats.teamwork >= 4) return campaign.finalEndings.teamwork;
  if (stats.record >= 4 && stats.empathy >= 4 && stats.teamwork >= 4) return campaign.finalEndings.balanced;
  if (stats.empathy >= 6) return campaign.finalEndings.empathy;
  return campaign.finalEndings.growth;
}

export function linkKey(a, b) {
  return [a, b].sort().join('__');
}

function updateCaseProgress(state, patch, message) {
  const progress = getCaseProgress(state);
  return {
    ...state,
    caseProgress: {
      ...state.caseProgress,
      [state.activeCaseId]: {
        ...progress,
        ...patch
      }
    },
    message
  };
}

function recordCaseOutcome(state, activeCase, ending, endingData) {
  const alreadyRecorded = state.caseRecords.some((record) => record.caseId === activeCase.id);
  if (alreadyRecorded) return state;

  const styleId = endingData.styleId ?? ending;
  const profile = campaign.profiles[styleId] ?? campaign.defaultProfile;
  const nextCaseId = getNextCaseId(activeCase.id);
  return {
    ...state,
    caseRecords: [
      ...state.caseRecords,
      {
        caseId: activeCase.id,
        code: activeCase.code,
        title: activeCase.title,
        ending,
        endingTitle: endingData.title,
        choice: endingData.choice,
        styleId,
        styleTitle: profile.title
      }
    ],
    styleScores: {
      ...state.styleScores,
      [styleId]: (state.styleScores[styleId] ?? 0) + 1
    },
    campaignStats: applyStatDeltas(state.campaignStats, endingData.statDeltas),
    caseProgress: {
      ...state.caseProgress,
      ...(nextCaseId && !state.caseProgress[nextCaseId] ? { [nextCaseId]: createCaseProgress() } : {})
    }
  };
}

function applyStatDeltas(stats, deltas = {}) {
  const next = { ...emptyCampaignStats(), ...(stats ?? {}) };
  Object.entries(deltas).forEach(([key, value]) => {
    next[key] = Math.max(0, (next[key] ?? 0) + value);
  });
  return next;
}
