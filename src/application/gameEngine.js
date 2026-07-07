import { chapter, requiredClueIds } from '../domain/gameData.js';

export function createInitialState() {
  return {
    screen: 'menu',
    introIndex: 0,
    collected: [],
    selected: null,
    links: [],
    dialogue: null,
    message: '사건 파일 대기 중',
    ending: null
  };
}

export function startCase() {
  return {
    ...createInitialState(),
    screen: 'intro',
    message: `${chapter.code} 프롤로그`
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

export function canOpenBoard(state) {
  return requiredClueIds.every((id) => state.collected.includes(id));
}

export function isSolved(state) {
  return chapter.links.every((item) => state.links.includes(linkKey(item.a, item.b)));
}

export function chooseEnding(state, ending) {
  const endingData = chapter.endings[ending];
  if (!endingData) return state;
  return {
    ...state,
    screen: 'ending',
    ending,
    message: `사건 해결: ${endingData.title}`
  };
}

export function linkKey(a, b) {
  return [a, b].sort().join('__');
}
