import { Cupid } from "./cupid/dateservice";
import { Journal } from "./journal/journal";

export function createWeeklyJournal(): void {
  const folder = Journal.getCurrentFolder();
  const fileName = Journal.getCurrentFileName();
  ToiletPaper.Tissuer.createDocument(folder, fileName);
}

export function appendCurrentDateToFile(): void {
  const folder = Journal.getCurrentFolder();
  const fileName = Journal.getCurrentFileName();
  const currentDate = Cupid.DateService.getCurrentDateFormatted();
  ToiletPaper.Tissuer.appendParagraphToFile(
    folder,
    fileName,
    currentDate,
    DocumentApp.ParagraphHeading.HEADING3,
  );
}
