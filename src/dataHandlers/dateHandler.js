import { differenceInCalendarDays } from "date-fns";

class DateHandler {
    static daysUntil(dueDate) {
        return differenceInCalendarDays(dueDate, new Date());
    }
}

export { DateHandler };
