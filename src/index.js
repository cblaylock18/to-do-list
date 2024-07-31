import {
    Task,
    imageSourcer,
    allProjects,
    updateProjectList,
} from "./aggregator.js"; //going to need to figure out how tasks are actually created, prolly with project unique ids and project methods
import "./style.css";
imageSourcer(); //provide sources for images

const task = new Task(
    "To do",
    "7-23-24",
    "A Task to be done",
    "High",
    "Here are some notes on this task and they're getting longer to see how it impacts the styling and if we need to have some sort of overflow for the task which we probably do.",
    "Incomplete"
);

allProjects.addProject("Project 1");
allProjects.unassignedTasks.addTask(
    "Tell Sidney Hi",
    "7-27-24",
    "Say hi",
    "High",
    "None",
    "Incomplete"
);
allProjects[Object.keys(allProjects)[1]].addTask(
    "Tell Sidney Hi",
    "7-29-24",
    "Say hi",
    "High",
    "None",
    "Incomplete"
);
// console.table(allProjects);
// console.log(allProjects.unassignedTasks.numberOfTasks());
// console.log(task);
// console.log(allProjects.unassignedTasks.tasks[0].daysUntilDue());
// console.log(task.daysUntilDue());
updateProjectList(allProjects);
