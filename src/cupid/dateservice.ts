export namespace Cupid.DateService {
  export enum DayOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
  }

  export function getCurrentWeekNumber(
    baseDay: DayOfWeek = DayOfWeek.MONDAY,
  ): number {
    const daysSinceFirstBaseDay: number = getDaysSinceFirstBaseDay(baseDay);
    return Math.floor(daysSinceFirstBaseDay / 7) + 1;
  }

  export function getCurrentDateFormatted(): string {
    return Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd",
    );
  }

  export function getCurrentYear(): string {
    return Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy",
    );
  }

  function getFirstBaseDayOfYear(year: number, baseDay: DayOfWeek): Date {
    const date = new Date(year, 0, 1);
    while (date.getDay() !== baseDay) {
      date.setDate(date.getDate() - 1);
    }
    return date;
  }

  function getDaysSinceFirstBaseDay(baseDay: DayOfWeek): number {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const firstBaseDay: Date = getFirstBaseDayOfYear(year, baseDay);
    const dayDuration = 1000 * 3600 * 24;
    return Math.floor((now.getTime() - firstBaseDay.getTime()) / dayDuration);
  }
}
