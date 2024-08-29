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
    let currentFolder = DriveApp.getRootFolder();
    const folders = getCurrentFolder().split("/");
    for (const nextFolder of folders) {
      const subFoldersWithName = currentFolder.getFoldersByName(nextFolder);
      if (!subFoldersWithName.hasNext()) {
        throw new Error(
          `Failed to find the next folder: ${nextFolder} within ${currentFolder.getName()}`,
        );
      }
      Logger.log(`Moving from ${currentFolder} to ${nextFolder}`);
      currentFolder = subFoldersWithName.next();
    }
    const fileName = getCurrentFileName();
    const filesWithName = currentFolder.getFilesByName(fileName);
    if (!filesWithName.hasNext()) {
      throw new Error(
        `Document ${fileName} not found at folder: ${currentFolder.getName()}`,
      );
    }
    return filesWithName.next();
  }
}
