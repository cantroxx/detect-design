# Visual Style

## Direction

Warm classroom mystery inside a lightweight detective OS. The game should feel curious, safe, and lightly adventurous rather than dark or criminal.

The reference feels more like a game because the first screen behaves like an in-world interface, not a normal web landing page. This prototype now follows that direction:

- Main menu: OS desktop, app window, case database, dock.
- Scene: generated classroom/school image with scan-style hotspots.
- Board: relationship graph with evidence nodes and connector lines.
- Ending: case-close report with stamp, detective style, case log, and campaign ending.

## Palette

- Warm paper cream: `#fff7df`
- Soft chalk green: `#6fb48f`
- Sunny amber: `#f4b84a`
- Notebook blue: `#4f80c9`
- Pencil red: `#e46363`
- Ink charcoal: `#26303a`
- OS charcoal: `#101923`
- Signal teal: `#58c8bd`

## Image Rules

- Use imagegen for scene backgrounds and illustrative assets.
- Keep backgrounds text-free or use only unreadable marks. UI text is rendered in HTML.
- No real school names, logos, brands, or recognizable people.
- Keep important objects visually distinct: coupon box, notice board, cleaning chart, memo table.
- Leave enough open space for hotspot overlays and UI panels.

## Generated Assets

- `public/scenes/detective-os-v001.png`: imagegen-generated main menu detective OS wallpaper. Built-in imagegen mode. Prompt focus: cozy 4th-grade detective workstation, rain window, tablet relationship UI, no readable text, no logos, child-safe mystery mood.
- `public/scenes/classroom-v001.png`: first classroom scene.
- `public/scenes/library-v001.png`: CASE 02 scene.
- `public/scenes/playground-v001.png`: CASE 03 scene.
- `public/scenes/computer-lab-v001.png`: CASE 04 scene.
- `public/scenes/archive-room-v001.png`: CASE 05 scene.

## First Scene

4th grade classroom after morning homeroom. Bright but slightly mysterious. Desks, board, notice board, coupon box, cleaning chart, and presentation materials should all be visible.
