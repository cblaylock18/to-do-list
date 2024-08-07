import { getAllProjects } from "../aggregator";

// select lists
const projectList = document.querySelector(".project-list");
const taskList = document.querySelector(".task-list");

// select template
const taskTemplate = document.getElementById("task-template").content;

// select modals
const editProjectModal = document.querySelector("#edit-project-title");
const areYouSureModal = document.querySelector("#are-you-sure");
const addProjectModal = document.querySelector("#add-project");
const taskModal = document.querySelector("#task-modal");
const taskForm = taskModal.querySelector("form");

class Sidebar {
    static initializeSidebar() {
        // initialize the projects
        for (const project in getAllProjects) {
            Sidebar.addAProject(getAllProjects[project]);
        }
        // initialize button listener for adding a new project
        const addProjectBtn = document.querySelector(".add-project");
        addProjectBtn.addEventListener("click", Modal.addProject);

        // Event delegation for project clicks
        projectList.addEventListener("click", Tasks.selectAProject);
    }

    static addAProject(newProject) {
        // Creating and updating each project's div and classes
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.dataset.id = newProject.id;
        projectDiv.addEventListener("click", Tasks.selectAProject);
        // Creating and updating each projects title and task #
        const titleDiv = document.createElement("div");
        const titleCountHeader = document.createElement("p");
        const titleCount = document.createElement("p");
        projectDiv.classList.add("project");
        projectDiv.dataset.id = newProject.id;
        titleDiv.textContent = newProject.title;
        titleCountHeader.textContent = "Tasks:";
        titleCount.textContent = newProject.numberOfIncompleteTasks();

        projectDiv.appendChild(titleDiv);
        projectDiv.appendChild(titleCountHeader);
        projectDiv.appendChild(titleCount);

        // Creating edit and delete buttons for all except unassigned tasks catch all
        if (newProject.id !== "unassignedTasks") {
            // Creating an "add task" button
            const updateProjectBtn = document.createElement("button");
            updateProjectBtn.classList.add("update-project");
            updateProjectBtn.textContent = "Update Project Title";
            updateProjectBtn.addEventListener("click", Modal.updateProject);
            // Creating a "delete project" button
            const deleteProjectBtn = document.createElement("button");
            deleteProjectBtn.classList.add("delete-project");
            deleteProjectBtn.textContent = "Delete Project";
            deleteProjectBtn.addEventListener("click", Modal.areYouSure);
            projectDiv.appendChild(updateProjectBtn);
            projectDiv.appendChild(deleteProjectBtn);
        }
        // Creating an "add task" button
        const addTaskBtn = document.createElement("button");
        addTaskBtn.classList.add("add-task");
        addTaskBtn.textContent = "Add a Task";
        addTaskBtn.addEventListener("click", Modal.addATask);
        projectDiv.appendChild(addTaskBtn);
        projectList.appendChild(projectDiv);
    }

    static expandTasks() {}

    static deleteProject(id) {
        projectList.removeChild(
            document.querySelector('[data-id="' + id + '"]')
        );
        if (getAllProjects[id].selected === true) {
            getAllProjects.selectAProject("unassignedTasks");
            Tasks.clearTasks();
            Tasks.initializeTasks();
        }
        getAllProjects.deleteProject(id);
        areYouSureModal.close();
    }

    static updateProject(id) {
        const newTitle = editProjectModal.querySelector("input").value;
        document
            .querySelector('[data-id="' + id + '"]')
            .querySelector("div").textContent = newTitle;
        getAllProjects[id].edit(newTitle);
        editProjectModal.close();
    }
}

class Tasks {
    static initializeTasks() {
        getAllProjects.unassignedTasks.tasks.forEach((task) => {
            Tasks.listATask(task);
        });
    }

    static selectAProject(event) {
        // Find the project div by traversing the DOM up from the event target
        let projectDiv = event.target;
        while (
            projectDiv &&
            !projectDiv.dataset.id &&
            projectDiv !== projectList
        ) {
            projectDiv = projectDiv.parentNode;
        }

        // If a valid project div is found, proceed with task selection
        if (projectDiv && projectDiv.dataset.id) {
            const projectId = projectDiv.dataset.id;
            Tasks.clearTasks();
            getAllProjects.selectAProject(projectId);
            const project = getAllProjects[projectId];
            project.tasks.forEach((task) => {
                Tasks.listATask(task);
            });
        }
    }

    static listATask(task) {
        // update template with relevant info
        const taskClone = document.importNode(taskTemplate, true);
        taskClone.querySelector(".title").textContent = task.title;
        taskClone.querySelector(".due-content").textContent = task.dueDate;
        taskClone.querySelector(".description-content").textContent =
            task.description;
        taskClone.querySelector(".priority-content").textContent =
            task.priority;
        taskClone.querySelector(".notes-content").textContent = task.notes;
        taskClone.querySelector(".status-content").textContent = task.status;

        // button event listeners
        taskClone
            .querySelector(".edit-task")
            .addEventListener("click", Modal.editTask);
        taskClone
            .querySelector(".delete-task")
            .addEventListener("click", Modal.areYouSure);
        taskList.appendChild(taskClone);
    }

    static clearTasks() {
        while (taskList.childElementCount > 0)
            taskList.removeChild(taskList.lastChild);
    }

    static addATask(id) {
        const title = taskModal.querySelector("#task-title").value;
        const dueDate = taskModal.querySelector("#task-due-date").value;
        const description = taskModal.querySelector("#task-description").value;
        const priority = taskModal.querySelector("#task-priority").value;
        const notes = taskModal.querySelector("#task-notes").value;
        const status = taskModal.querySelector("#task-status").value;
        const newTask = getAllProjects[id].addTask(
            title,
            dueDate,
            description,
            priority,
            notes,
            status
        );
        if (getAllProjects[id].selected === true) {
            Tasks.listATask(newTask);
        }
        Modal.closeTaskModal();
    }
}

class Modal {
    static initializeModals() {
        editProjectModal
            .querySelector(".cancel-edit-project-title")
            .addEventListener("click", Modal.closeEditProjectModal);
        areYouSureModal
            .querySelector(".decline-are-you-sure")
            .addEventListener("click", Modal.closeAreYouSureModal);
        addProjectModal
            .querySelector(".decline-add-project")
            .addEventListener("click", Modal.closeAddProjectModal);
        addProjectModal
            .querySelector(".accept-add-project")
            .addEventListener("click", Modal.addProjectBtnClick);
        taskModal
            .querySelector(".cancel-add-task")
            .addEventListener("click", Modal.closeTaskModal);
        taskForm.addEventListener("submit", (event) => event.preventDefault());
    }

    static closeEditProjectModal() {
        editProjectModal
            .querySelector(".update-edit-project-title")
            .removeEventListener("click", Modal.updateProjectBtnClick);
        editProjectModal.close();
    }

    static closeAreYouSureModal() {
        areYouSureModal
            .querySelector(".accept-are-you-sure")
            .removeEventListener("click", Modal.deleteItemBtnClick);
        areYouSureModal.close();
    }

    static closeAddProjectModal() {
        addProjectModal.querySelector("input").value = "";
        addProjectModal.close();
    }

    static closeTaskModal() {
        taskModal
            .querySelector(".accept-add-task")
            .removeEventListener("click", Modal.addATaskBtnClick);
        taskModal.querySelector("form").reset();
        taskModal.close();
    }

    static updateProject(event) {
        event.stopPropagation();
        const projectTitle =
            event.target.parentNode.querySelector("div").textContent;
        editProjectModal.querySelector("h3").textContent = projectTitle;
        editProjectModal.querySelector("input").value = projectTitle;
        editProjectModal.showModal();
        Modal.updateProjectBtnClick = () => {
            Sidebar.updateProject(event.target.parentNode.dataset.id);
        };
        editProjectModal
            .querySelector(".update-edit-project-title")
            .addEventListener("click", Modal.updateProjectBtnClick);
    }

    static areYouSure(event) {
        //needs to be edited to account for whether item is project or task!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        event.stopPropagation();
        areYouSureModal.querySelector(
            "h3"
        ).textContent = `Are you sure you'd like to delete ${
            event.target.parentNode.querySelector("div").textContent
        }?`;
        areYouSureModal.showModal();
        Modal.deleteItemBtnClick = () => {
            Sidebar.deleteProject(event.target.parentNode.dataset.id);
        };
        areYouSureModal
            .querySelector(".accept-are-you-sure")
            .addEventListener("click", Modal.deleteItemBtnClick);
    }

    static addProject() {
        addProjectModal.showModal();
    }

    static addProjectBtnClick() {
        const newProjectTitle =
            addProjectModal.querySelector("#add-project-title").value;
        const newProjectId = getAllProjects.addProject(newProjectTitle);
        Sidebar.addAProject(getAllProjects[newProjectId]);
        Modal.closeAddProjectModal();
    }

    static addATask(event) {
        event.stopPropagation();
        const projectId = event.target.closest(".project").dataset.id;
        Modal.addATaskBtnClick = () => {
            event.preventDefault();
            if (!taskForm.checkValidity()) {
                taskForm.reportValidity();
                return;
            }
            Tasks.addATask(projectId);
        };
        taskModal
            .querySelector(".accept-add-task")
            .addEventListener("click", Modal.addATaskBtnClick);
        taskModal.showModal();
    }

    static editTask() {}
}

function initializeDOM() {
    Sidebar.initializeSidebar();
    Modal.initializeModals();
    Tasks.initializeTasks();
}

export { initializeDOM };
