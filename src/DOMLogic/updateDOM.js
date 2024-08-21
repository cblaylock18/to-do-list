import {
    getAllProjects,
    DateHandler,
    localStorageHandler,
} from "../aggregator";

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
const moveTaskModal = document.querySelector("#move-a-task");

// select task header
const taskHeader = document.querySelector(".task-header");

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

        const projectId = getAllProjects.selectedProject();
        const projectDiv = document.querySelector(
            '[data-id="' + projectId + '"]'
        );
        Tasks.clearTasks();
        Array.from(projectList.children).forEach((child) => {
            child.classList.remove("selected");
        });
        projectDiv.classList.add("selected");
        const project = getAllProjects[projectId];
        if (project.id === "unassignedTasks") {
            taskHeader.textContent = `Unassigned Tasks`;
        } else {
            taskHeader.textContent = `${project.title} Tasks`;
        }
        project.tasks.forEach((task) => {
            Tasks.listATask(task);
        });
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
        titleCount.classList.add("task-count");
        projectDiv.classList.add("project");
        projectDiv.dataset.id = newProject.id;
        titleDiv.textContent = newProject.title;
        titleCountHeader.textContent = "Incomplete Tasks:";
        titleCount.textContent = newProject.numberOfIncompleteTasks();

        projectDiv.appendChild(titleDiv);
        projectDiv.appendChild(titleCountHeader);
        projectDiv.appendChild(titleCount);

        // Creating edit and delete buttons for all except unassigned tasks catch all
        if (newProject.id !== "unassignedTasks") {
            // Creating an "add task" button
            const updateProjectBtn = document.createElement("button");
            updateProjectBtn.classList.add("update-project");
            updateProjectBtn.textContent = "Update Title";
            updateProjectBtn.addEventListener("click", Modal.updateProject);
            // Creating a "delete project" button
            const deleteProjectBtn = document.createElement("button");
            deleteProjectBtn.classList.add("delete-project");
            deleteProjectBtn.textContent = "Delete Project";
            deleteProjectBtn.addEventListener(
                "click",
                Modal.areYouSureProjectDeletion
            );
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

    static deleteProject(id) {
        projectList.removeChild(
            document.querySelector('[data-id="' + id + '"]')
        );
        if (getAllProjects[id].selected === true) {
            getAllProjects.selectAProject("unassignedTasks");
            Tasks.clearTasks();
            Tasks.selectDefaultProject();
        }
        getAllProjects.deleteProject(id);
        Modal.closeAreYouSureModal();
        localStorageHandler.saveProjectsToLocalStorage();
    }

    static updateProject(id) {
        const newTitle = editProjectModal.querySelector("input").value;
        document
            .querySelector('[data-id="' + id + '"]')
            .querySelector("div").textContent = newTitle;
        getAllProjects[id].edit(newTitle);
        if (id === getAllProjects.selectedProject) {
            taskHeader.textContent = `${project.title} Tasks`;
        }
        Modal.closeEditProjectModal();
        localStorageHandler.saveProjectsToLocalStorage();
    }
}

class Tasks {
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
            localStorageHandler.saveProjectsToLocalStorage();
            Array.from(projectList.children).forEach((child) => {
                child.classList.remove("selected");
            });
            projectDiv.classList.add("selected");
            const project = getAllProjects[projectId];
            if (project.id === "unassignedTasks") {
                taskHeader.textContent = `Unassigned Tasks`;
            } else {
                taskHeader.textContent = `${project.title} Tasks`;
            }
            project.tasks.forEach((task) => {
                Tasks.listATask(task);
            });
        }
    }

    static selectDefaultProject() {
        const projectDiv = document.querySelector(
            '[data-id="' + "unassignedTasks" + '"]'
        );
        Tasks.clearTasks();
        Array.from(projectList.children).forEach((child) => {
            child.classList.remove("selected");
        });
        projectDiv.classList.add("selected");
        const project = getAllProjects.unassignedTasks;
        taskHeader.textContent = `Unassigned Tasks`;

        project.tasks.forEach((task) => {
            Tasks.listATask(task);
        });
    }

    static listATask(task) {
        // update template with relevant info
        const taskClone = document.importNode(taskTemplate, true);

        // use classes to signify priority and status, red yellow green or grey
        if (task.status === "Complete") {
            taskClone.querySelector(".task").classList.add("complete");
        } else if (task.priority === "Low") {
            taskClone.querySelector(".task").classList.add("low");
        } else if (task.priority === "Medium") {
            taskClone.querySelector(".task").classList.add("medium");
        } else if (task.priority === "High") {
            taskClone.querySelector(".task").classList.add("high");
        }

        taskClone.querySelector(".task").dataset.id = task.id;
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
            .addEventListener("click", Modal.areYouSureTaskDeletion);
        taskClone
            .querySelector(".move-task")
            .addEventListener("click", Modal.moveTask);
        taskClone
            .querySelector(".status-content")
            .addEventListener("click", Tasks.toggleCompletion);
        taskList.appendChild(taskClone);
    }

    static editExistingTask(taskId) {
        // update
        const taskDOM = document.querySelector('[data-id="' + taskId + '"]');
        const task = getAllProjects.getTask(taskId);
        taskDOM.querySelector(".title").textContent = task.title;
        taskDOM.querySelector(".due-content").textContent = task.dueDate;
        taskDOM.querySelector(".description-content").textContent =
            task.description;
        taskDOM.querySelector(".priority-content").textContent = task.priority;
        taskDOM.querySelector(".notes-content").textContent = task.notes;
        taskDOM.querySelector(".status-content").textContent = task.status;

        taskDOM.classList.remove("complete", "low", "medium", "high");
        if (task.status === "Complete") {
            taskDOM.classList.add("complete");
        } else if (task.priority === "Low") {
            taskDOM.classList.add("low");
        } else if (task.priority === "Medium") {
            taskDOM.classList.add("medium");
        } else if (task.priority === "High") {
            taskDOM.classList.add("high");
        }
        localStorageHandler.saveProjectsToLocalStorage();
    }

    static toggleCompletion(event) {
        event.stopPropagation();
        const taskId = event.target.closest(".task").dataset.id;
        const task = getAllProjects.getTask(taskId);
        const projectId = getAllProjects.selectedProject();
        getAllProjects[projectId].toggleTaskStatus(taskId);
        const taskDOM = document.querySelector('[data-id="' + taskId + '"]');
        taskDOM.remove();
        Tasks.listATask(task);

        projectList
            .querySelector('[data-id="' + projectId + '"]')
            .querySelector(".task-count").textContent =
            getAllProjects[projectId].numberOfIncompleteTasks();
        localStorageHandler.saveProjectsToLocalStorage();
    }

    static clearTasks() {
        while (taskList.childElementCount > 0) {
            taskList.removeChild(taskList.lastChild);
        }
    }

    static addATask(projectId) {
        const title = taskModal.querySelector("#task-title").value;
        const dueDate = taskModal.querySelector("#task-due-date").value;
        const description = taskModal.querySelector("#task-description").value;
        const priority = taskModal.querySelector("#task-priority").value;
        const notes = taskModal.querySelector("#task-notes").value;
        const status = taskModal.querySelector(
            '#task-status input[name="status"]:checked'
        ).value;
        const newTask = getAllProjects[projectId].addTask(
            title,
            dueDate,
            description,
            priority,
            notes,
            status
        );
        if (getAllProjects[projectId].selected === true) {
            Tasks.listATask(newTask);
        }
        projectList
            .querySelector('[data-id="' + projectId + '"]')
            .querySelector(".task-count").textContent =
            getAllProjects[projectId].numberOfIncompleteTasks();
        localStorageHandler.saveProjectsToLocalStorage();
    }

    static editATask(projectId, taskId) {
        const title = taskModal.querySelector("#task-title").value;
        const dueDate = taskModal.querySelector("#task-due-date").value;
        const description = taskModal.querySelector("#task-description").value;
        const priority = taskModal.querySelector("#task-priority").value;
        const notes = taskModal.querySelector("#task-notes").value;
        const status = taskModal.querySelector(
            '#task-status input[name="status"]:checked'
        ).value;
        getAllProjects[projectId].editTask(
            taskId,
            title,
            dueDate,
            description,
            priority,
            notes,
            status
        );
        projectList
            .querySelector('[data-id="' + projectId + '"]')
            .querySelector(".task-count").textContent =
            getAllProjects[projectId].numberOfIncompleteTasks();
        Tasks.editExistingTask(taskId);
        localStorageHandler.saveProjectsToLocalStorage();
    }

    static deleteTask(projectId, taskId) {
        const taskDOM = document.querySelector('[data-id="' + taskId + '"]');
        taskDOM.remove();
        getAllProjects[projectId].deleteTask(taskId);
        projectList
            .querySelector('[data-id="' + projectId + '"]')
            .querySelector(".task-count").textContent =
            getAllProjects[projectId].numberOfIncompleteTasks();
        Modal.closeAreYouSureModal();
        localStorageHandler.saveProjectsToLocalStorage();
    }

    static moveATask(currentProjectId, newProjectId, task) {
        if (currentProjectId !== newProjectId) {
            getAllProjects.moveATask(currentProjectId, newProjectId, task);
            Tasks.deleteTask(currentProjectId, task.id);
            projectList
                .querySelector('[data-id="' + currentProjectId + '"]')
                .querySelector(".task-count").textContent =
                getAllProjects[currentProjectId].numberOfIncompleteTasks();
            projectList
                .querySelector('[data-id="' + newProjectId + '"]')
                .querySelector(".task-count").textContent =
                getAllProjects[newProjectId].numberOfIncompleteTasks();
            localStorageHandler.saveProjectsToLocalStorage();
        }
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
        moveTaskModal
            .querySelector(".decline-move-task")
            .addEventListener("click", Modal.closeMoveTaskModal);

        // accounting for escaping the modal some other way
        editProjectModal.addEventListener("close", Modal.closeEditProjectModal);
        areYouSureModal.addEventListener("close", Modal.closeAreYouSureModal);
        addProjectModal.addEventListener("close", Modal.closeAddProjectModal);
        taskModal.addEventListener("close", Modal.closeTaskModal);
        moveTaskModal.addEventListener("close", Modal.closeMoveTaskModal);
    }

    static highlightFirstInputOnModalOpen(modal) {
        const firstInput = modal.querySelector("input, textarea");
        if (firstInput) {
            firstInput.focus();
            setTimeout(() => {
                firstInput.select();
            }, 10);
        }
    }

    static closeEditProjectModal() {
        editProjectModal
            .querySelector(".update-edit-project-title")
            .removeEventListener("click", Modal.updateProjectBtnClick);
        editProjectModal
            .querySelector("#new-project-title")
            .classList.remove("not-long-enough-error");
        editProjectModal.close();
    }

    static closeAreYouSureModal() {
        areYouSureModal
            .querySelector(".accept-are-you-sure")
            .removeEventListener("click", Modal.deleteProjectBtnClick);
        areYouSureModal
            .querySelector(".accept-are-you-sure")
            .removeEventListener("click", Modal.deleteTaskBtnClick);
        areYouSureModal.close();
    }

    static closeAddProjectModal() {
        addProjectModal.querySelector("input").value = "";
        addProjectModal
            .querySelector("#add-project-title")
            .classList.remove("not-long-enough-error");
        addProjectModal.close();
    }

    static closeTaskModal() {
        taskModal
            .querySelector(".accept-add-task")
            .removeEventListener("click", Modal.addATaskBtnClick);
        taskModal
            .querySelector(".accept-add-task")
            .removeEventListener("click", Modal.editATaskBtnClick);
        taskModal.querySelector("form").reset();
        taskModal.close();
    }

    static closeMoveTaskModal() {
        moveTaskModal
            .querySelector(".accept-move-task")
            .removeEventListener("click", Modal.moveATaskBtnClick);
        while (
            moveTaskModal.querySelector("#a-new-project").childElementCount > 0
        ) {
            moveTaskModal
                .querySelector("#a-new-project")
                .removeChild(
                    moveTaskModal.querySelector("#a-new-project").lastChild
                );
        }
        moveTaskModal.close();
    }

    static updateProject(event) {
        event.stopPropagation();
        const projectTitle =
            event.target.parentNode.querySelector("div").textContent;
        editProjectModal.querySelector("h3").textContent = projectTitle;
        editProjectModal.querySelector("input").value = projectTitle;
        Modal.highlightFirstInputOnModalOpen(editProjectModal);
        editProjectModal.showModal();
        Modal.updateProjectBtnClick = () => {
            const proposedNewTitle =
                editProjectModal.querySelector("input").value;
            if (proposedNewTitle.length < 1) {
                editProjectModal
                    .querySelector("#new-project-title")
                    .classList.add("not-long-enough-error");
                return;
            }
            Sidebar.updateProject(event.target.parentNode.dataset.id);
        };
        editProjectModal
            .querySelector(".update-edit-project-title")
            .addEventListener("click", Modal.updateProjectBtnClick);
    }

    static areYouSureProjectDeletion(event) {
        event.stopPropagation();
        areYouSureModal.querySelector(
            "h3"
        ).textContent = `Are you sure you'd like to delete ${
            event.target.parentNode.querySelector("div").textContent
        }?`;
        Modal.highlightFirstInputOnModalOpen(areYouSureModal);
        areYouSureModal.showModal();
        Modal.deleteProjectBtnClick = () => {
            Sidebar.deleteProject(event.target.parentNode.dataset.id);
        };
        areYouSureModal
            .querySelector(".accept-are-you-sure")
            .addEventListener("click", Modal.deleteProjectBtnClick);
    }
    static areYouSureTaskDeletion(event) {
        event.stopPropagation();
        const taskId = event.target.closest(".task").dataset.id;
        const task = getAllProjects.getTask(taskId);
        const projectId = getAllProjects.selectedProject();
        areYouSureModal.querySelector(
            "h3"
        ).textContent = `Are you sure you'd like to delete ${task.title}?`;
        Modal.highlightFirstInputOnModalOpen(areYouSureModal);
        areYouSureModal.showModal();
        Modal.deleteTaskBtnClick = () => {
            Tasks.deleteTask(projectId, taskId);
        };
        areYouSureModal
            .querySelector(".accept-are-you-sure")
            .addEventListener("click", Modal.deleteTaskBtnClick);
    }

    static addProject() {
        Modal.highlightFirstInputOnModalOpen(addProjectModal);
        addProjectModal.showModal();
    }

    static addProjectBtnClick() {
        const proposedNewTitle =
            addProjectModal.querySelector("#add-project-title").value;
        if (proposedNewTitle.length < 1) {
            addProjectModal
                .querySelector("#add-project-title")
                .classList.add("not-long-enough-error");
            return;
        }
        const newProjectId = getAllProjects.addProject(proposedNewTitle);
        Sidebar.addAProject(getAllProjects[newProjectId]);
        localStorageHandler.saveProjectsToLocalStorage();
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
            Modal.closeTaskModal();
        };
        taskModal
            .querySelector(".accept-add-task")
            .addEventListener("click", Modal.addATaskBtnClick);
        taskModal.querySelector(".accept-add-task").textContent = "Add Task";
        taskModal.querySelector(
            "h3"
        ).textContent = `Add a New Task to ${getAllProjects[projectId].title}`;
        Modal.highlightFirstInputOnModalOpen(taskModal);
        taskModal.showModal();
    }

    static editTask(event) {
        event.stopPropagation();
        const taskId = event.target.closest(".task").dataset.id;
        const task = getAllProjects.getTask(taskId);
        const projectId = getAllProjects.selectedProject();
        Modal.editATaskBtnClick = () => {
            event.preventDefault();
            if (!taskForm.checkValidity()) {
                taskForm.reportValidity();
                return;
            }
            Tasks.editATask(projectId, taskId);
            Modal.closeTaskModal();
        };
        taskModal
            .querySelector(".accept-add-task")
            .addEventListener("click", Modal.editATaskBtnClick);
        taskModal.querySelector(".accept-add-task").textContent = "Save Task";
        taskModal.querySelector("h3").textContent = `Edit ${task.title}`;
        taskModal.querySelector("#task-title").value = task.title;
        taskModal.querySelector("#task-due-date").value = task.dueDate;
        taskModal.querySelector("#task-description").value = task.description;
        taskModal.querySelector("#task-priority").value = task.priority;
        taskModal.querySelector("#task-notes").value = task.notes;
        taskModal.querySelector(
            `#task-status input[name="status"][value="${task.status}"]`
        ).checked = true;
        Modal.highlightFirstInputOnModalOpen(taskModal);
        taskModal.showModal();
    }

    static moveTask(event) {
        event.stopPropagation();
        const taskId = event.target.closest(".task").dataset.id;
        const task = getAllProjects.getTask(taskId);
        const currentProjectId = getAllProjects.selectedProject();
        const selector = moveTaskModal.querySelector("#a-new-project");
        getAllProjects.list().forEach((projectId) => {
            const option = document.createElement("option");
            option.value = projectId;
            option.textContent = getAllProjects[projectId].title;
            selector.appendChild(option);
        });
        moveTaskModal.querySelector("h3").textContent = `Move ${task.title}?`;
        Modal.moveATaskBtnClick = () => {
            const newProjectId = selector.value;
            Tasks.moveATask(currentProjectId, newProjectId, task);
            Modal.closeMoveTaskModal();
        };
        moveTaskModal
            .querySelector(".accept-move-task")
            .addEventListener("click", Modal.moveATaskBtnClick);
        moveTaskModal.showModal();
    }
}

function initializePage() {
    Sidebar.initializeSidebar();
    Modal.initializeModals();
}

export { initializePage };
