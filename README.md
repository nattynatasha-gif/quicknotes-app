# QuickNotes

QuickNotes is a simple, browser-based note-taking app that lets you quickly capture, categorise, search and manage short notes. Everything is stored locally in your browser so your notes persist between visits without needing an account or server.

## Features

- Add notes with a category (Personal, Work or Study)
- Live character validation (empty notes and notes over 200 characters are blocked)
- Delete individual notes
- Search notes by text (case-insensitive, updates as you type)
- Persistent storage with localStorage – notes survive page refreshes
- Clear visual distinction between categories via coloured left borders
- Responsive layout that works on phones and desktops
- Bonus: Clear-all button with confirmation dialog

## How to run locally

1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
3. No build step or server is required – it runs entirely client-side.

Alternatively, if you have a local server:

```bash
npx serve .
# or
python -m http.server 8000
```

Then visit the URL shown in the terminal.

## What I learned

- How to structure a semantic HTML page with forms, labels and accessible controls
- Using Flexbox for form layouts and media queries for responsive design
- Managing application state with a JavaScript array of objects and re-rendering the DOM with `createElement` / `textContent` (avoiding `innerHTML` for user content)
- Persisting data with `localStorage` and `JSON.stringify` / `JSON.parse`
- Implementing live search filtering and proper pluralisation of UI messages
