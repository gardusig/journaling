export namespace Cupid.DateService {
  /**
   * Enum representing days of the week.
   */
  export enum DayOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
  }

  /**
   * Calculates the week number of the current date based on the given base day. If the year starts after the base year, that is week 0. Week 1 starts after the first baseDay of the year.
   * @param baseDay - The base day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
   * @returns {number} - The week number.
   */
  export function getWeekNumber(baseDay: DayOfWeek = DayOfWeek.MONDAY): number {
    const daysSinceFirstBaseDay: number = getDaysSinceFirstBaseDay(baseDay);
    return Math.floor(daysSinceFirstBaseDay / 7) + 1;
  }

  /**
   * Retrieves the current date formatted as a string in "yyyy-MM-dd" format,
   * adjusted to the script's time zone.
   * @returns {string} The formatted date string.
   */
  export function getFormattedDate(): string {
    return Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd",
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
