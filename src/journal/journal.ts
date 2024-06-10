namespace Journal {
  export function createJournalDoc(): void {
    const docName = DateUtil.getFormattedDate();
    const folderPath = getFolderPath();
    Util.Doc.createDoc(docName, folderPath);
  }

  export function getFolderPath(): string {
    const weekNumber = DateUtil.getWeekNumber();
    return `${Constants.folderPrefix}/week-${weekNumber}`;
  }
}