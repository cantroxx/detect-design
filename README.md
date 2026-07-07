# Detect Design

`Detect Design` is a story-based elementary web game prototype.

Current game:

- Title: 디지털 탐정단 사건 파일
- Target: elementary grade 4
- Format: static HTML/CSS/JavaScript
- Flow: detective OS hub -> CASE 01~05 -> dialogue-based clue collection -> evidence relationship board -> case report -> case ending -> final campaign ending

Campaign note:

- CASE 01~05 are playable.
- Each case has 8 candidate observations: 4 relevant evidence files and 4 distracting or low-value files.
- Each case has 5 ending choices.
- The menu keeps unlock state, case log, campaign stats, and detective style record.
- Each case ending changes campaign stats.
- After CASE 05, the accumulated stats resolve one final campaign ending.

UI note:

- The main menu uses an imagegen-generated detective OS wallpaper at `public/scenes/detective-os-v001.png`.
- The board is a relationship graph, not a simple card grid, so the player sees clues accumulate and connect like a case file.

## Run Locally

```bash
python3 -m http.server 5176
```

Then open:

```text
http://127.0.0.1:5176/
```

## Vercel Import

Import this GitHub repository directly in Vercel.

- Framework preset: Other
- Build command: leave empty
- Output directory: leave empty
- Install command: leave empty

## Source And License Notes

This repository contains only the newly authored game prototype and generated visual assets prepared for this project. The upstream reference project is not included because its repository did not provide an explicit reuse license at the time of review.

No reuse license is granted unless a license file is added later.
