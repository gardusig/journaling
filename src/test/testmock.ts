export namespace TestMock {
  export interface Settings {
    todayDate: string;
  }

  export function setupMocks(settings: Settings): void {
    setupDateMock(settings.todayDate);
    setupSessionMock();
    setupUtilitiesMock();
  }

  export function cleanupMocks(): void {
    global.Date = OriginalDate;
    global.Utilities = OriginalUtilities;
    global.Session = OriginalSession;
  }

  function setupDateMock(todayDateMock: string): void {
    global.Date = class extends Date {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super(todayDateMock);
        } else {
          super(...(args as ConstructorParameters<typeof Date>));
        }
      }
    } as typeof Date;
  }

  function setupUtilitiesMock(): void {
    global.Utilities = {
      ...OriginalUtilities,
      formatDate: formatDateMock,
    } as GoogleAppsScript.Utilities.Utilities;
  }

  function setupSessionMock(): void {
    global.Session = {
      ...OriginalSession,
      getScriptTimeZone: getScriptTimeZoneMock,
    } as GoogleAppsScript.Base.Session;
  }

  const formatDateMock = jest.fn((date, _timeZone, _format) => {
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    return `${yyyy}-${mm}-${dd}`;
  });

  const getScriptTimeZoneMock = jest.fn(() => "GMT-3");

  const OriginalDate = global.Date;
  const OriginalUtilities = global.Utilities;
  const OriginalSession = global.Session;
}
