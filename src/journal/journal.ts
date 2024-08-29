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
    const currentFolder = getCurrentFolder();
    const currentFileName = getCurrentFileName();
    Logger.log(
      `Trying to get current file at: ${currentFolder}/${currentFileName}`
    );
    const folder = DriveApp.getFoldersByName(currentFolder).next();
    const files = folder.getFilesByName(currentFileName);
    if (!files.hasNext()) {
      throw new Error(
        `Document ${currentFileName} not found at folder: ${currentFolder}`
      );
    }
    return files.next();
  }
}
