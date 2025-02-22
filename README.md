# To-Do List App

A simple To-Do List application built as part of The Odin Project curriculum to practice JavaScript fundamentals and DOM manipulation. This project lets users add projects and tasks, mark tasks as complete, and delete tasks, with info persisting across sessions via localStorage.

## Table of Contents
1. [Features](#features)
2. [Live Demo](#live-demo)
3. [Technologies Used](#technologies-used)
4. [Usage](#usage)
5. [Future Improvements](#future-improvements)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- **Add/Delete/Change Projects:** Easily input new projects or delete them. Also, change the title as needed.
- **Add/Delete/Change Tasks:** Easily input new tasks or delete them. Also, you can edit all aspects of a task, including completion status or moving to a different project.
- **Automatically Place Tasks in Order of Priority:** Tasks always appear in decreasing order of priority for a project.
- **Live Updates on Incomplete Tasks:** Always see accurate values for the number of incomplete tasks remaining for a project.
- **Persistent Storage:** Uses localStorage to save projects and tasks between sessions.
- **Responsive Design:** Optimized for various screen sizes.

---

## Live Demo

**[View Demo on Github Pages](https://cblaylock18.github.io/to-do-list/)**  

<img src="https://github.com/user-attachments/assets/6f2059e7-471e-403a-8e76-af7b29bdcb06" alt="screenshot of to-do list"/>

---

## Technologies Used

**HTML5, CSS3, JavaScript (ES6+), DOM Manipulation, LocalStorage**

---

## Usage

1. **Add a Project:** Click "Add a new project". Fill out it's title. Click add. 
2. **Add a Task:** Click "Add a task" on the desired project. Fill out the form and click add.
3. **Complete a Task:** Click on a task's "Complete" or "Incomplete" text to toggle its completion status.
4. **Edit a Task:** Click "Edit" on a task to adjust any of the info on it.
5. **Delete a Task:** Use the delete button to remove a task.
6. **Move a Task:** Click "Move" on a task to move it to a different project.
7. **Data Persistence:** Tasks are saved locally so they remain after page reloads.

---

## Future Improvements

- **Prioritization & Filtering:** Add priority levels and filters for completed vs. pending tasks.
- **Enhanced UI:** Incorporate animations and additional styling for a more polished experience.

---

## Contributing

Contributions, issues, and feature requests are welcome!  
1. Fork the project.  
2. Create your feature branch: `git checkout -b feature/your-feature`  
3. Commit your changes: `git commit -m 'Add a cool feature'`  
4. Push to the branch: `git push origin feature/your-feature`  
5. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](./LICENSE.txt).
