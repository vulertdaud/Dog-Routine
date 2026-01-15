import { format, isToday, parseISO } from "date-fns";

export const timeOfDayOrder = ["Morning", "Afternoon", "Evening", "Any"] as const;

export const formatDate = (date: Date, pattern = "PPP") => format(date, pattern);

export const formatISODate = (date: Date) => format(date, "yyyy-MM-dd");

export const isTodayISO = (dateISO: string) => isToday(parseISO(dateISO));

export const formatTime = (dateISO: string) => format(parseISO(dateISO), "p");
