document.addEventListener("DOMContentLoaded", function () {
  const notesList = document.getElementById("notesList");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteInput = document.getElementById("noteInput");

  addNoteBtn.addEventListener("click", function () {
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
      const note = document.createElement("div");
      note.className =
        "note alert alert-info d-flex justify-content-between align-items-center mb-2";
      note.innerHTML = `
          <span>${noteText}</span>
          <button class="btn btn-danger btn-sm ml-2 deleteBtn">Удалить</button>
        `;
      notesList.appendChild(note);
      noteInput.value = "";

      setTimeout(() => {
        note.classList.add("slide-in");
      }, 10);

      saveNotes();
    }
  });

  notesList.addEventListener("click", function (e) {
    if (e.target.classList.contains("deleteBtn")) {
      const note = e.target.parentElement;
      note.classList.add("slide-out");
      setTimeout(() => {
        notesList.removeChild(note);
        saveNotes();
      }, 300);
    }
  });

  function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note").forEach((note) => {
      notes.push(note.querySelector("span").innerText);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((noteText) => {
      const note = document.createElement("div");
      note.className =
        "note alert alert-info d-flex justify-content-between align-items-center mb-2 slide-in";
      note.innerHTML = `
          <span>${noteText}</span>
          <button class="btn btn-danger btn-sm ml-2 deleteBtn">Удалить</button>
        `;
      notesList.appendChild(note);
    });
  }

  loadNotes();
});
