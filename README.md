# StickerSmash Grid Gallery

An Expo app showcasing several image grid patterns built with React Native. Local assets in `assets/images` provide the tiles (nature, travel, food, art, tech) and a Lottie loader; dummy remote URLs drive the feed-style layout.

## Grid layouts
- `app/grid.jsx` — 3-column responsive grid of local categories; tapping a tile opens the masonry view.
- `app/patternGrid.jsx` — Masonry-style wrap layout with randomized card sizes, header/back control, and navigation into the feed grid.
- `app/feedGrid.jsx` — Alternating mosaic rows (big + small blocks) using `dummyData` for remote images; includes a tile tap-through into `app/trial.jsx`.

## Navigation flow
Start from `app/grid.jsx` ➜ open `app/patternGrid.jsx` ➜ dive into `app/feedGrid.jsx` ➜ optional handoff to `app/trial.jsx`.

## Screenshots
Images captured from the current build live at the repo root:
- `Screenshot%20from%202025-11-24%2019-01-00.png`
- `Screenshot%20from%202025-11-24%2019-01-17.png`
- `Screenshot%20from%202025-11-24%2019-01-25.png`

## Run locally
1) Install dependencies: `npm install`  
2) Start the dev server: `npx expo start`

Open with the Expo Go app, an emulator, or a custom dev build as needed.
