const projectList = document.querySelector(".project-list");

function updateProjectList(allProjects) {
    for (const project in allProjects) {
        // Creating and updating each project's div and classes
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.dataset.id = allProjects[project].id;
        // Creating and updating each projects title and task #
        const titleDiv = document.createElement("div");
        const titleCount = document.createElement("p");
        titleDiv.textContent = allProjects[project].title;
        titleCount.textContent = allProjects[project].numberOfTasks();
        // Creating an "add task" button
        const addTaskBtn = document.createElement("button");
        addTaskBtn.classList.add("add-task");
        addTaskBtn.textContent = "Add a New Task";
        addTaskBtn.addEventListener("click", addTask);
        // Creating a "delete project" button
        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.classList.add("delete-project");
        deleteProjectBtn.textContent = "Delete Project";
        deleteProjectBtn.addEventListener("click", deleteProject);
        // Appending children
        titleDiv.appendChild(titleCount);
        projectDiv.appendChild(titleDiv);
        projectDiv.appendChild(addTaskBtn);
        projectDiv.appendChild(deleteProjectBtn);
        projectList.appendChild(projectDiv);
    }
}

function updateProject() {}

function deleteProject() {
    console.log("I deleted a project!");
}

function selectAProject() {}

function addTask() {
    console.log("I added a task!");
}

function updateTask() {}

function deleteTask() {}

//filter functions

export { updateProjectList };
