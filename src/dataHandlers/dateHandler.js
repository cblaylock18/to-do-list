import { differenceInCalendarDays, format, parse, isValid } from "date-fns";

class DateHandler {
    static daysUntil(dueDate) {
        return differenceInCalendarDays(dueDate, new Date());
    }

    static format(date, dateFormat) {
        return format(date, dateFormat);
    }

    static parse(dateString, dateFormat) {
        return parse(dateString, dateFormat, new Date());
    }

    static isValid(date) {
        return isValid(date);
    }
}

export { DateHandler };
