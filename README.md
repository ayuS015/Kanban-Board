# 🗂️ Kanban Board

A **minimal, modern Kanban Board** built using **HTML, CSS, and Vanilla JavaScript**.  
This project allows users to manage tasks visually across three columns: **To Do**, **In Progress**, and **Done** — with drag & drop support, local persistence, and keyboard accessibility.



## ✨ Features

- ✅ Create tasks with title and description
- 🖱️ Drag & drop tasks between columns
- 💾 Persistent storage using `localStorage`
- ⏪ Undo / Redo support (`Ctrl + Z`, `Ctrl + Y`)
- 🗑️ Delete tasks easily
- ♿ Accessibility-friendly (ARIA roles, keyboard support)
- 🌙 Dark mode UI with modern design tokens
- 🎯 No frameworks — **100% Vanilla JS**




## 🛠️ Tech Stack

- **HTML5** – semantic structure & accessibility
- **CSS3** – custom design system, dark theme, animations
- **JavaScript (ES6+)** – state management, drag & drop, persistence




## 📂 Project Structure

```

kanban-board/
│
├── index.html      # Main HTML structure
├── style.css       # Styling, layout, dark theme
├── script.js       # Application logic
└── README.md       # Project documentation

````




## 🧠 How It Works

### 📌 State Management

* Tasks are stored in three arrays:

  * `todo`
  * `progress`
  * `done`
* The entire state is saved to **localStorage** automatically.

### 🖱️ Drag & Drop

* Native HTML5 Drag & Drop API
* Tasks can be moved between columns visually
* Column highlights on hover for better UX

### ⏪ Undo / Redo

* Every state change is snapshotted
* Keyboard shortcuts:

  * **Undo:** `Ctrl + Z`
  * **Redo:** `Ctrl + Y`

### ♿ Accessibility

* ARIA roles for lists, dialogs, and live regions
* Fully keyboard navigable
* `prefers-reduced-motion` respected




## ⌨️ Keyboard Shortcuts

| Action      | Shortcut   |
| ----------- | ---------- |
| Undo        | `Ctrl + Z` |
| Redo        | `Ctrl + Y` |
| Close modal | `Esc`      |




## 🎨 Design Highlights

* CSS variables for easy theming
* Dark-first UI design
* Smooth micro-interactions
* Responsive grid layout
* Motion-safe animations




## 📈 Possible Improvements

* ✏️ Edit existing tasks
* 📱 Mobile drag & drop improvements
* 🏷️ Task labels or priorities
* 🔍 Search & filter tasks
* ☁️ Cloud sync / backend support




## 🙌 Acknowledgements

Built with ❤️ using **JavaScript**


