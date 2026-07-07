# Detect Design

`Detect Design` is a story-based elementary web game prototype.

Current game:

- Title: 디지털 탐정단: 사라진 칭찬 쿠폰
- Target: elementary grade 4
- Format: static HTML/CSS/JavaScript
- Flow: case file hub -> prologue -> dialogue-based clue collection -> evidence board -> case report -> ending choice -> detective style / next case preview

Campaign note:

- CASE 01 is playable.
- The menu and ending now keep a case log and detective style record.
- CASE 02 and CASE 03 are staged as follow-up case files so later work can branch from the player's CASE 01 style.

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
