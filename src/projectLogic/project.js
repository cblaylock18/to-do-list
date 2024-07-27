import { Task } from "../aggregator.js";
import ShortUniqueId from "short-unique-id";
const { randomUUID } = new ShortUniqueId({ length: 10 });

class AllProjects {
    constructor() {
        this.unassignedTasks = new Project("Unassigned Tasks");
    }

    addProject(title) {
        const newProject = new Project(title);
        this[newProject.id] = newProject;
    }

    deleteProject(id) {
        delete this[id];
    }

    list() {
        return Object.getOwnPropertyNames(this);
    }
}

class Project {
    constructor(title) {
        this.id = randomUUID();
        this.title = title;
        this.tasks = [];
    }

    addTask(title, dueDate, description, priority, notes) {
        this.tasks.push(new Task(title, dueDate, description, priority, notes));
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
}

const allProjects = new AllProjects();
export { allProjects };
