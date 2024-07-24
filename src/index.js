import { Project, Task, imageSourcer } from "./aggregator.js";
import "./style.css";

imageSourcer();

const project = new Project("My first project!");

const task = new Task(
    "To do",
    "5/10/2025",
    "A Task to be done",
    "High",
    "Here are some notes on this task and they're getting longer to see how it impacts the styling and if we need to have some sort of overflow for the task which we probably do."
);

console.log(project);
console.log(task);
