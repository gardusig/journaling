import { Cupid } from "../cupid/dateservice";

const folderPrefix = "documents/death-note";

export namespace Journal {
  export function createWeeklyJournal() {
    const weekNumber = Cupid.DateService.getWeekNumber();
    ToiletPaper.Tissuer.createRoll(`week-${weekNumber}`, folderPrefix);
  }

  export function appendTodayDate() {
    const files = getTodayJournalFiles();
    if (files == null) {
      return;
    }
    const fileId = files.next().getId();
    const date = Cupid.DateService.getFormattedDate();
    appendToFile(fileId, date);
  }

  function getTodayJournalFiles(): GoogleAppsScript.Drive.FileIterator | null {
    const weekNumber = Cupid.DateService.getWeekNumber();
    const docName = `week-${weekNumber}`;
    const folder = DriveApp.getFoldersByName(folderPrefix).next();
    const files = folder.getFilesByName(docName);
    if (!files.hasNext()) {
      Logger.log(`Document ${docName} not found.`);
      return null;
    }
    return files;
  }

  function appendToFile(
    fileId: string,
    content: string,
    heading: GoogleAppsScript.Document.ParagraphHeading = DocumentApp
      .ParagraphHeading.HEADING3
  ) {
    const doc = DocumentApp.openById(fileId);
    const body = doc.getBody();
    body.appendParagraph(content).setHeading(heading);
    doc.saveAndClose();
  }
}
