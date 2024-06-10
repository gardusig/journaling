function createDailyDoc() {
  const date = new Date();
  const year = date.getFullYear();
  const weekNumber = getWeekNumber(date);
  const folderPath = "self-management/DeathNote/" + weekNumber;
  const rootFolder = DriveApp.getRootFolder();
  const targetFolder = getOrCreateFolder(rootFolder, folderPath);
  const docName = Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    "yyyy-MM-dd",
  );
  const doc = DocumentApp.create(docName);
  const file = DriveApp.getFileById(doc.getId());
  targetFolder.addFile(file);
  rootFolder.removeFile(file);
  Logger.log(
    `Document created, url: ${doc.getUrl()}, name: ${doc.getName()}, body: ${doc.getBody()}`,
  );
}

function getWeekNumber(d: Date) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

function getOrCreateFolder(parent, path) {
  const parts = path.split("/");
  const folder = parent;

  for (const i = 0; i < parts.length; i++) {
    const folders = folder.getFoldersByName(parts[i]);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = folder.createFolder(parts[i]);
    }
  }

  return folder;
}
