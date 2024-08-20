import { getAllProjects } from "../aggregator";

class localStorageHandler {
    static saveProjectsToLocalStorage() {
        localStorage.setItem("allProjects", JSON.stringify(getAllProjects));
    }
}

export { localStorageHandler };
