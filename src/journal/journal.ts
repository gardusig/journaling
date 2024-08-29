import { Cupid } from "../cupid/dateservice";

const folderPrefix = "documents/death-note";

export namespace Journal {
  export function getCurrentFolder(): string {
    const currentYear = Cupid.DateService.getCurrentYear();
    return `${folderPrefix}/${currentYear}`;
  }

  export function getCurrentFileName(): string {
    const weekNumber = Cupid.DateService.getCurrentWeekNumber();
    return `week-${weekNumber}`;
  }
}
