import { DateHandler } from "../aggregator.js";
import ShortUniqueId from "short-unique-id";
const { randomUUID } = new ShortUniqueId({ length: 10 });

class Task {
    constructor(title, dueDate, description, priority, notes) {
        this.id = randomUUID();
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
