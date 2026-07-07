const styleEndings = {
  careful: {
    styleId: 'careful',
    statDeltas: { record: 2, caution: 1 },
    title: '꼼꼼한 탐정'
  },
  kind: {
    styleId: 'kind',
    statDeltas: { empathy: 2, teamwork: 1 },
    title: '따뜻한 탐정'
  },
  rushed: {
    styleId: 'reflective',
    statDeltas: { caution: 1, rumorRisk: 1 },
    title: '다시 확인하는 탐정'
  }
};

export const cases = [
  {
    id: 'coupon-case',
    code: 'CASE 01',
    title: '사라진 칭찬 쿠폰',
    subtitle: '분실인가, 오해인가',
    location: '4학년 교실',
    clock: '08:43 AM',
    sceneImage: './public/scenes/classroom-v001.png',
    summary: '기록과 현재 숫자가 맞지 않는 쿠폰 상자를 조사합니다.',
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
    hotspots: [
      {
        id: 'notice-board',
        label: '기록표',
        rect: { l: 15.8, t: 14.2, w: 5.4, h: 8.7 },
        clueId: 'record',
        dialogue: [
          { speaker: '민서', text: '어제 마지막에 내가 숫자를 적었어. 분명히 24장이었는데... 오늘은 다르대.' },
          { speaker: '나', text: '그럼 먼저 기록표를 확인하자. 기억보다 기록이 더 정확할 때가 많으니까.' },
          { speaker: '탐정 노트', text: '기록표에는 어제 남은 쿠폰이 24장이라고 적혀 있다.' }
        ]
      },
      {
        id: 'cleaning-chart',
        label: '청소 당번표',
        rect: { l: 37.1, t: 19.2, w: 6.9, h: 15.8 },
        clueId: 'cleaning',
        dialogue: [
          { speaker: '준호', text: '방과 후에 발표 준비 모둠이 교실에 남아 있었대. 쿠폰 상자 근처 책상도 썼고.' },
          { speaker: '나', text: '누가 있었다는 말만으로 의심하면 안 돼. 그때 무엇을 했는지 더 확인해야 해.' },
          { speaker: '탐정 노트', text: '청소 당번표에는 발표 준비 모둠이 방과 후 교실을 사용했다고 적혀 있다.' }
        ]
      },
      {
        id: 'coupon-box',
        label: '쿠폰 상자',
        rect: { l: 88.1, t: 36.4, w: 8.4, h: 11.4 },
        clueId: 'box',
        dialogue: [
          { speaker: '선생님', text: '상자는 그대로 있었지만, 안에 든 쿠폰 수가 기록과 다르구나. 바로 결론을 내리지는 말자.' },
          { speaker: '나', text: '현재 숫자를 적어 둘게요. 어제 기록과 비교하면 차이가 보일 거예요.' },
          { speaker: '탐정 노트', text: '쿠폰 상자에는 현재 18장이 남아 있다.' }
        ]
      },
      {
        id: 'presentation-table',
        label: '발표 준비 자료',
        rect: { l: 56.4, t: 75.3, w: 22.7, h: 13.2 },
        clueId: 'memo',
        dialogue: [
          { speaker: '민서', text: '여기 노란 메모지가 있어. 발표 자료 봉투 옆에 붙어 있었나 봐.' },
          { speaker: '나', text: '쿠폰 봉투라는 말이 보인다. 이건 숫자가 줄어든 이유와 연결될 수 있어.' },
          { speaker: '탐정 노트', text: '메모에는 쿠폰 봉투를 발표 자료 봉투와 같이 옮겼다고 적혀 있다.' }
        ]
      }
    ],
    clues: [
      { id: 'box', title: '쿠폰 상자', type: '물건', body: '상자에는 쿠폰이 18장 남아 있어요. 어제보다 6장이 부족합니다.', short: '현재 18장' },
      { id: 'record', title: '쿠폰 기록표', type: '기록', body: '어제 마지막 기록에는 쿠폰이 24장 남았다고 적혀 있어요.', short: '어제 24장' },
      { id: 'cleaning', title: '청소 당번표', type: '기록', body: '어제 방과 후 발표 준비 모둠이 교실에서 자료를 정리했습니다.', short: '발표 모둠 사용' },
      { id: 'memo', title: '발표 준비 메모', type: '메모', body: '“쿠폰 봉투도 발표 자료 봉투랑 같이 옮김. 내일 꼭 확인!”이라고 적혀 있어요.', short: '봉투가 섞임' }
    ],
    links: [
      { a: 'record', b: 'box', reason: '기록표의 24장과 상자의 18장이 달라서, 먼저 숫자가 맞지 않는다는 사실을 확인했어요.' },
      { a: 'cleaning', b: 'memo', reason: '방과 후 발표 준비 모둠이 교실을 사용했고, 그때 봉투를 옮겼다는 메모가 있어요.' },
      { a: 'memo', b: 'box', reason: '쿠폰 봉투가 발표 자료 봉투와 함께 옮겨져서 상자 안 쿠폰 수가 줄어든 것으로 보입니다.' }
    ],
    finalChoice: {
      title: '교실에 말하기 전',
      body:
        '증거를 모아 보니 쿠폰은 사라진 것이 아니라 발표 자료 봉투에 섞인 것으로 보입니다. 이제 탐정단은 교실에 어떻게 말할지 정해야 합니다.'
    },
    briefing: {
      title: '사건 보고서 작성',
      body: '친구들이 오해하지 않도록 사실을 순서대로 정리해야 합니다.',
      reportTitle: '4학년 쿠폰 사건 보고서',
      slots: ['어제 기록', '오늘 확인', '가능한 이유', '말하는 태도'],
      correctOrder: ['record', 'difference', 'reason', 'care'],
      lines: [
        { id: 'record', label: '어제 기록', text: '어제 쿠폰 기록표에는 24장이 남았다고 적혀 있다.' },
        { id: 'difference', label: '오늘 확인', text: '오늘 쿠폰 상자에는 18장이 있어 기록보다 6장이 적다.' },
        { id: 'reason', label: '가능한 이유', text: '메모를 보면 쿠폰 봉투가 발표 자료 봉투와 함께 옮겨졌을 가능성이 크다.' },
        { id: 'care', label: '말하는 태도', text: '그래서 누군가를 바로 의심하지 말고 함께 봉투를 확인하자고 말한다.' },
        { id: 'blame', label: '성급한 추측', text: '발표 준비 모둠이 있었으니 그 친구들이 가져갔다고 말한다.' },
        { id: 'skip', label: '부족한 설명', text: '쿠폰이 줄었으니 자세한 이유는 나중에 생각해도 된다.' }
      ]
    },
    endings: {
      careful: {
        ...styleEndings.careful,
        choice: '선생님과 기록을 확인한다',
        body: '기록과 봉투를 선생님과 함께 확인했어요. 쿠폰은 발표 자료 봉투 안에서 발견되었습니다.',
        lesson: '확실한 기록을 확인하면 오해를 줄일 수 있어요.'
      },
      kind: {
        ...styleEndings.kind,
        choice: '친구들과 차분히 함께 찾는다',
        body: '친구들이 서로 의심하지 않도록 차분히 설명하고, 다 같이 봉투를 정리했어요.',
        lesson: '사실을 말할 때도 친구의 마음을 살피면 더 좋은 해결이 됩니다.'
      },
      rushed: {
        ...styleEndings.rushed,
        choice: '바로 모두에게 말한다',
        body: '성급히 말해서 친구가 잠깐 속상했어요. 하지만 다시 기록을 확인하며 문제를 바로잡았습니다.',
        lesson: '빨리 말하기보다 한 번 더 확인하는 습관이 중요해요.'
      }
    }
  },
  {
    id: 'library-card-case',
    code: 'CASE 02',
    title: '도서관 대출 카드의 빈칸',
    subtitle: '사라진 책인가, 빠진 기록인가',
    location: '4학년 도서관',
    clock: '10:15 AM',
    sceneImage: './public/scenes/library-v001.png',
    summary: '도서관 대출 카드에 빈칸이 생기고, 한 권의 책이 사라진 것처럼 보입니다.',
    mission: {
      menu: '도서관 기록장에서 시작된 두 번째 사건',
      intro: '책을 가져간 친구를 찾기 전에 기록이 왜 비었는지 확인하세요.',
      scene: '도서관의 반납함, 책장, 대출대, 책갈피를 살펴보세요.',
      board: '대출 카드의 빈칸과 반납함의 흔적을 연결하세요.',
      briefing: '책이 사라진 것처럼 보인 이유를 보고서로 정리하세요.',
      ending: '도서관에서 친구들에게 어떻게 말할지 선택하세요.'
    },
    introSlides: [
      { kicker: '10:12 AM · 독서 시간', title: '빈칸 하나', body: '도서부 기록장에 책 한 권의 대출 이름이 비어 있습니다. 친구들은 누가 몰래 가져갔다고 수군거립니다.' },
      { kicker: '10:14 AM · 반납함 앞', title: '닫힌 반납함', body: '반납함 안쪽에는 책 모서리처럼 보이는 것이 살짝 보입니다. 하지만 기록에는 아직 반납 표시가 없습니다.' },
      { kicker: '10:15 AM · 탐정단 기록', title: '책보다 먼저 기록', body: '대출 카드, 반납함, 책갈피, 책장 위치를 차례로 확인하면 빈칸의 이유를 찾을 수 있습니다.' }
    ],
    hotspots: [
      {
        id: 'library-card',
        label: '대출 카드',
        rect: { l: 58.5, t: 40.5, w: 8.5, h: 8.5 },
        clueId: 'card',
        dialogue: [
          { speaker: '도서부 친구', text: '이 줄만 이름이 비어 있어. 그래서 책이 없어진 줄 알았어.' },
          { speaker: '나', text: '빈칸이 있다는 건 누가 가져갔다는 뜻이 아니라, 기록이 빠졌다는 뜻일 수도 있어.' },
          { speaker: '탐정 노트', text: '대출 카드에는 한 줄이 비어 있고, 같은 시간대 기록이 이어져 있지 않다.' }
        ]
      },
      {
        id: 'return-bin',
        label: '반납 바구니',
        rect: { l: 18.2, t: 52.7, w: 8.2, h: 8.5 },
        clueId: 'return',
        dialogue: [
          { speaker: '민서', text: '바구니 아래쪽에 책이 한 권 눌려 있는 것 같아.' },
          { speaker: '나', text: '그럼 먼저 제목과 상태를 확인하자. 기록보다 물건 위치가 먼저 말해 줄 때도 있어.' },
          { speaker: '탐정 노트', text: '반납 바구니 아래쪽에서 찾던 책과 같은 표지의 책이 보인다.' }
        ]
      },
      {
        id: 'shelf-gap',
        label: '책장 빈자리',
        rect: { l: 35.3, t: 17.6, w: 18.2, h: 17.5 },
        clueId: 'shelf',
        dialogue: [
          { speaker: '준호', text: '책장에는 그 책 자리가 비어 있어. 그래서 더 이상해 보였나 봐.' },
          { speaker: '나', text: '빈자리는 중요한 단서야. 그런데 빈자리만 보고 가져갔다고 정하면 안 돼.' },
          { speaker: '탐정 노트', text: '책장에는 책 한 권이 빠진 자리와 같은 색의 분류 표시가 있다.' }
        ]
      },
      {
        id: 'bookmark-table',
        label: '책갈피 묶음',
        rect: { l: 64.2, t: 76.6, w: 12.5, h: 9.8 },
        clueId: 'bookmark',
        dialogue: [
          { speaker: '도서부 친구', text: '아침에 책갈피를 나눠 주느라 대출대가 잠깐 복잡했어.' },
          { speaker: '나', text: '그때 기록을 놓쳤을 수도 있겠다. 시간 순서를 다시 맞춰 보자.' },
          { speaker: '탐정 노트', text: '책갈피 묶음 옆에 대출 카드와 같은 색의 작은 표시가 붙어 있다.' }
        ]
      }
    ],
    clues: [
      { id: 'card', title: '대출 카드 빈칸', type: '기록', body: '대출 카드 한 줄이 비어 있어 누가 빌렸는지 알 수 없습니다.', short: '이름 빈칸' },
      { id: 'return', title: '반납 바구니', type: '물건', body: '반납 바구니 아래쪽에서 찾던 책과 같은 표지가 보입니다.', short: '책이 보임' },
      { id: 'shelf', title: '책장 빈자리', type: '장소', body: '책장에는 책이 빠진 자리가 있지만, 분류 표시는 반납 책과 같습니다.', short: '같은 분류' },
      { id: 'bookmark', title: '책갈피 묶음', type: '메모', body: '책갈피를 나누던 시간에 대출 기록이 잠깐 밀렸을 가능성이 있습니다.', short: '복잡한 시간' }
    ],
    links: [
      { a: 'card', b: 'bookmark', reason: '책갈피를 나누던 시간에 대출 카드 기록이 비었을 가능성이 있습니다.' },
      { a: 'shelf', b: 'return', reason: '책장 빈자리와 반납 바구니의 책이 같은 분류 표시를 갖고 있습니다.' },
      { a: 'return', b: 'card', reason: '책은 반납되어 있었지만 카드에는 아직 반납 표시가 되지 않았습니다.' }
    ],
    finalChoice: {
      title: '도서관에 말하기 전',
      body: '책은 사라진 것이 아니라 반납 바구니 아래쪽에 있었고, 대출 카드 기록이 잠깐 비었던 것으로 보입니다.'
    },
    briefing: {
      title: '도서관 사건 보고서',
      body: '책을 가져간 친구를 찾기 전에 기록과 물건 위치를 순서대로 정리합니다.',
      reportTitle: '4학년 도서관 사건 보고서',
      slots: ['비어 있던 기록', '확인한 물건', '가능한 이유', '말하는 태도'],
      correctOrder: ['record', 'object', 'reason', 'care'],
      lines: [
        { id: 'record', label: '비어 있던 기록', text: '대출 카드에는 한 줄이 비어 있었다.' },
        { id: 'object', label: '확인한 물건', text: '반납 바구니 아래쪽에는 찾던 책과 같은 표지의 책이 있었다.' },
        { id: 'reason', label: '가능한 이유', text: '책갈피를 나누던 시간에 대출 기록이 잠깐 빠졌을 가능성이 있다.' },
        { id: 'care', label: '말하는 태도', text: '누가 가져갔다고 말하기 전에 도서부와 함께 기록을 고쳐 확인한다.' },
        { id: 'blame', label: '성급한 추측', text: '대출 카드에 이름이 없으니 가장 늦게 온 친구를 의심한다.' },
        { id: 'skip', label: '부족한 설명', text: '책을 찾았으니 빈칸 기록은 그대로 둬도 된다.' }
      ]
    },
    endings: {
      careful: {
        ...styleEndings.careful,
        choice: '도서부와 기록을 고친다',
        body: '도서부와 함께 대출 카드 빈칸을 고치고 반납함을 정리했습니다.',
        lesson: '기록을 바로잡으면 같은 오해가 다시 생기는 것을 줄일 수 있어요.'
      },
      kind: {
        ...styleEndings.kind,
        choice: '친구들에게 차분히 설명한다',
        body: '친구들이 누군가를 의심하지 않도록 책이 어디 있었는지 차분히 알려 주었습니다.',
        lesson: '찾은 사실을 부드럽게 말하면 친구들의 마음도 함께 정리됩니다.'
      },
      rushed: {
        ...styleEndings.rushed,
        choice: '빈칸만 보고 말한다',
        body: '처음에는 누군가 실수했다고 말해 버렸지만, 다시 확인하며 도서부와 함께 바로잡았습니다.',
        lesson: '빈칸 하나만으로 결론을 내리면 오해가 커질 수 있어요.'
      }
    }
  },
  {
    id: 'playground-time-case',
    code: 'CASE 03',
    title: '운동장 시간표의 두 이름',
    subtitle: '약속 충돌인가, 양보할 기회인가',
    location: '운동장 장비실 앞',
    clock: '01:25 PM',
    sceneImage: './public/scenes/playground-v001.png',
    summary: '운동장 시간표에 두 모둠 이름이 겹쳐 있어 쉬는 시간이 어수선해집니다.',
    mission: {
      menu: '운동장 시간표에서 시작된 세 번째 사건',
      intro: '먼저 온 모둠과 예약한 모둠이 서로 억울해하지 않도록 시간표를 확인하세요.',
      scene: '운동장 게시판, 공 바구니, 장비함, 벤치 노트를 살펴보세요.',
      board: '두 이름이 겹친 이유와 실제 약속 시간을 연결하세요.',
      briefing: '운동장 사용 약속을 다시 정리하는 보고서를 작성하세요.',
      ending: '두 모둠에게 어떻게 말할지 선택하세요.'
    },
    introSlides: [
      { kicker: '01:18 PM · 점심시간 뒤', title: '두 모둠의 약속', body: '축구 모둠과 줄넘기 모둠이 같은 시간에 운동장을 쓰기로 했다고 말합니다.' },
      { kicker: '01:22 PM · 장비실 앞', title: '두 장의 시간표', body: '게시판에는 색이 다른 시간표가 두 장 붙어 있고, 장비함에는 공과 줄넘기가 함께 나와 있습니다.' },
      { kicker: '01:25 PM · 탐정단 호출', title: '먼저 약속부터', body: '누가 새치기했는지보다 어떤 약속이 최신인지 확인하는 것이 먼저입니다.' }
    ],
    hotspots: [
      {
        id: 'schedule-board',
        label: '운동장 시간표',
        rect: { l: 79.6, t: 18.8, w: 13.4, h: 16.5 },
        clueId: 'schedule',
        dialogue: [
          { speaker: '축구 모둠', text: '우리는 게시판에 이름이 있었어. 그래서 공을 먼저 꺼냈어.' },
          { speaker: '나', text: '시간표가 두 장이네. 어느 쪽이 새로 붙은 건지 확인해야 해.' },
          { speaker: '탐정 노트', text: '게시판에는 오래된 시간표와 새 시간표가 함께 붙어 있다.' }
        ]
      },
      {
        id: 'ball-basket',
        label: '공 바구니',
        rect: { l: 31.2, t: 50.8, w: 9.6, h: 11.6 },
        clueId: 'balls',
        dialogue: [
          { speaker: '준호', text: '공은 이미 바구니에서 꺼내 둔 것 같아.' },
          { speaker: '나', text: '물건이 나와 있다는 건 준비한 흔적이지만, 약속의 순서를 증명하지는 않아.' },
          { speaker: '탐정 노트', text: '공 바구니에는 축구공과 다른 공이 함께 담겨 있다.' }
        ]
      },
      {
        id: 'equipment-box',
        label: '장비함',
        rect: { l: 0.8, t: 50.1, w: 16.2, h: 17.8 },
        clueId: 'equipment',
        dialogue: [
          { speaker: '줄넘기 모둠', text: '우리는 줄넘기도 미리 꺼내 두었어. 우리도 예약한 줄 알았어.' },
          { speaker: '나', text: '두 모둠 모두 준비한 흔적이 있구나. 그래서 더 차분히 봐야 해.' },
          { speaker: '탐정 노트', text: '장비함에는 줄넘기와 공이 모두 꺼내기 쉬운 위치에 놓여 있다.' }
        ]
      },
      {
        id: 'bench-note',
        label: '벤치 노트',
        rect: { l: 69.4, t: 75.4, w: 14.2, h: 9.2 },
        clueId: 'note',
        dialogue: [
          { speaker: '민서', text: '벤치 위 노트에 선생님이 적어 둔 메모가 있어.' },
          { speaker: '나', text: '메모가 최신 약속을 알려 줄 수 있겠다. 시간 순서를 확인하자.' },
          { speaker: '탐정 노트', text: '벤치 노트에는 오늘은 운동장을 반씩 나누어 쓰자는 메모가 있다.' }
        ]
      }
    ],
    clues: [
      { id: 'schedule', title: '두 장의 시간표', type: '기록', body: '오래된 시간표와 새 시간표가 함께 붙어 있어 이름이 겹쳐 보입니다.', short: '시간표 두 장' },
      { id: 'balls', title: '공 바구니', type: '물건', body: '공 바구니에는 축구 모둠이 준비한 공이 나와 있습니다.', short: '공 준비' },
      { id: 'equipment', title: '장비함', type: '물건', body: '장비함에는 줄넘기와 공이 모두 꺼내기 쉬운 위치에 있습니다.', short: '장비 둘 다' },
      { id: 'note', title: '벤치 노트', type: '메모', body: '벤치 노트에는 운동장을 반씩 나누어 쓰자는 최신 메모가 있습니다.', short: '반씩 사용' }
    ],
    links: [
      { a: 'schedule', b: 'note', reason: '시간표 두 장 중 벤치 노트의 메모가 오늘 약속을 보충해 줍니다.' },
      { a: 'balls', b: 'equipment', reason: '두 모둠 모두 준비한 흔적이 있어 한쪽만 새치기했다고 볼 수 없습니다.' },
      { a: 'note', b: 'equipment', reason: '최신 메모는 장비를 나누어 쓰면 두 모둠 모두 활동할 수 있음을 알려 줍니다.' }
    ],
    finalChoice: {
      title: '운동장에 말하기 전',
      body: '두 모둠 모두 이유가 있었고, 최신 메모에 따라 운동장을 나누어 쓰면 갈등을 줄일 수 있습니다.'
    },
    briefing: {
      title: '운동장 사건 보고서',
      body: '누가 틀렸는지보다 어떤 약속이 최신인지 정리합니다.',
      reportTitle: '4학년 운동장 사건 보고서',
      slots: ['겹친 기록', '준비한 흔적', '최신 약속', '말하는 태도'],
      correctOrder: ['record', 'trace', 'reason', 'care'],
      lines: [
        { id: 'record', label: '겹친 기록', text: '게시판에는 오래된 시간표와 새 시간표가 함께 붙어 있었다.' },
        { id: 'trace', label: '준비한 흔적', text: '두 모둠 모두 장비를 준비한 흔적이 있었다.' },
        { id: 'reason', label: '최신 약속', text: '벤치 노트에는 오늘 운동장을 반씩 나누어 쓰자는 메모가 있었다.' },
        { id: 'care', label: '말하는 태도', text: '한쪽이 틀렸다고 말하지 말고 최신 약속을 함께 확인하자고 말한다.' },
        { id: 'blame', label: '성급한 추측', text: '먼저 공을 꺼낸 모둠이 무조건 잘못했다고 말한다.' },
        { id: 'skip', label: '부족한 설명', text: '시간표가 복잡하니 그냥 가위바위보로 정하면 된다.' }
      ]
    },
    endings: {
      careful: {
        ...styleEndings.careful,
        choice: '최신 메모를 확인한다',
        body: '선생님 메모와 시간표를 함께 확인해 두 모둠이 운동장을 나누어 쓰게 했습니다.',
        lesson: '기록이 여러 개일 때는 가장 최신 기록을 확인해야 해요.'
      },
      kind: {
        ...styleEndings.kind,
        choice: '두 모둠의 말을 모두 듣는다',
        body: '두 모둠이 억울하지 않도록 각자 준비한 이유를 듣고 함께 사용할 방법을 찾았습니다.',
        lesson: '갈등이 있을 때는 양쪽 이야기를 모두 듣는 태도가 중요해요.'
      },
      rushed: {
        ...styleEndings.rushed,
        choice: '먼저 온 모둠 편을 든다',
        body: '처음에는 먼저 온 모둠이 맞다고 말했지만, 노트를 다시 확인하며 약속을 바로잡았습니다.',
        lesson: '먼저 보이는 모습만으로 판단하면 다른 친구의 이유를 놓칠 수 있어요.'
      }
    }
  },
  {
    id: 'comment-case',
    code: 'CASE 04',
    title: '익명 게시판의 이상한 댓글',
    subtitle: '장난인가, 오해인가',
    location: '컴퓨터실',
    clock: '02:40 PM',
    sceneImage: './public/scenes/computer-lab-v001.png',
    summary: '익명 게시판에 올라온 이상한 댓글 때문에 친구들이 불편해합니다.',
    mission: {
      menu: '컴퓨터실 화면에서 시작된 네 번째 사건',
      intro: '댓글을 캡처해 퍼뜨리기 전에 어떤 상황에서 올라왔는지 확인하세요.',
      scene: '디지털 게시판, 메모, 프린터, 헤드셋 주변을 살펴보세요.',
      board: '댓글 화면과 작성 시간, 연습 메모의 관계를 연결하세요.',
      briefing: '온라인 말도 사실 확인과 배려가 필요하다는 보고서를 작성하세요.',
      ending: '댓글 문제를 친구들에게 어떻게 말할지 선택하세요.'
    },
    introSlides: [
      { kicker: '02:32 PM · 컴퓨터 시간', title: '이상한 댓글', body: '익명 게시판에 “그 모둠은 또 늦네”라는 댓글이 올라왔다는 말이 퍼졌습니다.' },
      { kicker: '02:36 PM · 화면 앞', title: '캡처하려는 손', body: '누군가는 댓글을 캡처해서 단체 채팅방에 보내자고 합니다. 하지만 아직 누가, 왜 썼는지 모릅니다.' },
      { kicker: '02:40 PM · 디지털 탐정단', title: '공유 전에 확인', body: '디지털 공간에서는 빠른 공유보다 정확한 확인과 조심스러운 말이 더 중요합니다.' }
    ],
    hotspots: [
      {
        id: 'digital-board',
        label: '디지털 게시판',
        rect: { l: 55.3, t: 13.8, w: 32.7, h: 34.8 },
        clueId: 'screen',
        dialogue: [
          { speaker: '민서', text: '저 화면에 댓글이 있었대. 누가 쓴 건지는 안 보여.' },
          { speaker: '나', text: '익명이라고 해서 마음대로 추측하면 안 돼. 시간과 주변 기록을 같이 보자.' },
          { speaker: '탐정 노트', text: '디지털 게시판에는 익명 댓글과 비슷한 시간 표시가 남아 있다.' }
        ]
      },
      {
        id: 'sticky-notes',
        label: '연습 메모',
        rect: { l: 50.8, t: 24.2, w: 4.8, h: 17.5 },
        clueId: 'draft',
        dialogue: [
          { speaker: '준호', text: '선생님이 댓글 예절 연습 문장을 붙여 둔 것 같아.' },
          { speaker: '나', text: '혹시 연습 문장이 실제 게시글처럼 올라간 건 아닐까? 확인해 보자.' },
          { speaker: '탐정 노트', text: '연습 메모에는 댓글 예절 수업에서 쓰던 예시 문장이 적혀 있다.' }
        ]
      },
      {
        id: 'printer-tray',
        label: '프린터 출력물',
        rect: { l: 54.5, t: 87.5, w: 14.5, h: 8.4 },
        clueId: 'print',
        dialogue: [
          { speaker: '도움 친구', text: '프린터에 댓글 예절 안내장이 나와 있어.' },
          { speaker: '나', text: '수업 활동 자료라면 댓글도 활동 중에 잘못 올라갔을 수 있겠네.' },
          { speaker: '탐정 노트', text: '출력물에는 댓글 예절 연습 활동 순서가 정리되어 있다.' }
        ]
      },
      {
        id: 'headset',
        label: '헤드셋 자리',
        rect: { l: 52.6, t: 69.2, w: 8.6, h: 10.7 },
        clueId: 'time',
        dialogue: [
          { speaker: '민서', text: '이 자리는 수업 때 모둠별로 돌아가며 썼대.' },
          { speaker: '나', text: '그럼 한 사람을 정하기보다 사용 시간을 먼저 봐야 해.' },
          { speaker: '탐정 노트', text: '헤드셋 자리의 사용 순서는 댓글 시간과 정확히 한 명에게만 맞지 않는다.' }
        ]
      }
    ],
    clues: [
      { id: 'screen', title: '익명 댓글 화면', type: '화면', body: '익명 댓글에는 불편한 말이 있지만 작성자는 보이지 않습니다.', short: '익명 댓글' },
      { id: 'draft', title: '연습 메모', type: '메모', body: '댓글 예절 수업에서 쓰던 예시 문장이 게시글과 비슷합니다.', short: '예시 문장' },
      { id: 'print', title: '출력 안내장', type: '기록', body: '출력물에는 댓글 예절 연습 활동 순서가 있습니다.', short: '수업 활동' },
      { id: 'time', title: '사용 시간 기록', type: '기록', body: '컴퓨터 자리는 여러 친구가 번갈아 사용해 한 친구만 단정할 수 없습니다.', short: '여러 명 사용' }
    ],
    links: [
      { a: 'screen', b: 'draft', reason: '댓글 내용은 연습 메모의 예시 문장과 비슷합니다.' },
      { a: 'print', b: 'time', reason: '댓글 예절 활동 시간과 컴퓨터 자리 사용 기록이 겹칩니다.' },
      { a: 'draft', b: 'print', reason: '수업 활동 자료가 실제 게시글처럼 잘못 올라갔을 가능성이 있습니다.' }
    ],
    finalChoice: {
      title: '공유하기 전',
      body: '댓글은 누군가를 공격하려던 글이라기보다 댓글 예절 연습 문장이 잘못 올라간 것으로 보입니다. 이제 공유 대신 어떻게 바로잡을지 정해야 합니다.'
    },
    briefing: {
      title: '디지털 댓글 보고서',
      body: '온라인 말은 빨리 퍼지므로, 확인한 사실과 조심해야 할 점을 분명히 적습니다.',
      reportTitle: '4학년 디지털 댓글 사건 보고서',
      slots: ['댓글 확인', '수업 자료', '가능한 이유', '공유 태도'],
      correctOrder: ['record', 'object', 'reason', 'care'],
      lines: [
        { id: 'record', label: '댓글 확인', text: '익명 게시판에는 불편한 댓글이 있었지만 작성자는 보이지 않았다.' },
        { id: 'object', label: '수업 자료', text: '연습 메모와 출력 안내장에는 댓글 예절 예시 문장이 있었다.' },
        { id: 'reason', label: '가능한 이유', text: '수업 활동 문장이 실제 게시글처럼 잘못 올라갔을 가능성이 있다.' },
        { id: 'care', label: '공유 태도', text: '캡처를 퍼뜨리지 말고 선생님과 게시글을 함께 확인하자고 말한다.' },
        { id: 'blame', label: '성급한 추측', text: '컴퓨터를 쓴 친구 중 한 명이 일부러 썼다고 단체 채팅방에 보낸다.' },
        { id: 'skip', label: '부족한 설명', text: '댓글이 지워지면 끝이니 이유는 확인하지 않는다.' }
      ]
    },
    endings: {
      careful: {
        ...styleEndings.careful,
        choice: '선생님과 게시 기록을 확인한다',
        body: '선생님과 활동 기록을 확인해 댓글을 삭제하고, 예시 문장 사용 방법을 다시 안내했습니다.',
        lesson: '온라인 기록도 확인 순서가 필요해요.'
      },
      kind: {
        ...styleEndings.kind,
        choice: '캡처 공유를 멈추자고 말한다',
        body: '친구들이 캡처를 퍼뜨리지 않게 차분히 말하고, 불편했던 친구의 마음도 함께 살폈습니다.',
        lesson: '디지털 공간에서도 친구의 마음을 생각하는 말하기가 필요해요.'
      },
      rushed: {
        ...styleEndings.rushed,
        choice: '누가 썼는지 추측해 말한다',
        body: '처음에는 사용 기록만 보고 추측했지만, 다시 확인하며 캡처를 지우고 사과했습니다.',
        lesson: '온라인에서는 추측이 빠르게 퍼질 수 있으니 더 조심해야 해요.'
      }
    }
  },
  {
    id: 'detective-notebook-case',
    code: 'CASE 05',
    title: '사라진 탐정 노트',
    subtitle: '마지막 기록을 찾아서',
    location: '탐정단 자료실',
    clock: '03:30 PM',
    sceneImage: './public/scenes/archive-room-v001.png',
    summary: '앞선 사건들의 기록을 모은 탐정 노트가 사라지고, 모든 선택이 마지막 사건으로 이어집니다.',
    mission: {
      menu: '캠페인 마지막 사건',
      intro: '앞 사건들의 기록을 모아 탐정단의 마지막 판단을 준비하세요.',
      scene: '자료실의 사건 보드, 파일 상자, 약속 포스터, 노트 상자를 살펴보세요.',
      board: '앞선 사건 기록과 마지막 노트의 위치를 연결하세요.',
      briefing: '캠페인 전체를 마무리하는 최종 보고서를 작성하세요.',
      ending: '탐정단이 앞으로 어떤 약속을 할지 선택하세요.'
    },
    introSlides: [
      { kicker: '03:20 PM · 방과 후', title: '사라진 탐정 노트', body: '쿠폰, 도서관, 운동장, 댓글 사건을 정리한 탐정 노트가 보이지 않습니다.' },
      { kicker: '03:25 PM · 자료실', title: '섞인 사건 파일', body: '사건 카드와 폴더가 모두 책상 위에 나와 있고, 친구들은 누가 노트를 가져갔는지 걱정합니다.' },
      { kicker: '03:30 PM · 마지막 사건', title: '우리의 방식', body: '이번 사건은 노트를 찾는 것뿐 아니라, 탐정단이 앞으로 어떤 방식으로 문제를 해결할지 정하는 사건입니다.' }
    ],
    hotspots: [
      {
        id: 'archive-board',
        label: '사건 보드',
        rect: { l: 25.8, t: 9.2, w: 31.8, h: 34.2 },
        clueId: 'board',
        dialogue: [
          { speaker: '민서', text: '보드에 사건 카드들이 모두 섞여 있어. 순서가 헷갈려.' },
          { speaker: '나', text: '앞 사건의 순서를 다시 맞추면 노트를 어디에 두었는지도 떠오를 수 있어.' },
          { speaker: '탐정 노트', text: '사건 보드에는 네 사건의 카드가 순서 없이 붙어 있다.' }
        ]
      },
      {
        id: 'case-folders',
        label: '사건 폴더',
        rect: { l: 36.2, t: 57.8, w: 20.5, h: 15.4 },
        clueId: 'folders',
        dialogue: [
          { speaker: '준호', text: '폴더 색깔이 사건마다 달랐는데 지금은 섞여 있어.' },
          { speaker: '나', text: '색과 기록을 맞추면 빠진 폴더를 찾을 수 있겠다.' },
          { speaker: '탐정 노트', text: '사건 폴더 중 마지막 정리 폴더만 책상 위에 없다.' }
        ]
      },
      {
        id: 'promise-poster',
        label: '탐정 약속',
        rect: { l: 64.2, t: 12.2, w: 14.4, h: 29.2 },
        clueId: 'promise',
        dialogue: [
          { speaker: '민서', text: '우리가 적었던 약속 포스터야. 먼저 확인하기, 마음 살피기, 함께 해결하기.' },
          { speaker: '나', text: '이 약속이 마지막 보고서에도 필요하겠어.' },
          { speaker: '탐정 노트', text: '탐정 약속에는 기록, 배려, 협력, 다시 확인이 함께 적혀 있다.' }
        ]
      },
      {
        id: 'notebook-box',
        label: '노트 상자',
        rect: { l: 69.6, t: 67.4, w: 16.8, h: 20.5 },
        clueId: 'box',
        dialogue: [
          { speaker: '준호', text: '상자 안에 검은 노트가 보여! 누가 숨긴 건 아니겠지?' },
          { speaker: '나', text: '숨겼다고 말하기 전에 왜 상자에 들어갔는지 확인하자.' },
          { speaker: '탐정 노트', text: '노트 상자 안에는 “최종 정리 후 보관” 표시가 붙은 탐정 노트가 있다.' }
        ]
      }
    ],
    clues: [
      { id: 'board', title: '섞인 사건 보드', type: '기록', body: '앞선 네 사건의 카드가 순서 없이 붙어 있습니다.', short: '순서 섞임' },
      { id: 'folders', title: '사건 폴더', type: '기록', body: '마지막 정리 폴더만 책상 위에 보이지 않습니다.', short: '폴더 빠짐' },
      { id: 'promise', title: '탐정 약속', type: '약속', body: '기록, 배려, 협력, 다시 확인이라는 탐정단의 약속이 적혀 있습니다.', short: '네 가지 약속' },
      { id: 'box', title: '노트 상자', type: '물건', body: '노트 상자 안에는 최종 정리 후 보관 표시가 붙은 탐정 노트가 있습니다.', short: '노트 보관' }
    ],
    links: [
      { a: 'board', b: 'folders', reason: '섞인 사건 보드와 빠진 정리 폴더는 마지막 정리 작업이 있었음을 알려 줍니다.' },
      { a: 'folders', b: 'box', reason: '빠진 정리 폴더는 노트 상자 안 탐정 노트와 함께 보관되어 있었습니다.' },
      { a: 'promise', b: 'box', reason: '탐정 노트는 사건 해결 방식과 약속을 정리하기 위해 따로 보관된 것입니다.' }
    ],
    finalChoice: {
      title: '캠페인을 마치기 전',
      body: '탐정 노트는 사라진 것이 아니라 최종 정리를 위해 보관되어 있었습니다. 이제 탐정단은 앞으로 어떤 약속을 가장 먼저 지킬지 정해야 합니다.'
    },
    briefing: {
      title: '최종 사건 보고서',
      body: '앞선 사건들을 한 줄씩 되짚고, 탐정단의 해결 방식을 마지막으로 정리합니다.',
      reportTitle: '디지털 탐정단 최종 보고서',
      slots: ['앞 사건 기록', '빠진 폴더', '노트 위치', '앞으로의 약속'],
      correctOrder: ['record', 'trace', 'reason', 'care'],
      lines: [
        { id: 'record', label: '앞 사건 기록', text: '사건 보드에는 앞선 사건 카드들이 순서 없이 섞여 있었다.' },
        { id: 'trace', label: '빠진 폴더', text: '마지막 정리 폴더만 책상 위에 없었다.' },
        { id: 'reason', label: '노트 위치', text: '탐정 노트는 최종 정리를 위해 노트 상자 안에 보관되어 있었다.' },
        { id: 'care', label: '앞으로의 약속', text: '탐정단은 기록, 배려, 협력, 다시 확인을 함께 지키기로 한다.' },
        { id: 'blame', label: '성급한 추측', text: '누군가 노트를 숨겼다고 먼저 말한다.' },
        { id: 'skip', label: '부족한 설명', text: '노트를 찾았으니 앞선 사건 기록은 정리하지 않는다.' }
      ]
    },
    endings: {
      careful: {
        ...styleEndings.careful,
        choice: '기록 순서를 다시 맞춘다',
        body: '탐정단은 사건 카드를 순서대로 정리하고, 노트 보관 위치를 기록했습니다.',
        lesson: '마지막까지 기록을 정리하면 다음 문제를 더 차분히 해결할 수 있어요.'
      },
      kind: {
        ...styleEndings.kind,
        choice: '친구들과 약속을 다시 읽는다',
        body: '탐정단은 서로를 의심하지 않고 함께 약속을 읽으며 노트가 보관된 이유를 확인했습니다.',
        lesson: '함께 지킬 약속이 있으면 사건이 끝난 뒤에도 좋은 분위기가 남아요.'
      },
      rushed: {
        ...styleEndings.rushed,
        choice: '노트를 숨겼다고 먼저 말한다',
        body: '처음에는 누군가 노트를 숨겼다고 말했지만, 보관 표시를 보고 다시 사과하며 정리했습니다.',
        lesson: '마지막 사건에서도 먼저 확인하는 태도가 필요해요.'
      }
    },
    finalCase: true
  }
];

export const campaign = {
  title: '디지털 탐정단 사건 파일',
  subtitle: '사건을 해결할수록 나만의 탐정 스타일과 마지막 캠페인 엔딩이 달라집니다.',
  cases: cases.map(({ id, code, title, summary }) => ({ id, code, title, summary })),
  statLabels: {
    record: '기록 확인',
    empathy: '마음 살피기',
    caution: '다시 확인',
    teamwork: '함께 해결',
    rumorRisk: '소문 위험'
  },
  defaultProfile: {
    id: 'rookie',
    title: '새내기 탐정',
    trait: '관찰 시작',
    body: '아직 해결한 사건이 없습니다. 첫 사건을 마치면 탐정 스타일이 기록됩니다.',
    nextHook: '첫 사건을 해결하면 다음 사건 파일이 열립니다.'
  },
  profiles: {
    careful: {
      id: 'careful',
      title: '기록형 탐정',
      trait: '정확한 확인',
      body: '기록, 숫자, 물건의 차이를 차분히 비교하는 데 강합니다.',
      nextHook: '다음 사건에서 기록장, 시간표, 빈칸 단서를 먼저 보게 됩니다.'
    },
    kind: {
      id: 'kind',
      title: '공감형 탐정',
      trait: '관계 회복',
      body: '친구가 부끄럽지 않게 말하고, 함께 찾는 분위기를 만드는 데 강합니다.',
      nextHook: '다음 사건에서 친구의 제보와 대화 선택지가 더 중요해집니다.'
    },
    reflective: {
      id: 'reflective',
      title: '성장형 탐정',
      trait: '다시 확인',
      body: '성급했던 판단을 되돌아보고, 다음에는 한 번 더 확인하려는 태도가 남습니다.',
      nextHook: '다음 사건에서 확인 체크리스트가 더 눈에 들어옵니다.'
    }
  },
  finalEndings: {
    record: {
      code: 'ENDING A',
      title: '기록의 탐정단',
      body: '탐정단은 모든 사건을 기록과 증거 순서로 정리했습니다. 친구들은 문제가 생기면 먼저 확인표를 꺼내 보기로 했습니다.',
      epilogue: '교실 게시판에는 “먼저 기록, 그다음 말하기”라는 새 약속이 붙었습니다.'
    },
    empathy: {
      code: 'ENDING B',
      title: '마음을 잇는 탐정단',
      body: '탐정단은 사건을 해결할 때마다 친구의 마음을 먼저 살폈습니다. 오해가 생겨도 누군가 혼자 부끄럽지 않게 함께 말하는 반이 되었습니다.',
      epilogue: '탐정 노트 마지막 장에는 “사실도 중요하고, 말하는 마음도 중요하다”라고 적혔습니다.'
    },
    teamwork: {
      code: 'ENDING C',
      title: '함께 해결하는 탐정단',
      body: '탐정단은 기록 담당, 대화 담당, 정리 담당을 나누어 사건을 해결했습니다. 이제 문제는 한 명의 책임이 아니라 함께 풀 과제가 되었습니다.',
      epilogue: '다음 주부터 4학년에는 작은 문제 해결 회의가 생겼습니다.'
    },
    growth: {
      code: 'ENDING D',
      title: '성장하는 탐정단',
      body: '몇 번의 성급한 말도 있었지만, 탐정단은 매번 다시 확인하고 사과하며 더 나은 해결 방법을 배웠습니다.',
      epilogue: '탐정 노트에는 틀린 판단도 지우지 않고 남겼습니다. 다음에 더 잘하기 위한 기록이니까요.'
    },
    rumor: {
      code: 'ENDING E',
      title: '소문을 멈춘 탐정단',
      body: '확인 없이 퍼진 말 때문에 친구들이 잠시 속상했습니다. 하지만 탐정단은 마지막에 소문을 멈추고 사실을 다시 정리했습니다.',
      epilogue: '캠페인의 마지막 약속은 짧았습니다. “확인하지 않은 말은 멈추기.”'
    }
  }
};

export const caseById = Object.fromEntries(cases.map((caseItem) => [caseItem.id, caseItem]));
export const firstCaseId = cases[0].id;
export const chapter = cases[0];
export const requiredClueIds = chapter.clues.map((clue) => clue.id);

export function getCaseById(caseId) {
  return caseById[caseId] ?? cases[0];
}

export function getCaseIndex(caseId) {
  return cases.findIndex((caseItem) => caseItem.id === caseId);
}

export function getNextCaseId(caseId) {
  const next = cases[getCaseIndex(caseId) + 1];
  return next?.id ?? null;
}
