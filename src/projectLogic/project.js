import { Task } from "../aggregator.js";
import ShortUniqueId from "short-unique-id";
const { randomUUID } = new ShortUniqueId({ length: 10 });

class AllProjects {
    initializeUnassignedTasks() {
        this.unassignedTasks = new UnassignedTasksProject();
    }

    addProject(title) {
        const newProject = new Project(title);
        this[newProject.id] = newProject;
        return newProject.id;
    }

    deleteProject(id) {
        delete this[id];
    }

    moveATask(Project1, Project2, task) {
        this[Project2].tasks.push(task);
        this[Project1].deleteTask(task.id);
    }

    list() {
        return Object.getOwnPropertyNames(this);
    }

    selectAProject(id) {
        for (const project in this) {
            if (this[project].id === id) {
                this[project].selected = true;
            } else {
                this[project].selected = false;
            }
        }
    }

    selectedProject() {
        let selectedId = "";
        for (const project in this) {
            if (this[project].selected === true) {
                selectedId = this[project].id;
            }
        }
        return selectedId;
    }

    getTask(taskId) {
        for (const project in this) {
            for (const task of this[project].tasks) {
                if (task.id === taskId) {
                    return task;
                }
            }
        }
    }

    loadData(allProjectsData) {
        for (const projectId in allProjectsData) {
            if (projectId === "unassignedTasks") {
                this.initializeUnassignedTasks();
                this.unassignedTasks.selected =
                    allProjectsData[projectId].selected;

                this._loadProjectTasks(
                    this.unassignedTasks,
                    allProjectsData[projectId]
                );
            } else {
                const projectData = allProjectsData[projectId];
                const project = new Project(projectData.title);
                project.id = projectData.id;
                project.selected = projectData.selected;
                this[project.id] = project;

                this._loadProjectTasks(project, projectData);
            }
        }
    }

    _loadProjectTasks(project, projectData) {
        projectData.tasks.forEach((taskData) => {
            const newTask = new Task(
                taskData.title,
                taskData.dueDate,
                taskData.description,
                taskData._priority,
                taskData.notes,
                taskData._status
            );
            newTask.id = taskData.id; // Assign the original ID
            project.tasks.push(newTask);
        });
    }
}

class Project {
    constructor(title) {
        this.id = randomUUID();
        this.title = title;
        this.tasks = [];
        this.selected = false;
    }

    edit(title) {
        this.title = title;
    }

    addTask(title, dueDate, description, priority, notes, status) {
        const newTask = new Task(
            title,
            dueDate,
            description,
            priority,
            notes,
            status
        );
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(id) {
        let i = 0;
        this.tasks.forEach((task) => {
            if (task.id === id) {
                this.tasks.splice(i, 1);
                return;
            }
            i++;
        });
    }

    list() {
        return this.tasks;
    }

    numberOfTasks() {
        return this.tasks.length;
    }

    numberOfIncompleteTasks() {
        let incompleteTasks = 0;
        this.list().forEach((task) => {
            if (task.status === "Incomplete") {
                incompleteTasks++;
            }
        });
        return incompleteTasks;
    }

    numberOfCompleteTasks() {
        let completeTasks = 0;
        this.list().forEach((task) => {
            if (task.status === "Complete") {
                completeTasks++;
            }
        });
        return completeTasks;
    }

    editTask(id, title, dueDate, description, priority, notes, status) {
        this.tasks.forEach((task) => {
            if (task.id === id) {
                task.edit(title, dueDate, description, priority, notes, status);
            }
        });
    }

    toggleTaskStatus(id) {
        this.tasks.forEach((task) => {
            if (task.id === id) {
                task.toggleStatus();
            }
        });
    }
}

class UnassignedTasksProject extends Project {
    constructor() {
        super("Unassigned Tasks");
        this.id = "unassignedTasks";
        this.selected = true;
    }
}

// initialize allProjects object
const allProjects = new AllProjects();

// parse local storage for data
const allProjectsData = JSON.parse(localStorage.getItem("allProjects"));

// if local storage has data, load it into all projects,
// otherwise, create blank all projects and add unassigned tasks (default project)
if (allProjectsData) {
    allProjects.loadData(allProjectsData);
} else {
    allProjects.initializeUnassignedTasks();
}

function accessProjects() {
    return allProjects;
}

const getAllProjects = accessProjects();

export { getAllProjects };
