import { Journal } from "./journal/journal";

export function createWeeklyJournal(): void {
  Journal.createWeeklyJournal();
}

export function appendTodayDate(): void {
  Journal.appendTodayDate();
}
