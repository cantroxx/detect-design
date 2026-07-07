# Playtest Report

Date: 2026-07-07

## Scope

- Product: 디지털 탐정단: 사라진 학급 쿠폰
- URL: http://127.0.0.1:5176/app/
- Target player: elementary grade 4
- Focus: complete story flow from title to prologue, dialogue clue collection, evidence board, and ending

## Desktop Flow

Passed.

1. Opened the title screen.
2. Started the case with `새 사건 시작`.
3. Advanced through the three-part prologue.
4. Confirmed the classroom scene opens with the evidence board locked.
5. Confirmed each hotspot opens a dialogue before a clue is recorded.
6. Collected all four classroom clues:
   - 쿠폰 기록표
   - 청소 당번표
   - 쿠폰 상자
   - 발표 준비 메모
7. Confirmed clue progress moved from `0/4` to `4/4`.
8. Confirmed `증거 보드` unlocks only after all clues are collected.
9. Connected the three correct evidence pairs:
   - 쿠폰 기록표 + 쿠폰 상자
   - 청소 당번표 + 발표 준비 메모
   - 발표 준비 메모 + 쿠폰 상자
10. Confirmed the final choice panel appears only after all evidence links are solved.
11. Confirmed reset returns to the menu and clears progress.
12. Confirmed a wrong evidence pair shows feedback without breaking the game state.

## Ending Coverage

All endings passed.

| Choice | Ending title | Result |
| --- | --- | --- |
| 선생님과 기록을 확인한다 | 꼼꼼한 탐정 | Passed |
| 친구들과 차분히 함께 찾는다 | 따뜻한 탐정 | Passed |
| 바로 모두에게 말한다 | 다시 확인하는 탐정 | Passed |

## Mobile Check

Passed at `390 x 844`.

- No horizontal overflow on menu, scene, or board screens.
- Classroom image loads correctly.
- All hotspots are visible.
- Board cards stack into one column.
- Evidence board remains usable.

## Follow-up Fix Applied

Small mobile hotspots were expanded with a `44px` minimum touch target under the narrow-screen media query. Keyboard focus styling was also added to make hotspot navigation clearer.

The ending transition now refreshes the status toast with the selected ending title instead of leaving the previous evidence-link message visible.

Static module paths now include a version query so browsers and static hosts do not keep an older game engine module after updates.

The game now uses a story-first structure: title dossier, prologue slides, dialogue-gated clue collection, case HUD, locked board state, and final decision panel.

Dialogue controls now keep a minimum 44px touch height on mobile.

## Console

No browser console errors were observed during the full ending pass.
