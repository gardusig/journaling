export function createDailyJournalDoc(): void {
  const docName = DateUtil.getFormattedDate();
  const folderPath = Journal.getFolderPath();
  ToiletPaper.Tissuer.createRoll(docName, folderPath);
}
