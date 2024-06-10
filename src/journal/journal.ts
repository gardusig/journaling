namespace Journal {
  export function createJournalDoc(): void {
    const docName = DateUtil.getFormattedDate();
    const folderPath = getFolderPath();
    const targetFolder = DocUtil.getOrCreateFolder(folderPath);
    if (DocUtil.fileAlreadyExists(docName, targetFolder)) {
      return;
    }
    DocUtil.createDoc(docName, targetFolder);
  }

  export function getFolderPath(): string {
    const weekNumber = DateUtil.getWeekNumber();
    return `${Constants.folderPrefix}/week-${weekNumber}`;
  }
}
