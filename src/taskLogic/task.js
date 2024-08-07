import { DateHandler } from "../aggregator.js";
import ShortUniqueId from "short-unique-id";
const { randomUUID } = new ShortUniqueId({ length: 10 });

class Task {
    constructor(title, dueDate, description, priority, notes, status) {
        this.id = randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.status = status;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = DateHandler.format(value, "MM-dd-yyyy");
    }

    get status() {
        return this._status;
    }

    set status(value) {
        const validStatuses = ["Complete", "Incomplete"];
        if (validStatuses.includes(value)) {
            this._status = value;
        }
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        const validPriorities = ["Low", "Medium", "High"];
        if (validPriorities.includes(value)) {
            this._priority = value;
        }
    }

    edit(title, dueDate, description, priority, notes, status) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.status = status;
    }

    daysUntilDue() {
        return DateHandler.daysUntil(this.dueDate);
    }
}

export { Task };
