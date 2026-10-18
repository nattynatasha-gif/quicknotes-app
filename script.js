// Select elements
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

// Notes array
let notes = [];

// Load notes from localStorage on page load
function loadNotes() {
  const stored = localStorage.getItem("quicknotes");
  if (stored) {
    try {
      notes = JSON.parse(stored);
    } catch (e) {
      notes = [];
    }
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

// Format a readable date/time
function formatDate(date) {
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Update the note count message
function updateCount(visibleCount) {
  if (visibleCount === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (visibleCount === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${visibleCount} notes.`;
  }
}

// Render the notes list (optionally filtered by search)
function render(filterText = "") {
  // Clear the list
  notesList.textContent = "";

  const search = filterText.trim().toLowerCase();
  const filtered = search
    ? notes.filter((note) => note.text.toLowerCase().includes(search))
    : notes;

  updateCount(filtered.length);

  if (filtered.length === 0) {
    const msg = document.createElement("li");
    msg.className = "no-notes-msg";
    msg.textContent = search
      ? "No notes match your search."
      : "No notes yet. Add one above!";
    notesList.appendChild(msg);
    return;
  }

  filtered.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    // Note text
    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text;
    li.appendChild(textP);

    // Meta (category + date + delete)
    const meta = document.createElement("div");
    meta.className = "note-meta";

    const catSpan = document.createElement("span");
    catSpan.className = "category-label";
    catSpan.textContent = note.category;
    meta.appendChild(catSpan);

    const dateSpan = document.createElement("span");
    dateSpan.textContent = note.createdAt;
    meta.appendChild(dateSpan);

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteNote(note.id));
    meta.appendChild(delBtn);

    li.appendChild(meta);
    notesList.appendChild(li);
  });
}

// Add a new note
function addNote(text, category) {
  const note = {
    id: Date.now().toString(),
    text: text.trim(),
    category: category,
    createdAt: formatDate(new Date())
  };
  notes.unshift(note); // newest first
  saveNotes();
  render(searchInput.value);
}

// Delete a note by id
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render(searchInput.value);
}

// Clear all notes (bonus)
function clearAllNotes() {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render(searchInput.value);
  }
}

// Form submit handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value;
  const category = categorySelect.value;

  // Validation
  if (text.trim() === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Valid – clear error, add note, reset input
  errorMessage.textContent = "";
  addNote(text, cate
... 
