import { Cupid } from "./cupid/dateservice";
import { Journal } from "./journal/journal";

export function createDailyJournalDoc(): void {
  const docName = Cupid.DateService.getFormattedDate();
  const folderPath = Journal.getFolderPath();
  ToiletPaper.Tissuer.createRoll(docName, folderPath);
}
