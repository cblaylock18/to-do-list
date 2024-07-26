import { DateHandler } from "../aggregator.js";

class Task {
    constructor(title, dueDate, description, priority, notes) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
    }

    daysUntilDue() {
        return DateHandler.daysUntil(this.dueDate);
    }
}

export { Task };
