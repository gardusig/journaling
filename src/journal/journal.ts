import { Constants } from "../constants";
import { Cupid } from "../cupid/dateservice";

export namespace Journal {
  export function getFolderPath(): string {
    const weekNumber = Cupid.DateService.getWeekNumber();
    return `${Constants.folderPrefix}/week-${weekNumber}`;
  }
}
