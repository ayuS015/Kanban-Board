(() => {
    "use strict";

    /* STATE & HISTORY */
    const state = {
        todo: [],
        progress: [],
        done: []
    };

    const history = [];
    let historyIndex = -1;
    let draggedTaskId = null;

    /* DOM CACHE */
    const columns = {
        todo: document.querySelector("#to-do"),
        progress: document.querySelector("#in-progress"),
        done: document.querySelector("#done"),
    };

    const modal = document.querySelector(".modal");
    const modalBg = modal.querySelector(".bg");
    const toggleModalBtn = document.querySelector("#toggle-modal");
    const addTaskBtn = document.querySelector(".add-task-btn");

    const titleInput = document.querySelector("#task-title-input");
    const descInput = document.querySelector("#task-desc-input");

    /* STORAGE */
    const STORAGE_KEY = "kanban_data";

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function load() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) Object.assign(state, JSON.parse(data));
    }

    /* HISTORY (UNDO / REDO) */
    function snapshot() {
        history.splice(historyIndex + 1);
        history.push(JSON.stringify(state));
        historyIndex++;
    }

    function undo() {
        if (historyIndex <= 0) return;
        historyIndex--;
        Object.assign(state, JSON.parse(history[historyIndex]));
        render();
    }

    function redo() {
        if (historyIndex >= history.length - 1) return;
        historyIndex++;
        Object.assign(state, JSON.parse(history[historyIndex]));
        render();
    }

    /* UTILITIES*/
    function uid() {
        return crypto.randomUUID();
    }

    function updateCounts() {
        Object.entries(columns).forEach(([key, col]) => {
            col.querySelector(".heading .right").textContent = state[key].length;
        });
    }

    function toggleModal(show) {
        modal.classList.toggle("active", show);
        if (show) titleInput.focus();
    }

    /* RENDER */
    function render() {
        Object.entries(columns).forEach(([key, column]) => {
            column.querySelectorAll(".task").forEach(t => t.remove());

            state[key].forEach(task => {
                const el = document.createElement("div");
                el.className = "task";
                el.draggable = true;
                el.tabIndex = 0;
                el.setAttribute("role", "listitem");
                el.dataset.id = task.id;

                el.innerHTML = `
                    <h2>${task.title}</h2>
                    <p>${task.desc}</p>
                    <button class="delete-btn" aria-label="Delete task">✕</button>
                `;

                column.appendChild(el);
            });
        });

        updateCounts();
        save();
    }

    /* TASK OPERATIONS */
    function addTask(title, desc) {
        snapshot();
        state.todo.push({ id: uid(), title, desc });
        render();
    }

    function deleteTask(id) {
        snapshot();
        Object.keys(state).forEach(col => {
            state[col] = state[col].filter(t => t.id !== id);
        });
        render();
    }

    function moveTask(id, targetColumn) {
        snapshot();
        let task;
        Object.keys(state).forEach(col => {
            const index = state[col].findIndex(t => t.id === id);
            if (index !== -1) {
                task = state[col].splice(index, 1)[0];
            }
        });
        if (task) state[targetColumn].push(task);
        render();
    }

    /* DRAG & DROP */
    document.addEventListener("dragstart", e => {
        const task = e.target.closest(".task");
        if (!task) return;
        draggedTaskId = task.dataset.id;
        task.classList.add("dragging");
    });

    document.addEventListener("dragend", () => {
        draggedTaskId = null;
        document.querySelectorAll(".dragging").forEach(t => t.classList.remove("dragging"));
    });

    Object.entries(columns).forEach(([key, column]) => {
        column.addEventListener("dragover", e => {
            e.preventDefault();
            column.classList.add("hover-over");
        });

        column.addEventListener("dragleave", () => {
            column.classList.remove("hover-over");
        });

        column.addEventListener("drop", e => {
            e.preventDefault();
            column.classList.remove("hover-over");
            if (!draggedTaskId) return;
            moveTask(draggedTaskId, key);
        });
    });

    /* EVENTS */
    document.addEventListener("click", e => {
        if (e.target.classList.contains("delete-btn")) {
            deleteTask(e.target.closest(".task").dataset.id);
        }
    });

    toggleModalBtn.addEventListener("click", () => toggleModal(true));
    modalBg.addEventListener("click", () => toggleModal(false));

    addTaskBtn.addEventListener("click", () => {
        const title = titleInput.value.trim();
        if (!title) return alert("Title required");
        addTask(title, descInput.value.trim());
        titleInput.value = descInput.value = "";
        toggleModal(false);
    });

    /* KEYBOARD ACCESSIBILITY */
    document.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "z") undo();
        if (e.ctrlKey && e.key === "y") redo();
        if (e.key === "Escape") toggleModal(false);
    });

    /* INIT */
    load();
    snapshot();
    render();

})();
