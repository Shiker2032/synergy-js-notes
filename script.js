document.addEventListener("DOMContentLoaded", function () {
  // Получаем необходимые элементы из DOM
  const notesList = document.getElementById("notesList");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteInput = document.getElementById("noteInput");

  // Обработчик события клика по кнопке "Добавить заметку"
  addNoteBtn.addEventListener("click", function () {
    // Получаем текст заметки из input
    const noteText = noteInput.value.trim();
    // Проверяем, что введен не пустой текст и создаем новую заметку
    if (noteText !== "") {
      const note = createNoteElement(noteText);      
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
      // Если кликнули на кнопку удаления то удаляем заметку
      const note = e.target.parentElement;      
      note.classList.add("slide-out");
      setTimeout(() => {        
        notesList.removeChild(note);        
        saveNotes();
      }, 300);
    } else if (e.target.classList.contains("editBtn")) {
      // Если кликнули на кнопку редактирования
      const note = e.target.parentElement;
      const span = note.querySelector("span");
      const editText = span.innerText;
      const editInput = document.createElement("input");
      // Добавляем поле ввода для редактирования
      editInput.type = "text";
      editInput.value = editText;
      editInput.classList.add("form-control");
      note.insertAdjacentElement('beforeend', editInput);
      // Скрываем текст заметки
      span.style.display = "none"; 
      e.target.style.display = "none"; 
      // Добавляем кнопку сохранения изменений
      const saveBtn = document.createElement("button");
      saveBtn.innerText = "Сохранить";
      saveBtn.classList.add("btn", "btn-primary", "btn-sm", "ml-2", "saveBtn");
      note.appendChild(saveBtn);
      saveBtn.addEventListener("click", function () {
        const newText = editInput.value.trim();
        // Проверяем был ли введент текст и добавляем заметку
        if (newText !== "") {
          // Обновляем текст заметки
          span.innerText = newText;
          span.style.display = "inline"; 
          // Удаляем поле ввода и кнопку сохранения
          note.removeChild(editInput); 
          note.removeChild(saveBtn); 
          e.target.style.display = "inline";    
          saveNotes();
        } else {
          note.remove();
          saveNotes();
        }
      });
    }
  });

  // Функция сохранения заметок в локальное хранилище
  function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note").forEach((note) => {
      notes.push(note.querySelector("span").innerText);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Функция загрузки заметок из локального хранилища
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((noteText) => {
      const note = createNoteElement(noteText);
      notesList.appendChild(note);
    });
  }

  // Функция создания верстки заметки
  function createNoteElement(noteText) {
    const note = document.createElement("div");
    note.style = "display: grid;  grid-template-columns: repeat(3, 1fr)"
    note.className =
      "note alert alert-info mb-2 slide-in";
    note.innerHTML = `
        <span>${noteText}</span>
        <button class="btn btn-danger btn-sm ml-2 deleteBtn">Удалить</button>
        <button class="btn btn-primary btn-sm ml-2 editBtn">Редактировать</button>
      `;
    return note;
  }  
  loadNotes();
});
