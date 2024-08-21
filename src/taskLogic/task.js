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
        } else {
            this._priority = "Low";
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

    toggleStatus() {
        this.status = this.status === "Incomplete" ? "Complete" : "Incomplete";
    }
}

export { Task };
