# Playtest Report

Date: 2026-07-07

## Scope

- Product: 디지털 탐정단 사건 파일
- URL: http://127.0.0.1:5176/app/
- Target player: elementary grade 4
- Focus: complete campaign flow from case file hub through CASE 01~05, dialogue clue collection, evidence board, case report, case ending, and final campaign ending

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
10. Confirmed the case report screen opens after all evidence links are solved.
11. Confirmed endings stay locked until the report is submitted in the correct order.
12. Confirmed the ending records CASE 01 in the case log and derives a detective style.
13. Confirmed CASE 02~05 unlock one by one after the previous case is solved.
14. Confirmed final campaign endings resolve from accumulated campaign stats.
12. Confirmed the final choice panel appears only after the report is complete.
13. Confirmed reset returns to the menu and clears progress.
14. Confirmed a wrong evidence pair shows feedback without breaking the game state.

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
- Evidence nodes stay inside the board canvas without overlapping each other.
- Evidence board remains usable as a relationship graph.

## Follow-up Fix Applied

Small mobile hotspots were expanded with a `44px` minimum touch target under the narrow-screen media query. Keyboard focus styling was also added to make hotspot navigation clearer.

The ending transition now refreshes the status toast with the selected ending title instead of leaving the previous evidence-link message visible.

Static module paths now include a version query so browsers and static hosts do not keep an older game engine module after updates.

The game now uses a story-first structure: title dossier, prologue slides, dialogue-gated clue collection, case HUD, locked board state, and final decision panel.

Dialogue controls now keep a minimum 44px touch height on mobile.

The evidence board no longer jumps directly to endings. A case report step was added so players must organize the facts before choosing how to speak to the class.

The ending now carries campaign state: CASE LOG, DETECTIVE STYLE, NEXT CASE, campaign stats, and final campaign ending. This mirrors the reference structure where chapter endings leave a record and point to the next chapter.

## Campaign Pass

All 5 cases passed through the deterministic engine path:

- CASE 01: 사라진 칭찬 쿠폰
- CASE 02: 도서관 대출 카드의 빈칸
- CASE 03: 운동장 시간표의 두 이름
- CASE 04: 익명 게시판의 이상한 댓글
- CASE 05: 사라진 탐정 노트

Verified ending branches:

- All `kind` choices -> `함께 해결하는 탐정단`
- All `careful` choices -> `기록의 탐정단`
- Mixed `kind`, `careful`, and `rushed` choices -> `마음을 잇는 탐정단`
- Mixed low-threshold recovery path -> `성장하는 탐정단`
- All `rushed` choices -> `소문을 멈춘 탐정단`

## Hotspot Adjustment

The classroom hotspots were tightened to actual objects: the small record note, the duty chart, the coupon box, and the presentation materials. Large visible overlay rectangles should no longer cover neighboring boards or shelves. CASE 02~05 scene backgrounds were generated with imagegen and copied into `public/scenes`.

## OS UI Pass

Applied after the campaign pass.

- Main menu was changed from a normal title layout to an in-world detective OS desktop.
- A new imagegen-generated wallpaper was copied to `public/scenes/detective-os-v001.png`.
- Top navigation was changed into an OS status bar with compact app-style controls.
- Evidence board was changed from a 2x2 card grid to a relationship graph with clue nodes and connector lines.
- Hotspot overlays were made lighter so the scan frame marks objects without visually swallowing neighboring scene areas.
- Ending screen was changed into a case-close report with a stamp, detective style panel, next case or campaign ending, and cumulative case log.

## Console

No browser console errors were observed during the full ending pass.
