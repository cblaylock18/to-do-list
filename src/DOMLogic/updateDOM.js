import { getAllProjects } from "../aggregator";

const projectList = document.querySelector(".project-list");
const editProjectModal = document.querySelector("#edit-project-title");

class DOM {
    static initializeDOM(unassignedTasks) {
        // initialize the unassigned tasks project which will always be there
        DOM.addAProject(unassignedTasks);
        // initialize button logic for things like modals, filters, adding tasks, etc.
        editProjectModal
            .querySelector(".cancel-edit-project-title")
            .addEventListener("click", () => {
                editProjectModal
                    .querySelector(".update-edit-project-title")
                    .removeEventListener("click", handleUpdateClick);
                editProjectModal.close();
            });
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
        titleDiv.textContent = newProject.title;
        titleCount.textContent = 0;
        // Creating an "add task" button
        const updateProjectBtn = document.createElement("button");
        updateProjectBtn.classList.add("update-project");
        updateProjectBtn.textContent = "Update Project Title";
        updateProjectBtn.addEventListener("click", openModal.updateProject);
        // Creating a "delete project" button
        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.classList.add("delete-project");
        deleteProjectBtn.textContent = "Delete Project";
        deleteProjectBtn.addEventListener("click", deleteProject.deleteProject);
        // Appending children
        projectDiv.appendChild(titleDiv);
        projectDiv.appendChild(titleCount);
        projectDiv.appendChild(updateProjectBtn);
        projectDiv.appendChild(deleteProjectBtn);
        projectList.appendChild(projectDiv);
    }

    static expandTasks() {}

    static deleteProject() {}

    static updateProject(id) {
        const newTitle = editProjectModal.querySelector("input").value;
        document
            .querySelector('[data-id="' + id + '"]')
            .querySelector("div").textContent = newTitle;
        getAllProjects()[id].edit(newTitle);
        editProjectModal.close();
    }

    static addTask() {}

    static updateTask() {}

    static deleteTask() {}
}

class openModal {
    static updateProject(event) {
        event.stopPropagation();
        editProjectModal.querySelector("h3").textContent =
            event.target.parentNode.querySelector("div").textContent;
        editProjectModal.showModal();
        const handleUpdateClick = () => {
            DOM.updateProject(event.target.parentNode.dataset.id);
        };
        editProjectModal
            .querySelector(".update-edit-project-title")
            .addEventListener("click", handleUpdateClick);
    }
}

class expandProject {
    static expandTasks() {
        console.log("I expanded the tasks!");
    }
}

class deleteProject {
    static deleteProject(event) {
        event.stopPropagation();
        console.log("I deleted a project!");
    }
}

export { DOM };
