import { Task } from "../aggregator.js";
import ShortUniqueId from "short-unique-id";
const { randomUUID } = new ShortUniqueId({ length: 10 });

class AllProjects {
    constructor() {
        this.unassignedTasks = new UnassignedTasksProject("Unassigned Tasks");
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
}

class UnassignedTasksProject extends Project {
    constructor() {
        super("Unassigned Tasks");
        this.id = "unassignedTasks";
        this.selected = true;
    }
}

const allProjects = new AllProjects();
function accessProjects() {
    return allProjects;
}

const getAllProjects = accessProjects();

export { getAllProjects };
