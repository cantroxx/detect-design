export const campaign = {
  title: '디지털 탐정단 사건 파일',
  subtitle: '사건을 해결할수록 나만의 탐정 스타일과 다음 이야기의 첫 단서가 달라집니다.',
  cases: [
    {
      id: 'coupon-case',
      code: 'CASE 01',
      title: '사라진 칭찬 쿠폰',
      status: 'playing',
      summary: '기록과 현재 숫자가 맞지 않는 쿠폰 상자를 조사합니다.'
    },
    {
      id: 'library-card-case',
      code: 'CASE 02',
      title: '도서관 대출 카드의 빈칸',
      status: 'next',
      summary: '사라진 책이 아니라 비어 있는 기록 칸에서 다음 사건이 시작됩니다.'
    },
    {
      id: 'playground-time-case',
      code: 'CASE 03',
      title: '운동장 시간표의 두 이름',
      status: 'locked',
      summary: '여러 사건 기록이 모이면 같은 시간에 적힌 두 이름을 확인하게 됩니다.'
    }
  ],
  defaultProfile: {
    id: 'rookie',
    title: '새내기 탐정',
    trait: '관찰 시작',
    body: '아직 해결한 사건이 없습니다. 첫 사건을 마치면 탐정 스타일이 기록됩니다.',
    nextHook: 'CASE 01을 해결하면 다음 사건의 첫 제보 방식이 열립니다.'
  },
  profiles: {
    careful: {
      id: 'careful',
      title: '기록형 탐정',
      trait: '정확한 확인',
      body: '기록, 숫자, 물건의 차이를 차분히 비교하는 데 강합니다.',
      nextHook: 'CASE 02에서는 도서부 기록장이 먼저 열리고, 비어 있는 칸을 빠르게 발견합니다.'
    },
    kind: {
      id: 'kind',
      title: '공감형 탐정',
      trait: '관계 회복',
      body: '친구가 부끄럽지 않게 말하고, 함께 찾는 분위기를 만드는 데 강합니다.',
      nextHook: 'CASE 02에서는 친구가 먼저 작은 제보를 건네며, 대화 선택지가 하나 더 열립니다.'
    },
    reflective: {
      id: 'reflective',
      title: '성장형 탐정',
      trait: '다시 확인',
      body: '성급했던 판단을 되돌아보고, 다음에는 한 번 더 확인하려는 태도가 남습니다.',
      nextHook: 'CASE 02에서는 같은 실수를 피하기 위해 확인 체크리스트가 먼저 등장합니다.'
    }
  }
};

export const chapter = {
  id: 'coupon-case',
  code: 'CASE 01',
  title: '사라진 칭찬 쿠폰',
  subtitle: '분실인가, 오해인가',
  location: '4학년 교실',
  clock: '08:43 AM',
  sceneImage: './public/scenes/classroom-v001.png',
  mission: {
    menu: '조회 전 교실에서 시작된 작은 사건',
    intro: '친구들이 서로 의심하기 전에 사실을 먼저 확인하세요.',
    scene: '교실을 둘러보고 말과 기록이 맞는지 확인하세요.',
    board: '모은 단서를 연결해 쿠폰이 어디로 갔는지 설명하세요.',
    briefing: '사건 보고서를 완성한 뒤, 교실에 어떻게 말할지 정하세요.',
    ending: '확인한 사실을 어떤 태도로 말할지 선택하세요.'
  },
  introSlides: [
    {
      kicker: '08:37 AM · 조회 전',
      title: '비밀 쿠폰 상자',
      body:
        '칠판 옆 칭찬 쿠폰 상자는 매주 금요일 4학년 쿠폰 뽑기에 쓰입니다. 그런데 오늘 아침, 상자 속 숫자가 어제 기록과 맞지 않았습니다.'
    },
    {
      kicker: '08:40 AM · 교실이 조용해짐',
      title: '작은 의심',
      body:
        '누군가 “혹시 누가 가져간 거 아니야?”라고 말하자 교실이 조용해졌습니다. 아직 아무도 사실을 확인하지 않았습니다.'
    },
    {
      kicker: '08:43 AM · 탐정단 호출',
      title: '먼저 기록부터',
      body:
        '디지털 탐정단의 임무는 범인을 찾는 것이 아닙니다. 기록, 물건, 메모를 차례로 확인해 오해를 줄이는 것입니다.'
    }
  ],
  intro: [
    '아침 조회 시간, 칭찬 쿠폰 상자의 숫자가 맞지 않았어요.',
    '친구들은 조금씩 걱정하기 시작했어요. 누가 가져간 걸까요?',
    '디지털 탐정단은 먼저 기록을 확인하기로 했습니다.'
  ],
  hotspots: [
    {
      id: 'notice-board',
      label: '기록표',
      rect: { l: 15.8, t: 14.2, w: 5.4, h: 8.7 },
      clueId: 'record',
      prompt: '게시판 기록표에는 어제 마지막 남은 쿠폰 수가 적혀 있습니다.',
      dialogue: [
        {
          speaker: '민서',
          text: '어제 마지막에 내가 숫자를 적었어. 분명히 24장이었는데... 오늘은 다르대.'
        },
        {
          speaker: '나',
          text: '그럼 먼저 기록표를 확인하자. 기억보다 기록이 더 정확할 때가 많으니까.'
        },
        {
          speaker: '탐정 노트',
          text: '기록표에는 어제 남은 쿠폰이 24장이라고 적혀 있다.'
        }
      ]
    },
    {
      id: 'cleaning-chart',
      label: '청소 당번표',
      rect: { l: 37.1, t: 19.2, w: 6.9, h: 15.8 },
      clueId: 'cleaning',
      prompt: '청소 당번표에는 방과 후 교실을 사용한 모둠이 표시되어 있습니다.',
      dialogue: [
        {
          speaker: '준호',
          text: '방과 후에 발표 준비 모둠이 교실에 남아 있었대. 쿠폰 상자 근처 책상도 썼고.'
        },
        {
          speaker: '나',
          text: '누가 있었다는 말만으로 의심하면 안 돼. 그때 무엇을 했는지 더 확인해야 해.'
        },
        {
          speaker: '탐정 노트',
          text: '청소 당번표에는 발표 준비 모둠이 방과 후 교실을 사용했다고 적혀 있다.'
        }
      ]
    },
    {
      id: 'coupon-box',
      label: '쿠폰 상자',
      rect: { l: 88.1, t: 36.4, w: 8.4, h: 11.4 },
      clueId: 'box',
      prompt: '쿠폰 상자 안의 쿠폰 수가 기록표와 다릅니다.',
      dialogue: [
        {
          speaker: '선생님',
          text: '상자는 그대로 있었지만, 안에 든 쿠폰 수가 기록과 다르구나. 바로 결론을 내리지는 말자.'
        },
        {
          speaker: '나',
          text: '현재 숫자를 적어 둘게요. 어제 기록과 비교하면 차이가 보일 거예요.'
        },
        {
          speaker: '탐정 노트',
          text: '쿠폰 상자에는 현재 18장이 남아 있다.'
        }
      ]
    },
    {
      id: 'presentation-table',
      label: '발표 준비 자료',
      rect: { l: 56.4, t: 75.3, w: 22.7, h: 13.2 },
      clueId: 'memo',
      prompt: '발표 준비 자료 옆에 작은 메모가 놓여 있습니다.',
      dialogue: [
        {
          speaker: '민서',
          text: '여기 노란 메모지가 있어. 발표 자료 봉투 옆에 붙어 있었나 봐.'
        },
        {
          speaker: '나',
          text: '쿠폰 봉투라는 말이 보인다. 이건 숫자가 줄어든 이유와 연결될 수 있어.'
        },
        {
          speaker: '탐정 노트',
          text: '메모에는 쿠폰 봉투를 발표 자료 봉투와 같이 옮겼다고 적혀 있다.'
        }
      ]
    }
  ],
  clues: [
    {
      id: 'box',
      title: '쿠폰 상자',
      type: '물건',
      body: '상자에는 쿠폰이 18장 남아 있어요. 어제보다 6장이 부족합니다.',
      short: '현재 18장'
    },
    {
      id: 'record',
      title: '쿠폰 기록표',
      type: '기록',
      body: '어제 마지막 기록에는 쿠폰이 24장 남았다고 적혀 있어요.',
      short: '어제 24장'
    },
    {
      id: 'cleaning',
      title: '청소 당번표',
      type: '기록',
      body: '어제 방과 후 발표 준비 모둠이 교실에서 자료를 정리했습니다.',
      short: '발표 모둠 사용'
    },
    {
      id: 'memo',
      title: '발표 준비 메모',
      type: '메모',
      body: '“쿠폰 봉투도 발표 자료 봉투랑 같이 옮김. 내일 꼭 확인!”이라고 적혀 있어요.',
      short: '봉투가 섞임'
    }
  ],
  links: [
    {
      a: 'record',
      b: 'box',
      reason: '기록표의 24장과 상자의 18장이 달라서, 먼저 숫자가 맞지 않는다는 사실을 확인했어요.'
    },
    {
      a: 'cleaning',
      b: 'memo',
      reason: '방과 후 발표 준비 모둠이 교실을 사용했고, 그때 봉투를 옮겼다는 메모가 있어요.'
    },
    {
      a: 'memo',
      b: 'box',
      reason: '쿠폰 봉투가 발표 자료 봉투와 함께 옮겨져서 상자 안 쿠폰 수가 줄어든 것으로 보입니다.'
    }
  ],
  finalChoice: {
    title: '교실에 말하기 전',
    body:
      '증거를 모아 보니 쿠폰은 사라진 것이 아니라 발표 자료 봉투에 섞인 것으로 보입니다. 이제 탐정단은 교실에 어떻게 말할지 정해야 합니다.'
  },
  briefing: {
    title: '사건 보고서 작성',
    body:
      '증거 보드만으로 사건은 끝나지 않습니다. 탐정단은 친구들이 오해하지 않도록 사실을 순서대로 정리해야 합니다.',
    slots: ['어제 기록', '오늘 확인', '가능한 이유', '말하는 태도'],
    correctOrder: ['record', 'difference', 'reason', 'care'],
    lines: [
      {
        id: 'record',
        label: '어제 기록',
        text: '어제 쿠폰 기록표에는 24장이 남았다고 적혀 있다.'
      },
      {
        id: 'difference',
        label: '오늘 확인',
        text: '오늘 쿠폰 상자에는 18장이 있어 기록보다 6장이 적다.'
      },
      {
        id: 'reason',
        label: '가능한 이유',
        text: '메모를 보면 쿠폰 봉투가 발표 자료 봉투와 함께 옮겨졌을 가능성이 크다.'
      },
      {
        id: 'care',
        label: '말하는 태도',
        text: '그래서 누군가를 바로 의심하지 말고 함께 봉투를 확인하자고 말한다.'
      },
      {
        id: 'blame',
        label: '성급한 추측',
        text: '발표 준비 모둠이 있었으니 그 친구들이 가져갔다고 말한다.'
      },
      {
        id: 'skip',
        label: '부족한 설명',
        text: '쿠폰이 줄었으니 자세한 이유는 나중에 생각해도 된다.'
      }
    ]
  },
  endings: {
    careful: {
      choice: '선생님과 기록을 확인한다',
      title: '꼼꼼한 탐정',
      styleId: 'careful',
      body: '기록과 봉투를 선생님과 함께 확인했어요. 쿠폰은 발표 자료 봉투 안에서 발견되었습니다.',
      lesson: '확실한 기록을 확인하면 오해를 줄일 수 있어요.'
    },
    kind: {
      choice: '친구들과 차분히 함께 찾는다',
      title: '따뜻한 탐정',
      styleId: 'kind',
      body: '친구들이 서로 의심하지 않도록 차분히 설명하고, 다 같이 봉투를 정리했어요.',
      lesson: '사실을 말할 때도 친구의 마음을 살피면 더 좋은 해결이 됩니다.'
    },
    rushed: {
      choice: '바로 모두에게 말한다',
      title: '다시 확인하는 탐정',
      styleId: 'reflective',
      body: '성급히 말해서 친구가 잠깐 속상했어요. 하지만 다시 기록을 확인하며 문제를 바로잡았습니다.',
      lesson: '빨리 말하기보다 한 번 더 확인하는 습관이 중요해요.'
    }
  }
};

export const requiredClueIds = chapter.clues.map((clue) => clue.id);
