import { Task, imageSourcer, allProjects } from "./aggregator.js";
import "./style.css";

imageSourcer(); //provide sources for images

const task = new Task(
    "To do",
    "7/23/24",
    "A Task to be done",
    "High",
    "Here are some notes on this task and they're getting longer to see how it impacts the styling and if we need to have some sort of overflow for the task which we probably do."
);

console.log(allProjects.list());
console.log(task);
console.log(task.daysUntilDue());
