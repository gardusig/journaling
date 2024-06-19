import { Cupid } from "../../src/cupid/dateservice";
import { TestRunner } from "../testrunner";

TestRunner.runTestSuiteWithMock(
  "Cupid.DateService",
  weekNumberTestSuiteGenerator,
  formattedDateTestSuiteGenerator,
);

function weekNumberTestSuiteGenerator(): TestRunner.TestSuite {
  const testCases = [];
  const startDate = new Date("2024-06-03T00:00:00-03:00"); // Monday
  for (let weekCounter = 0; weekCounter < 3; weekCounter++) {
    for (let weekDay = 0; weekDay < 7; weekDay++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + weekCounter * 7 + weekDay);
      const expectedWeekNumber = 23 + weekCounter;
      const todayMockedDate = date.toISOString();
      testCases.push(
        createWeekNumberTestCase(expectedWeekNumber, todayMockedDate),
      );
    }
  }
  return {
    testName: "getWeekNumber",
    testCases: testCases,
  };
}

function formattedDateTestSuiteGenerator(): TestRunner.TestSuite {
  const testCases = [];
  for (let day = 1; day < 31; day += 1) {
    const date = new Date(
      `2024-06-${String(day).padStart(2, "0")}T00:00:00-03:00`,
    );
    const expectedFormattedDate = date.toISOString().split("T")[0];
    testCases.push(
      createFormattedDateTestCase(expectedFormattedDate, date.toISOString()),
    );
  }
  return {
    testName: "getFormattedDate",
    testCases: testCases,
  };
}

function createWeekNumberTestCase(
  expectedWeekNumber: number,
  mockedDate: string,
): TestRunner.TestCase {
  return {
    mockSettings: { todayDate: mockedDate },
    testCaseName: `should produce week number '${expectedWeekNumber}' given date '${mockedDate}'`,
    testFunction: () => {
      const result = Cupid.DateService.getWeekNumber();
      expect(result).toBe(expectedWeekNumber);
    },
  };
}

function createFormattedDateTestCase(
  expectedFormattedDate: string,
  mockedDate: string,
): TestRunner.TestCase {
  return {
    mockSettings: { todayDate: mockedDate },
    testCaseName: `should produce formatted date '${expectedFormattedDate}' given date '${mockedDate}'`,
    testFunction: () => {
      const formattedDate = Cupid.DateService.getFormattedDate();
      expect(formattedDate).toBe(expectedFormattedDate);
    },
  };
}
