import { campaign, cases, getCaseHotspots, getEvidenceItems } from '../domain/gameData.js?v=20260707-osui3';
import {
  advanceDialogue,
  advanceIntro,
  canOpenBoard,
  chooseEnding,
  clearBriefing,
  createInitialState,
  getActiveCase,
  getCaseProgress,
  getCaseStatus,
  getDetectiveProfile,
  getNextCase,
  isCampaignComplete,
  isSolved,
  linkKey,
  openBriefing,
  openHotspot,
  removeBriefingLine,
  resolveCampaignEnding,
  selectBriefingLine,
  selectClue,
  showMenu,
  skipIntro,
  startCase,
  submitBriefing
} from '../application/gameEngine.js?v=20260707-osui3';

let state = createInitialState();
const boardNodePositions = [
  { x: 16, y: 20 },
  { x: 50, y: 16 },
  { x: 80, y: 24 },
  { x: 18, y: 50 },
  { x: 52, y: 46 },
  { x: 82, y: 54 },
  { x: 28, y: 78 },
  { x: 68, y: 78 }
];
const briefingDisplayOrder = [2, 4, 0, 5, 1, 3];
const reportStepPrompts = [
  '처음 확인한 사실',
  '다음으로 확인한 사실',
  '두 사실을 이어 생각한 이유',
  '친구에게 말하는 방법'
];

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
  const activeCase = getActiveCase(state);

  if (type === 'start') state = startCase(state, value || activeCase.id);
  else if (type === 'reset') state = createInitialState();
  else if (type === 'menu') state = showMenu(state);
  else if (type === 'intro-next') state = advanceIntro(state);
  else if (type === 'intro-skip') state = skipIntro(state);
  else if (type === 'scene') state = { ...state, screen: 'scene', message: activeCase.mission.scene };
  else if (type === 'board' && canOpenBoard(state)) {
    state = { ...state, screen: 'board', message: activeCase.mission.board };
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
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const evidenceItems = getEvidenceItems(activeCase);
  const boardUnlocked = canOpenBoard(state);
  return `
    <header class="topBar">
      <div class="osBrand">
        <span>DD-OS</span>
        <b>4학년 탐정단</b>
      </div>
      <div class="caseHud">
        <p class="eyebrow">${activeCase.code} · ${activeCase.clock}</p>
        <h1>${activeCase.title}</h1>
      </div>
      <nav class="topActions" aria-label="게임 이동">
        <button data-action="scene"><span class="navIcon sceneIcon" aria-hidden="true"></span>${activeCase.location}</button>
        <button data-action="board" ${boardUnlocked ? '' : 'disabled'}><span class="navIcon boardIcon" aria-hidden="true"></span>증거</button>
        <button data-action="briefing" ${isSolved(state) ? '' : 'disabled'}><span class="navIcon reportIcon" aria-hidden="true"></span>보고서</button>
        <button data-action="menu"><span class="navIcon fileIcon" aria-hidden="true"></span>파일</button>
      </nav>
      <div class="progress" aria-label="단서 진행도">
        <span>${progress.collected.length}</span><small>/ ${evidenceItems.length}</small>
      </div>
    </header>
  `;
}

function renderMenu() {
  const nextCase = getNextCase(state) ?? cases[0];
  return `
    <section class="menuScreen">
      <div class="menuScan" aria-hidden="true"></div>
      <div class="menuLayout">
        <section class="osHeroWindow" aria-label="디지털 탐정단 시작 화면">
          <div class="windowChrome">
            <span></span><span></span><span></span>
            <b>detective-os.home</b>
          </div>
          <p class="caseCode">BOOT READY</p>
          <h2>Digital Detective OS</h2>
          <p class="menuSub">디지털 탐정단 : 사라진 학급 쿠폰</p>
          <p>
            4학년 학교 곳곳에서 생긴 작은 오해를 기록, 배려, 협력으로 해결합니다.
            사건 선택이 쌓이면 나만의 탐정 스타일과 캠페인 엔딩이 달라집니다.
          </p>
          <div class="osCommandStack">
            <button class="primaryAction" data-action="start" data-value="${nextCase.id}">
              ${state.caseRecords.length === 0 ? '첫 사건 실행' : isCampaignComplete(state) ? '캠페인 초기화' : '다음 사건 실행'}
            </button>
            <span>ACTIVE FILE · ${nextCase.code} · ${nextCase.title}</span>
          </div>
        </section>
        ${renderCampaignPanel()}
      </div>
      <div class="desktopDock" aria-hidden="true">
        <span class="dockApp active"></span>
        <span class="dockApp"></span>
        <span class="dockApp"></span>
        <span class="dockDivider"></span>
        <span class="dockApp small"></span>
      </div>
    </section>
  `;
}

function renderCampaignPanel() {
  const profile = getDetectiveProfile(state);
  return `
    <aside class="caseFiles" aria-label="${campaign.title}">
      <div class="windowChrome slim">
        <span></span><span></span><span></span>
        <b>case-files.db</b>
      </div>
      <div class="terminalHeader">
        <span>${campaign.title}</span>
        <b>${state.caseRecords.length}/${cases.length}</b>
      </div>
      <p>${campaign.subtitle}</p>
      <div class="detectiveBadge">
        <span>${profile.trait}</span>
        <b>${profile.title}</b>
        <small>${profile.body}</small>
      </div>
      ${renderCampaignStats()}
      <div class="caseFileList">
        ${cases.map(renderCaseFile).join('')}
      </div>
    </aside>
  `;
}

function renderCampaignStats() {
  return `
    <div class="campaignStats">
      ${Object.entries(campaign.statLabels)
        .map(
          ([key, label]) => `
            <span class="${key === 'rumorRisk' && state.campaignStats[key] > 0 ? 'risk' : ''}">
              <b>${label}</b>${state.campaignStats[key] ?? 0}
            </span>
          `
        )
        .join('')}
    </div>
  `;
}

function renderCaseFile(caseItem) {
  const record = state.caseRecords.find((item) => item.caseId === caseItem.id);
  const status = getCaseStatus(state, caseItem.id);
  const locked = status === '잠김';
  return `
    <button
      class="caseFile ${record ? 'solved' : ''} ${!locked && !record ? 'nextOpen' : ''}"
      data-action="start"
      data-value="${caseItem.id}"
      ${locked ? 'disabled' : ''}
    >
      <span>${caseItem.code} · ${status}</span>
      <div>
        <h3>${caseItem.title}</h3>
        <p>${record ? `${record.styleTitle} 기록으로 종결 · 다시 조사 가능` : caseItem.summary}</p>
      </div>
      <small>${locked ? 'LOCK' : record ? 'LOG' : 'OPEN'}</small>
    </button>
  `;
}

function renderIntro() {
  const activeCase = getActiveCase(state);
  const slide = activeCase.introSlides[state.introIndex];
  const isLast = state.introIndex === activeCase.introSlides.length - 1;
  return `
    <section class="introScreen" style="background-image: linear-gradient(rgba(29, 38, 48, 0.78), rgba(29, 38, 48, 0.68)), url('${activeCase.sceneImage}')">
      <div class="introBackdrop" aria-hidden="true"></div>
      <div class="introFrame">
        <div class="introMeta">
          <span>${slide.kicker}</span>
          <span>${String(state.introIndex + 1).padStart(2, '0')} / ${String(activeCase.introSlides.length).padStart(2, '0')}</span>
        </div>
        <h2>${slide.title}</h2>
        <p>${slide.body}</p>
        <div class="introMission">${activeCase.mission.intro}</div>
        <div class="introActions">
          <button data-action="intro-skip">건너뛰기</button>
          <button class="primaryAction compact" data-action="intro-next">${isLast ? `${activeCase.location}로 이동` : '다음'}</button>
        </div>
      </div>
    </section>
  `;
}

function renderScene() {
  const activeCase = getActiveCase(state);
  const hotspots = getCaseHotspots(activeCase);
  return `
    <section class="sceneScreen">
      <div class="sceneStage">
        <div class="sceneFrame">
          <img src="${activeCase.sceneImage}" alt="${activeCase.location} 사건 장면" />
          ${hotspots.map(renderHotspot).join('')}
        </div>
        <div class="sceneCaption">
          <b>${activeCase.location}</b>
          <span>${sceneCaption()}</span>
        </div>
      </div>
      ${renderCaseTerminal()}
    </section>
  `;
}

function sceneCaption() {
  const progress = getCaseProgress(state);
  if (canOpenBoard(state)) return '필요한 단서는 모였습니다. 이제 증거 보드에서 관계를 정리하세요.';
  if (progress.collected.length === 0) return '말이 커지기 전에, 먼저 조용히 살펴봅니다.';
  return '새 단서가 탐정 노트에 붙었습니다. 아직 빠진 조각이 있습니다.';
}

function renderHotspot(hotspot) {
  const progress = getCaseProgress(state);
  const found = progress.collected.includes(hotspot.clueId);
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
  const activeCase = getActiveCase(state);
  const boardUnlocked = canOpenBoard(state);
  const evidenceItems = getEvidenceItems(activeCase);
  return `
    <aside class="caseTerminal">
      <div class="terminalHeader">
        <span>탐정 단말기</span>
        <b>${boardUnlocked ? 'BOARD READY' : 'LOCKED'}</b>
      </div>
      <section class="missionBlock">
        <p class="caseCode">CURRENT MISSION</p>
        <h2>${boardUnlocked ? '증거 보드 열기' : activeCase.location}</h2>
        <p>${boardUnlocked ? activeCase.mission.board : activeCase.mission.scene}</p>
      </section>
      <div class="clueList">
        ${evidenceItems.map(renderClueRow).join('')}
      </div>
      <button class="terminalAction" data-action="board" ${boardUnlocked ? '' : 'disabled'}>
        증거 보드 접속
      </button>
    </aside>
  `;
}

function renderClueRow(clue) {
  const progress = getCaseProgress(state);
  const found = progress.collected.includes(clue.id);
  return `
    <article class="clueCard ${found ? 'found' : ''}">
      <span>${found ? clue.type : '미확인'}</span>
      <h3>${found ? clue.title : '???'}</h3>
      <p>${found ? clue.body : '이 사건 장면 안 어딘가에 아직 확인하지 못한 단서가 있습니다.'}</p>
    </article>
  `;
}

function renderBoard() {
  const activeCase = getActiveCase(state);
  const evidenceItems = getEvidenceItems(activeCase);
  const solved = isSolved(state);
  return `
    <section class="boardScreen">
      <div class="boardIntro">
        <p class="caseCode">EVIDENCE BOARD</p>
        <h2>말보다 먼저, 단서를 연결합니다</h2>
        <p>${activeCase.mission.board} 후보 파일 ${evidenceItems.length}개 중 사건과 이어지는 관계를 찾아보세요.</p>
      </div>
      <div class="boardWorkspace">
        <section class="boardCanvas" aria-label="${activeCase.title} 증거 관계도">
          <div class="boardWatermark" aria-hidden="true">${activeCase.code}</div>
          <svg class="boardLines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            ${activeCase.links.map(renderBoardLine).join('')}
          </svg>
          ${evidenceItems.map(renderBoardNode).join('')}
        </section>
        <div class="linkPanel">
          <h3>단서 검토</h3>
          ${renderSelectedCluePanel()}
          <h3 class="subheading">관계 로그</h3>
          <ul>
            ${activeCase.links.map(renderLinkStatus).join('')}
          </ul>
          ${solved ? renderBriefingGate() : '<p class="boardHint">단서의 문장 내용을 읽고 관련 있어 보이는 두 파일을 직접 골라 보세요.</p>'}
        </div>
      </div>
    </section>
  `;
}

function renderBoardNode(clue, index) {
  const progress = getCaseProgress(state);
  const selected = progress.selected === clue.id;
  const position = boardNodePositions[index] ?? { x: 50, y: 50 };
  return `
    <button
      class="boardNode ${selected ? 'selected' : ''}"
      style="--x:${position.x}%;--y:${position.y}%"
      data-action="select-clue"
      data-value="${clue.id}"
    >
      <span>${clue.type}</span>
      <b>${clue.title}</b>
      <small>${selected ? '선택 중' : '파일 열기'}</small>
    </button>
  `;
}

function renderBoardLine(link) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const evidenceItems = getEvidenceItems(activeCase);
  const aIndex = evidenceItems.findIndex((clue) => clue.id === link.a);
  const bIndex = evidenceItems.findIndex((clue) => clue.id === link.b);
  if (aIndex < 0 || bIndex < 0) return '';

  const a = boardNodePositions[aIndex] ?? { x: 50, y: 50 };
  const b = boardNodePositions[bIndex] ?? { x: 50, y: 50 };
  const done = progress.links.includes(linkKey(link.a, link.b));
  if (!done) return '';

  const selected = progress.selected === link.a || progress.selected === link.b;
  return `
    <line
      class="${done ? 'done' : ''} ${selected ? 'selected' : ''}"
      x1="${a.x}"
      y1="${a.y}"
      x2="${b.x}"
      y2="${b.y}"
    />
  `;
}

function renderSelectedCluePanel() {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const selected = getEvidenceItems(activeCase).find((clue) => clue.id === progress.selected);
  if (!selected) {
    return `
      <div class="selectedClue empty">
        <span>대기 중</span>
        <p>먼저 단서 하나를 선택하면 자세한 기록이 열립니다.</p>
      </div>
    `;
  }
  return `
    <div class="selectedClue">
      <span>${selected.type}</span>
      <b>${selected.title}</b>
      <p>${selected.body}</p>
    </div>
  `;
}

function renderLinkStatus(link) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const done = progress.links.includes(linkKey(link.a, link.b));
  const evidenceItems = getEvidenceItems(activeCase);
  const a = evidenceItems.find((clue) => clue.id === link.a);
  const b = evidenceItems.find((clue) => clue.id === link.b);
  return `
    <li class="${done ? 'done' : ''}">
      <span>${done ? '연결 완료' : '미확인'}</span>
      <b>${done ? `${a.title} + ${b.title}` : '아직 발견하지 못한 관계'}</b>
      ${done ? `<small>${link.reason}</small>` : ''}
    </li>
  `;
}

function renderBriefingGate() {
  return `
    <div class="finalChoice">
      <p class="caseCode">NEXT STEP</p>
      <h3>증거만으로는 아직 끝나지 않았습니다</h3>
      <p>오해가 남지 않도록, 탐정단 보고서를 먼저 완성해야 합니다.</p>
      <button data-action="briefing">
        <span>사건 보고서 작성</span>
        <small>사실을 순서대로 정리하기</small>
      </button>
    </div>
  `;
}

function renderBriefing() {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const expectedCount = activeCase.briefing.correctOrder.length;
  return `
    <section class="briefingScreen">
      <div class="briefingIntro">
        <p class="caseCode">CASE REPORT</p>
        <h2>${activeCase.briefing.title}</h2>
        <p>${activeCase.briefing.body}</p>
      </div>
      <div class="reportDesk">
        <section class="reportPaper">
          <div class="reportStamp">DRAFT</div>
          <h3>${activeCase.briefing.reportTitle}</h3>
          <ol class="reportSlots">
            ${activeCase.briefing.slots.map((slot, index) => renderReportSlot(slot, index)).join('')}
          </ol>
          <div class="reportActions">
            <button data-action="clear-briefing" ${progress.briefingReady ? 'disabled' : ''}>다시 쓰기</button>
            <button class="primaryAction compact" data-action="submit-briefing" ${progress.briefingReady ? 'disabled' : ''}>
              보고서 제출
            </button>
          </div>
        </section>
        <aside class="lineBank">
          <div class="terminalHeader">
            <span>문장 카드</span>
            <b>${progress.briefing.length}/${expectedCount}</b>
          </div>
          <div class="briefingLines">
            ${getBriefingLinesForDisplay(activeCase).map(renderBriefingLine).join('')}
          </div>
          ${progress.briefingReady ? renderFinalChoice() : '<p class="boardHint">문장 라벨이 아니라 내용을 읽고, 사건이 이해되는 순서로 보고서를 완성하세요.</p>'}
        </aside>
      </div>
    </section>
  `;
}

function renderReportSlot(_slot, index) {
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const lineId = progress.briefing[index];
  const line = activeCase.briefing.lines.find((item) => item.id === lineId);
  const prompt = reportStepPrompts[index] ?? `${index + 1}번째 문장`;
  return `
    <li class="${line ? 'filled' : ''}">
      <span>${prompt}</span>
      ${
        line
          ? `<button data-action="remove-briefing" data-value="${line.id}" ${progress.briefingReady ? 'disabled' : ''}>${line.text}</button>`
          : '<em>문장 카드를 선택하세요.</em>'
      }
    </li>
  `;
}

function getBriefingLinesForDisplay(activeCase) {
  return briefingDisplayOrder
    .map((index) => activeCase.briefing.lines[index])
    .filter(Boolean);
}

function renderBriefingLine(line, index) {
  const progress = getCaseProgress(state);
  const used = progress.briefing.includes(line.id);
  return `
    <button
      class="briefingLine ${used ? 'used' : ''}"
      data-action="select-briefing"
      data-value="${line.id}"
      ${used || progress.briefingReady ? 'disabled' : ''}
    >
      <span>문장 카드 ${index + 1}</span>
      <b>${line.text}</b>
    </button>
  `;
}

function renderFinalChoice() {
  const activeCase = getActiveCase(state);
  return `
    <div class="finalChoice">
      <p class="caseCode">FINAL DECISION</p>
      <h3>${activeCase.finalChoice.title}</h3>
      <p>${activeCase.finalChoice.body}</p>
      ${Object.entries(activeCase.endings)
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
  const activeCase = getActiveCase(state);
  const progress = getCaseProgress(state);
  const ending = activeCase.endings[progress.ending];
  const profile = getDetectiveProfile(state);
  const nextCase = getNextCase(state);
  const complete = isCampaignComplete(state);
  return `
    <section class="endingScreen">
      <div class="endingReport">
        <div class="windowChrome slim">
          <span></span><span></span><span></span>
          <b>case-close.report</b>
        </div>
        <div class="endingStamp">${activeCase.code} CLOSED</div>
        <p class="caseCode">CASE CLOSED REPORT</p>
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
            <p class="caseCode">${complete ? 'CAMPAIGN ENDING' : 'NEXT CASE'}</p>
            <h3>${complete ? resolveCampaignEnding(state).title : nextCase.title}</h3>
            <p>${complete ? '모든 사건 기록을 바탕으로 최종 캠페인 엔딩이 열렸습니다.' : profile.nextHook}</p>
          </section>
        </div>
        ${renderCaseRecord()}
        ${complete ? renderCampaignEnding() : ''}
        <div class="endingActions">
          ${nextCase ? `<button class="primaryAction" data-action="start" data-value="${nextCase.id}">다음 사건 시작</button>` : ''}
          <button data-action="menu">사건 파일 보기</button>
          <button data-action="start" data-value="${activeCase.id}">${activeCase.code} 다시 플레이</button>
        </div>
      </div>
    </section>
  `;
}

function renderCampaignEnding() {
  const finalEnding = resolveCampaignEnding(state);
  return `
    <section class="finalCampaign">
      <p class="caseCode">${finalEnding.code}</p>
      <h3>${finalEnding.title}</h3>
      <p>${finalEnding.body}</p>
      <div>${finalEnding.epilogue}</div>
      ${renderCampaignStats()}
    </section>
  `;
}

function renderCaseRecord() {
  return `
    <section class="caseRecord">
      <p class="caseCode">CASE LOG</p>
      ${cases
        .map((caseItem) => state.caseRecords.find((record) => record.caseId === caseItem.id))
        .filter(Boolean)
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
