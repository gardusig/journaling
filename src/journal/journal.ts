namespace Journal {
  export function getFolderPath(): string {
    const weekNumber = DateUtil.getWeekNumber();
    return `${Constants.folderPrefix}/week-${weekNumber}`;
  }
}
