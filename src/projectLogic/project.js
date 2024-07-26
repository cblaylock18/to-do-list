import { Task } from "../aggregator.js";

class AllProjects {
    constructor() {
        this.projects = [];
    }

    addProject(title) {
        this.projects.push(new Project(title));
    }

    deleteProject(index) {
        this.projects.splice(index, 1);
    }

    list() {
        return this.projects;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
    //finish updated and decide if this is even how i want the logic to flow...seems bad cuz you'd have to come back and change this if tasks ever changed...
    // addTask() {
    //     this.tasks.push(new Task());
    // }

    // deleteTask(index) {
    //     this.projects.splice(index, 1);
    // }

    // list() {
    //     return this.projects;
    // }
}

const allProjects = new AllProjects();
allProjects.addProject("Unassigned Tasks");
export { allProjects };
