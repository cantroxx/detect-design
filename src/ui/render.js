import { campaign, chapter } from '../domain/gameData.js?v=20260707-campaign1';
import {
  advanceDialogue,
  advanceIntro,
  canOpenBoard,
  chooseEnding,
  clearBriefing,
  createInitialState,
  getDetectiveProfile,
  isSolved,
  linkKey,
  openBriefing,
  openHotspot,
  removeBriefingLine,
  selectClue,
  selectBriefingLine,
  showMenu,
  skipIntro,
  submitBriefing,
  startCase
} from '../application/gameEngine.js?v=20260707-campaign1';

let state = createInitialState();

export function mount(root) {
  root.addEventListener('click', onClick);
  render(root);
}

function onClick(event) {
  const action = event.target.closest('[data-action]');
  if (!action) return;

  const root = document.querySelector('#app');
  const type = action.dataset.action;
  const value = action.dataset.value;
  const previousScreen = state.screen;

  if (type === 'start') state = startCase(state);
  else if (type === 'reset') state = createInitialState();
  else if (type === 'menu') state = showMenu(state);
  else if (type === 'intro-next') state = advanceIntro(state);
  else if (type === 'intro-skip') state = skipIntro(state);
  else if (type === 'scene') state = { ...state, screen: 'scene', message: chapter.mission.scene };
  else if (type === 'board' && canOpenBoard(state)) {
    state = { ...state, screen: 'board', message: chapter.mission.board };
  } else if (type === 'hotspot') state = openHotspot(state, value);
  else if (type === 'dialogue-next') state = advanceDialogue(state);
  else if (type === 'select-clue') state = selectClue(state, value);
  else if (type === 'briefing') state = openBriefing(state);
  else if (type === 'select-briefing') state = selectBriefingLine(state, value);
  else if (type === 'remove-briefing') state = removeBriefingLine(state, value);
  else if (type === 'clear-briefing') state = clearBriefing(state);
  else if (type === 'submit-briefing') state = submitBriefing(state);
  else if (type === 'ending') state = chooseEnding(state, value);

  render(root);
  if (state.screen !== previousScreen) window.scrollTo(0, 0);
}

function render(root) {
  root.innerHTML = `
    <main class="appShell ${state.screen} ${state.dialogue ? 'hasDialogue' : ''}">
      ${state.screen === 'menu' ? renderMenu() : ''}
      ${state.screen === 'intro' ? renderIntro() : ''}
      ${state.screen !== 'menu' && state.screen !== 'intro' ? renderHeader() : ''}
      ${state.screen === 'scene' ? renderScene() : ''}
      ${state.screen === 'board' ? renderBoard() : ''}
      ${state.screen === 'briefing' ? renderBriefing() : ''}
      ${state.screen === 'ending' ? renderEnding() : ''}
      ${renderDialogue()}
      ${state.screen === 'menu' || state.screen === 'intro' ? '' : renderToast()}
    </main>
  `;
}

function renderHeader() {
  const count = state.collected.length;
  const boardUnlocked = canOpenBoard(state);
  return `
    <header class="topBar">
      <div class="caseHud">
        <p class="eyebrow">${chapter.code} · ${chapter.clock}</p>
        <h1>${chapter.title}</h1>
      </div>
      <nav class="topActions" aria-label="게임 이동">
        <button data-action="scene">교실</button>
        <button data-action="board" ${boardUnlocked ? '' : 'disabled'}>증거 보드</button>
        <button data-action="briefing" ${isSolved(state) ? '' : 'disabled'}>보고서</button>
        <button data-action="reset">처음부터</button>
      </nav>
      <div class="progress" aria-label="단서 진행도">
        <span>${count}</span><small>/ ${chapter.clues.length}</small>
      </div>
    </header>
  `;
}

function renderMenu() {
  return `
    <section class="menuScreen">
      <div class="menuScan" aria-hidden="true"></div>
      <div class="menuLayout">
        <div class="menuCopy">
          <p class="caseCode">${chapter.code}</p>
          <h2>${chapter.title}</h2>
          <p class="menuSub">${chapter.subtitle}</p>
          <p>
            조회 전 조용한 4학년 교실. 칭찬 쿠폰 상자의 숫자가 맞지 않습니다.
            서로 의심하기 전에, 탐정단은 기록과 말을 차례로 확인해야 합니다.
          </p>
          <button class="primaryAction" data-action="start">새 사건 시작</button>
        </div>
        ${renderCampaignPanel()}
      </div>
    </section>
  `;
}

function renderCampaignPanel() {
  const profile = getDetectiveProfile(state);
  return `
    <aside class="caseFiles" aria-label="${campaign.title}">
      <div class="terminalHeader">
        <span>${campaign.title}</span>
        <b>${state.caseRecords.length}/${campaign.cases.length}</b>
      </div>
      <p>${campaign.subtitle}</p>
      <div class="detectiveBadge">
        <span>${profile.trait}</span>
        <b>${profile.title}</b>
        <small>${profile.body}</small>
      </div>
      <div class="caseFileList">
        ${campaign.cases.map((caseItem, index) => renderCaseFile(caseItem, index)).join('')}
      </div>
    </aside>
  `;
}

function renderCaseFile(caseItem, index) {
  const record = state.caseRecords.find((item) => item.caseId === caseItem.id);
  const solvedFirstCase = state.caseRecords.some((item) => item.caseId === chapter.id);
  const isNextOpen = caseItem.status === 'next' && solvedFirstCase;
  const status = record ? '해결됨' : index === 0 ? '진행 가능' : isNextOpen ? '다음 사건' : '잠김';
  return `
    <article class="caseFile ${record ? 'solved' : ''} ${isNextOpen ? 'nextOpen' : ''}">
      <span>${caseItem.code} · ${status}</span>
      <h3>${caseItem.title}</h3>
      <p>${record ? `${record.styleTitle} 기록으로 종결` : caseItem.summary}</p>
    </article>
  `;
}

function renderIntro() {
  const slide = chapter.introSlides[state.introIndex];
  const isLast = state.introIndex === chapter.introSlides.length - 1;
  return `
    <section class="introScreen">
      <div class="introBackdrop" aria-hidden="true"></div>
      <div class="introFrame">
        <div class="introMeta">
          <span>${slide.kicker}</span>
          <span>${String(state.introIndex + 1).padStart(2, '0')} / ${String(chapter.introSlides.length).padStart(2, '0')}</span>
        </div>
        <h2>${slide.title}</h2>
        <p>${slide.body}</p>
        <div class="introMission">${chapter.mission.intro}</div>
        <div class="introActions">
          <button data-action="intro-skip">건너뛰기</button>
          <button class="primaryAction compact" data-action="intro-next">${isLast ? '교실로 들어가기' : '다음'}</button>
        </div>
      </div>
    </section>
  `;
}

function renderScene() {
  return `
    <section class="sceneScreen">
      <div class="sceneStage">
        <div class="sceneFrame">
          <img src="${chapter.sceneImage}" alt="따뜻한 4학년 교실" />
          ${chapter.hotspots.map(renderHotspot).join('')}
        </div>
        <div class="sceneCaption">
          <b>${chapter.location}</b>
          <span>${sceneCaption()}</span>
        </div>
      </div>
      ${renderCaseTerminal()}
    </section>
  `;
}

function sceneCaption() {
  if (canOpenBoard(state)) return '필요한 단서는 모였습니다. 이제 증거 보드에서 관계를 정리하세요.';
  if (state.collected.length === 0) return '친구들의 말이 커지기 전에, 먼저 조용히 살펴봅니다.';
  return '새 단서가 탐정 노트에 붙었습니다. 아직 빠진 조각이 있습니다.';
}

function renderHotspot(hotspot) {
  const found = state.collected.includes(hotspot.clueId);
  return `
    <button
      class="hotspot ${found ? 'found' : 'pulse'}"
      style="left:${hotspot.rect.l}%;top:${hotspot.rect.t}%;width:${hotspot.rect.w}%;height:${hotspot.rect.h}%"
      data-action="hotspot"
      data-value="${hotspot.clueId}"
      aria-label="${hotspot.label}"
    >
      <span>${hotspot.label}</span>
    </button>
  `;
}

function renderCaseTerminal() {
  const boardUnlocked = canOpenBoard(state);
  return `
    <aside class="caseTerminal">
      <div class="terminalHeader">
        <span>탐정 단말기</span>
        <b>${boardUnlocked ? 'BOARD READY' : 'LOCKED'}</b>
      </div>
      <section class="missionBlock">
        <p class="caseCode">CURRENT MISSION</p>
        <h2>${boardUnlocked ? '증거 보드 열기' : '교실 조사'}</h2>
        <p>${boardUnlocked ? chapter.mission.board : chapter.mission.scene}</p>
      </section>
      <div class="clueList">
        ${chapter.clues.map(renderClueRow).join('')}
      </div>
      <button class="terminalAction" data-action="board" ${boardUnlocked ? '' : 'disabled'}>
        증거 보드 접속
      </button>
    </aside>
  `;
}

function renderClueRow(clue) {
  const found = state.collected.includes(clue.id);
  return `
    <article class="clueCard ${found ? 'found' : ''}">
      <span>${found ? clue.type : '미확인'}</span>
      <h3>${found ? clue.title : '???'}</h3>
      <p>${found ? clue.body : '교실 안 어딘가에 아직 확인하지 못한 단서가 있습니다.'}</p>
    </article>
  `;
}

function renderBoard() {
  const solved = isSolved(state);
  return `
    <section class="boardScreen">
      <div class="boardIntro">
        <p class="caseCode">EVIDENCE BOARD</p>
        <h2>말보다 먼저, 단서를 연결합니다</h2>
        <p>${chapter.mission.board}</p>
      </div>
      <div class="boardGrid">
        ${chapter.clues.map(renderBoardNode).join('')}
      </div>
      <div class="linkPanel">
        <h3>확인한 관계</h3>
        <ul>
          ${chapter.links.map(renderLinkStatus).join('')}
        </ul>
        ${solved ? renderBriefingGate() : '<p class="boardHint">단서 카드 두 개를 차례로 눌러 관계를 확인하세요.</p>'}
      </div>
    </section>
  `;
}

function renderBoardNode(clue) {
  const selected = state.selected === clue.id;
  return `
    <button
      class="boardNode ${selected ? 'selected' : ''}"
      data-action="select-clue"
      data-value="${clue.id}"
    >
      <span>${clue.type}</span>
      <b>${clue.title}</b>
      <small>${clue.short}</small>
    </button>
  `;
}

function renderLinkStatus(link) {
  const done = state.links.includes(linkKey(link.a, link.b));
  const a = chapter.clues.find((clue) => clue.id === link.a);
  const b = chapter.clues.find((clue) => clue.id === link.b);
  return `<li class="${done ? 'done' : ''}">${a.title} + ${b.title}</li>`;
}

function renderBriefingGate() {
  return `
    <div class="finalChoice">
      <p class="caseCode">NEXT STEP</p>
      <h3>증거만으로는 아직 끝나지 않았습니다</h3>
      <p>친구들이 오해하지 않도록, 탐정단 보고서를 먼저 완성해야 합니다.</p>
      <button data-action="briefing">
        <span>사건 보고서 작성</span>
        <small>사실을 순서대로 정리하기</small>
      </button>
    </div>
  `;
}

function renderBriefing() {
  const expectedCount = chapter.briefing.correctOrder.length;
  return `
    <section class="briefingScreen">
      <div class="briefingIntro">
        <p class="caseCode">CASE REPORT</p>
        <h2>${chapter.briefing.title}</h2>
        <p>${chapter.briefing.body}</p>
      </div>
      <div class="reportDesk">
        <section class="reportPaper">
          <div class="reportStamp">DRAFT</div>
          <h3>4학년 쿠폰 사건 보고서</h3>
          <ol class="reportSlots">
            ${chapter.briefing.slots.map((slot, index) => renderReportSlot(slot, index)).join('')}
          </ol>
          <div class="reportActions">
            <button data-action="clear-briefing" ${state.briefingReady ? 'disabled' : ''}>다시 쓰기</button>
            <button class="primaryAction compact" data-action="submit-briefing" ${state.briefingReady ? 'disabled' : ''}>
              보고서 제출
            </button>
          </div>
        </section>
        <aside class="lineBank">
          <div class="terminalHeader">
            <span>문장 카드</span>
            <b>${state.briefing.length}/${expectedCount}</b>
          </div>
          <div class="briefingLines">
            ${chapter.briefing.lines.map(renderBriefingLine).join('')}
          </div>
          ${state.briefingReady ? renderFinalChoice() : '<p class="boardHint">기록 → 오늘 확인 → 가능한 이유 → 말하는 태도 순서로 보고서를 완성하세요.</p>'}
        </aside>
      </div>
    </section>
  `;
}

function renderReportSlot(slot, index) {
  const lineId = state.briefing[index];
  const line = chapter.briefing.lines.find((item) => item.id === lineId);
  return `
    <li class="${line ? 'filled' : ''}">
      <span>${slot}</span>
      ${
        line
          ? `<button data-action="remove-briefing" data-value="${line.id}" ${state.briefingReady ? 'disabled' : ''}>${line.text}</button>`
          : '<em>문장 카드를 선택하세요.</em>'
      }
    </li>
  `;
}

function renderBriefingLine(line) {
  const used = state.briefing.includes(line.id);
  return `
    <button
      class="briefingLine ${used ? 'used' : ''}"
      data-action="select-briefing"
      data-value="${line.id}"
      ${used || state.briefingReady ? 'disabled' : ''}
    >
      <span>${line.label}</span>
      <b>${line.text}</b>
    </button>
  `;
}

function renderFinalChoice() {
  return `
    <div class="finalChoice">
      <p class="caseCode">FINAL DECISION</p>
      <h3>${chapter.finalChoice.title}</h3>
      <p>${chapter.finalChoice.body}</p>
      ${Object.entries(chapter.endings)
        .map(
          ([id, ending]) => `
            <button data-action="ending" data-value="${id}">
              <span>${ending.choice}</span>
              <small>${ending.title}</small>
            </button>
          `
        )
        .join('')}
    </div>
  `;
}

function renderEnding() {
  const ending = chapter.endings[state.ending];
  const profile = getDetectiveProfile(state);
  return `
    <section class="endingScreen">
      <p class="caseCode">CASE CLOSED</p>
      <h2>${ending.title}</h2>
      <p>${ending.body}</p>
      <div class="lesson">${ending.lesson}</div>
      <div class="endingGrid">
        <section class="styleReport">
          <p class="caseCode">DETECTIVE STYLE</p>
          <h3>${profile.title}</h3>
          <b>${profile.trait}</b>
          <p>${profile.body}</p>
        </section>
        <section class="nextCaseReport">
          <p class="caseCode">NEXT CASE</p>
          <h3>${campaign.cases[1].title}</h3>
          <p>${profile.nextHook}</p>
        </section>
      </div>
      ${renderCaseRecord()}
      <div class="endingActions">
        <button class="primaryAction" data-action="menu">사건 파일 보기</button>
        <button data-action="start">CASE 01 다시 플레이</button>
      </div>
    </section>
  `;
}

function renderCaseRecord() {
  return `
    <section class="caseRecord">
      <p class="caseCode">CASE LOG</p>
      ${state.caseRecords
        .map(
          (record) => `
            <article>
              <span>${record.code}</span>
              <b>${record.title}</b>
              <small>${record.endingTitle} · ${record.choice}</small>
            </article>
          `
        )
        .join('')}
    </section>
  `;
}

function renderDialogue() {
  if (!state.dialogue) return '';
  const beat = state.dialogue.beats[state.dialogue.index];
  const isLast = state.dialogue.index === state.dialogue.beats.length - 1;
  return `
    <div class="dialogueLayer" role="dialog" aria-live="polite" aria-label="${state.dialogue.title}">
      <div class="dialogueBox">
        <div class="dialogueMeta">
          <span>${state.dialogue.title}</span>
          <span>${state.dialogue.index + 1} / ${state.dialogue.beats.length}</span>
        </div>
        <h2>${beat.speaker}</h2>
        <p>${beat.text}</p>
        <button class="dialogueNext" data-action="dialogue-next">
          ${isLast && state.dialogue.rewardClueId ? '탐정 노트에 붙이기' : '계속'}
        </button>
      </div>
    </div>
  `;
}

function renderToast() {
  return `<div class="toast" role="status">${state.message}</div>`;
}
