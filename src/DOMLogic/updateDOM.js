import { getAllProjects } from "../aggregator";

const projectList = document.querySelector(".project-list");
const editProjectModal = document.querySelector("#edit-project-title");
const areYouSureModal = document.querySelector("#are-you-sure");

class Sidebar {
    static initializeSidebar(allProjects) {
        // initialize the projects
        for (const project in allProjects) {
            Sidebar.addAProject(allProjects[project]);
        } // initialize button logic for things like modals, filters, adding tasks, etc.
    }

    static addAProject(newProject) {
        // Creating and updating each project's div and classes
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.dataset.id = newProject.id;
        projectDiv.addEventListener("click", expandProject.expandTasks);
        // Creating and updating each projects title and task #
        const titleDiv = document.createElement("div");
        const titleCount = document.createElement("p");
        projectDiv.classList.add("project");
        projectDiv.dataset.id = newProject.id;
        titleDiv.textContent = newProject.title;
        titleCount.textContent = 0;
        // Appending children

        // Creating edit and delete buttons for all except unassigned tasks catch all
        projectDiv.appendChild(titleDiv);
        projectDiv.appendChild(titleCount);
        if (newProject.id !== "unassigned-tasks") {
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
        projectList.appendChild(projectDiv);
    }

    static expandTasks() {}

    static deleteProject(id) {
        projectList.removeChild(
            document.querySelector('[data-id="' + id + '"]')
        );
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

    static addTask() {}

    static updateTask() {}

    static deleteTask() {}
}

class Modal {
    static initializeModals() {
        editProjectModal
            .querySelector(".cancel-edit-project-title")
            .addEventListener("click", Modal.closeEditProjectModal);
        areYouSureModal
            .querySelector(".decline-are-you-sure")
            .addEventListener("click", Modal.closeAreYouSureModal);
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
}

class expandProject {
    static expandTasks() {
        console.log("I expanded the tasks!");
    }
}

function initializeDOM() {
    Sidebar.initializeSidebar(getAllProjects);
    Modal.initializeModals();
}

export { initializeDOM };
