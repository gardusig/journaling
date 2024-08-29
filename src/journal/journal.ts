import { Cupid } from "../cupid/dateservice";

const folderPrefix = "documents/death-note";

export namespace Journal {
  export function getCurrentFolder(): string {
    const currentYear = Cupid.DateService.getCurrentYear();
    return `${folderPrefix}/${currentYear}`;
  }

  export function getCurrentFileName(): string {
    const weekNumber = Cupid.DateService.getWeekNumber();
    return `week-${weekNumber}`;
  }

  export function appendToCurrentFile(date: string): void {
    const file = getCurrentFile();
    const doc = DocumentApp.openById(file.getId());
    const body = doc.getBody();
    body
      .appendParagraph(date)
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);
    doc.saveAndClose();
  }

  function getCurrentFile(): GoogleAppsScript.Drive.File {
    const weekNumber = Cupid.DateService.getWeekNumber();
    const docName = `week-${weekNumber}`;
    const folder = DriveApp.getFoldersByName(folderPrefix).next();
    const files = folder.getFilesByName(docName);
    if (!files.hasNext()) {
      throw new Error(
        `Document ${docName} not found at folder: ${folderPrefix}`
      );
    }
    return files.next();
  }
}
