namespace DocUtil {
  export function getOrCreateFolder(
    path: string
  ): GoogleAppsScript.Drive.Folder {
    const parts = path.split("/");
    let folder = DriveApp.getRootFolder();
    for (const part of parts) {
      folder = getNextFolder(folder, part);
    }
    Logger.log(`Folder ${folder.getName()} retrieved or created successfully`);
    return folder;
  }

  export function getNextFolder(
    folder: GoogleAppsScript.Drive.Folder,
    part: string
  ): GoogleAppsScript.Drive.Folder {
    const folderIterator = folder.getFoldersByName(part);
    if (folderIterator.hasNext()) {
      const nextFolder = folderIterator.next();
      Logger.log(`Folder ${nextFolder.getName()} found`);
      return nextFolder;
    }
    const createdFolder = folder.createFolder(part);
    Logger.log(`Folder ${createdFolder.getName()} created`);
    return createdFolder;
  }

  export function fileAlreadyExists(
    docName: string,
    targetFolder: GoogleAppsScript.Drive.Folder
  ): boolean {
    const files = targetFolder.getFilesByName(docName);
    if (!files.hasNext()) {
      return false;
    }
    const existingFile = files.next();
    Logger.log(`Document already exists: ${existingFile.getUrl()}`);
    return true;
  }

  export function createDoc(
    docName: string,
    targetFolder: GoogleAppsScript.Drive.Folder
  ): void {
    const doc = DocumentApp.create(docName);
    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(targetFolder);
    Logger.log(
      `Document created:` +
        `\n\tURL: ${doc.getUrl()}` +
        `\n\tName: ${doc.getName()}` +
        `\n\tLocation: ${targetFolder.getName()}`
    );
  }
}
