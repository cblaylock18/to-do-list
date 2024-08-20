import { imageSourcer, getAllProjects, initializePage } from "./aggregator.js"; //going to need to figure out how tasks are actually created, prolly with project unique ids and project methods
import "./style.css";

imageSourcer(); //provide sources for images

getAllProjects.addProject(
    "Project 1 and lots of othqpjyer texts ahahahahahahahahah"
);
getAllProjects.unassignedTasks.addTask(
    "Tell Sidney Hi bupyfjt make the title realllyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy long",
    "7-27-24",
    "Say hi and lots of other things that make this note very very very very long lon glong ogn saoghaosdgh osdaigh osidah gsoiadh gosdih godisah goasdighoidsahgoasdhgoisdahgoisadhgoisadhgoisad goisadhgoisdahg osadigh sadoihgoisadghoisdahgoisd",
    "Low",
    "None",
    "Incomplete"
);
getAllProjects[getAllProjects.list()[0]].addTask(
    "Tell Sidney Hi",
    "7-27-24",
    "Say hi",
    "Medium",
    "None",
    "Complete"
);
getAllProjects[getAllProjects.list()[0]].addTask(
    "Tell Sidney Hi",
    "7-27-24",
    "Say hi",
    "High",
    "None",
    "Incomplete"
);
getAllProjects[getAllProjects.list()[0]].addTask(
    "Tell Sidney Hi",
    "7-27-24",
    "Say hi",
    "High",
    "None",
    "Incomplete"
);
getAllProjects[getAllProjects.list()[1]].addTask(
    "Tell Sidney Hi",
    "7-29-24",
    "Say hi",
    "High",
    "None",
    "Incomplete"
);
getAllProjects[getAllProjects.list()[1]].addTask(
    "Tell Sidney Hi",
    "7-29-24",
    "Say hi",
    "High",
    "None",
    "Complete"
);
getAllProjects[getAllProjects.list()[1]].addTask(
    "Tell Sidney Hi",
    "7-29-24",
    "Say hi and lots of other things that make this note very very very very long lon glong ogn saoghaosdgh osdaigh osidah gsoiadh gosdih godisah goasdighoidsahgoasdhgoisdahgoisadhgoisadhgoisad goisadhgoisdahg osadigh sadoihgoisadghoisdahgoisd",
    "High",
    "None",
    "Complete"
);

initializePage();
