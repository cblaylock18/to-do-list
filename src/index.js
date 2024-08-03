import { imageSourcer, getAllProjects, DOM } from "./aggregator.js"; //going to need to figure out how tasks are actually created, prolly with project unique ids and project methods
import "./style.css";

imageSourcer(); //provide sources for images

getAllProjects().addProject("Project 1");
getAllProjects()[getAllProjects().list()[0]].addTask(
    "Tell Sidney Hi",
    "7-27-24",
    "Say hi",
    "High",
    "None",
    "Incomplete"
);
getAllProjects()[getAllProjects().list()[1]].addTask(
    "Tell Sidney Hi",
    "7-29-24",
    "Say hi",
    "High",
    "None",
    "Incomplete"
);

console.table(getAllProjects()[getAllProjects().list()[0]].edit("hi"))
DOM.initializeDOM(getAllProjects()[getAllProjects().list()[1]]);
