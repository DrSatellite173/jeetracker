# JeeTracker

A lightweight productivity tracker app built for the `jeetracker` repository.

## Features

- Add task items with priority and category
- Mark tasks as complete or incomplete
- Delete tasks from the list
- Save progress locally in the browser via `localStorage`
- Responsive, polished dashboard UI

## Run locally

Because this app is a simple static website, you can start it with any static server.

### Option 1: Python

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

### Option 2: Node

```bash
npx serve . -l 3000
```

## Files

- `index.html` — page structure
- `styles.css` — visual design and responsive layout
- `app.js` — task logic and local persistence
