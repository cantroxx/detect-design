import { campaign, chapter, requiredClueIds } from '../domain/gameData.js';

const emptyStyleScores = () =>
  Object.fromEntries(Object.keys(campaign.profiles).map((styleId) => [styleId, 0]));

export function createInitialState() {
  return {
    screen: 'menu',
    introIndex: 0,
    collected: [],
    selected: null,
    links: [],
    briefing: [],
    briefingReady: false,
    caseRecords: [],
    styleScores: emptyStyleScores(),
    dialogue: null,
    message: '사건 파일 대기 중',
    ending: null
  };
}

export function startCase(previousState = createInitialState()) {
  const preserved = preserveCampaignState(previousState);
  return {
    ...createInitialState(),
    ...preserved,
    screen: 'intro',
    message: `${chapter.code} 프롤로그`
  };
}

export function showMenu(state) {
  return {
    ...state,
    screen: 'menu',
    selected: null,
    dialogue: null,
    message: campaign.title
  };
}

export function advanceIntro(state) {
  const nextIndex = state.introIndex + 1;
  if (nextIndex < chapter.introSlides.length) {
    return {
      ...state,
      introIndex: nextIndex,
      message: `${chapter.code} 프롤로그 ${nextIndex + 1}/${chapter.introSlides.length}`
    };
  }
  return enterScene(state);
}

export function skipIntro(state) {
  return enterScene(state);
}

function enterScene(state) {
  return {
    ...state,
    screen: 'scene',
    introIndex: chapter.introSlides.length - 1,
    message: chapter.mission.scene
  };
}

export function openHotspot(state, clueId) {
  const hotspot = chapter.hotspots.find((item) => item.clueId === clueId);
  const clue = chapter.clues.find((item) => item.id === clueId);
  if (!hotspot || !clue) return state;

  if (state.collected.includes(clueId)) {
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
  const clue = chapter.clues.find((item) => item.id === clueId);
  if (!clue) return state;
  if (state.collected.includes(clueId)) {
    return {
      ...state,
      message: `이미 확인한 단서예요: ${clue.title}`
    };
  }
  return {
    ...state,
    collected: [...state.collected, clueId],
    message: `탐정 노트 갱신: ${clue.title}`
  };
}

export function selectClue(state, clueId) {
  if (!state.collected.includes(clueId)) {
    return { ...state, message: '아직 찾지 못한 단서예요.' };
  }
  if (!state.selected) {
    return { ...state, selected: clueId, message: '연결할 다른 단서를 골라 보세요.' };
  }
  if (state.selected === clueId) {
    return { ...state, selected: null, message: '선택을 취소했어요.' };
  }
  return connectClues(state, state.selected, clueId);
}

export function connectClues(state, a, b) {
  const key = linkKey(a, b);
  if (state.links.includes(key)) {
    return { ...state, selected: null, message: '이미 연결한 단서예요.' };
  }
  const link = chapter.links.find((item) => linkKey(item.a, item.b) === key);
  if (!link) {
    return {
      ...state,
      selected: null,
      message: '아직 두 단서 사이의 관계가 부족해요. 다른 단서를 확인해 볼까요?'
    };
  }
  return {
    ...state,
    selected: null,
    links: [...state.links, key],
    message: link.reason
  };
}

export function openBriefing(state) {
  if (!isSolved(state)) {
    return {
      ...state,
      message: '증거 보드의 관계를 먼저 모두 확인하세요.'
    };
  }
  return {
    ...state,
    screen: 'briefing',
    message: chapter.mission.briefing
  };
}

export function selectBriefingLine(state, lineId) {
  if (!chapter.briefing.lines.some((line) => line.id === lineId)) return state;
  if (state.briefingReady) {
    return {
      ...state,
      message: '보고서는 이미 완성되었습니다. 이제 말하는 방식을 선택하세요.'
    };
  }
  if (state.briefing.includes(lineId)) {
    return {
      ...state,
      message: '이미 보고서에 넣은 문장입니다.'
    };
  }
  if (state.briefing.length >= chapter.briefing.correctOrder.length) {
    return {
      ...state,
      message: '보고서 칸이 가득 찼습니다. 다시 쓰려면 지우기를 누르세요.'
    };
  }
  return {
    ...state,
    briefing: [...state.briefing, lineId],
    message: '보고서 문장을 추가했습니다.'
  };
}

export function removeBriefingLine(state, lineId) {
  if (state.briefingReady) return state;
  return {
    ...state,
    briefing: state.briefing.filter((id) => id !== lineId),
    message: '보고서 문장을 뺐습니다.'
  };
}

export function clearBriefing(state) {
  if (state.briefingReady) return state;
  return {
    ...state,
    briefing: [],
    message: '보고서를 비웠습니다.'
  };
}

export function submitBriefing(state) {
  const expected = chapter.briefing.correctOrder;
  if (state.briefing.length < expected.length) {
    return {
      ...state,
      message: `보고서 문장 ${expected.length}개를 순서대로 채워야 합니다.`
    };
  }
  const correct = expected.every((lineId, index) => state.briefing[index] === lineId);
  if (!correct) {
    return {
      ...state,
      briefing: [],
      message: '순서가 맞지 않습니다. 기록 → 오늘 확인 → 이유 → 태도 순서로 다시 정리하세요.'
    };
  }
  return {
    ...state,
    briefingReady: true,
    message: '사건 보고서 완성. 이제 교실에 어떻게 말할지 선택하세요.'
  };
}

export function canOpenBoard(state) {
  return requiredClueIds.every((id) => state.collected.includes(id));
}

export function isSolved(state) {
  return chapter.links.every((item) => state.links.includes(linkKey(item.a, item.b)));
}

export function chooseEnding(state, ending) {
  const endingData = chapter.endings[ending];
  if (!endingData) return state;
  if (!state.briefingReady) {
    return {
      ...state,
      message: '사건 보고서를 완성한 뒤 말하는 방식을 선택하세요.'
    };
  }
  const recordedState = recordCaseOutcome(state, ending, endingData);
  return {
    ...recordedState,
    screen: 'ending',
    ending,
    message: `사건 해결: ${endingData.title}`
  };
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

export function linkKey(a, b) {
  return [a, b].sort().join('__');
}

function preserveCampaignState(state) {
  return {
    caseRecords: state.caseRecords ?? [],
    styleScores: { ...emptyStyleScores(), ...(state.styleScores ?? {}) }
  };
}

function recordCaseOutcome(state, ending, endingData) {
  const alreadyRecorded = state.caseRecords.some((record) => record.caseId === chapter.id);
  if (alreadyRecorded) return state;

  const styleId = endingData.styleId ?? ending;
  const profile = campaign.profiles[styleId] ?? campaign.defaultProfile;
  return {
    ...state,
    caseRecords: [
      ...state.caseRecords,
      {
        caseId: chapter.id,
        code: chapter.code,
        title: chapter.title,
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
    }
  };
}
