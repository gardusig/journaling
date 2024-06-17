import { TestRunner } from "../test/testrunner";
import { Cupid } from "./dateservice";

describe("Cupid.DateService", () => {
  describe("getFormattedDate", () => {
    TestRunner.runTestWithMock(...generateGetFormattedDateTestCases());
  });
  describe("getWeekNumber", () => {
    TestRunner.runTestWithMock(...generateGetWeekNumberTestCases());
  });
});

function generateGetWeekNumberTestCases(): TestRunner.TestCase[] {
  const testCases = [];
  let day = 3; // Monday
  for (let weekCounter = 0; weekCounter < 3; weekCounter += 1) {
    for (let weekDay = 0; weekDay < 7; weekDay += 1, day += 1) {
      const expectedWeekNumber = 23 + weekCounter;
      const mockedDate = `2024-06-${day}T00:00:00-03:00`;
      const testCase = generateGetWeekNumberTestCase(
        expectedWeekNumber,
        mockedDate
      );
      testCases.push(testCase);
    }
  }
  return testCases;
}

function generateGetWeekNumberTestCase(
  expectedWeekNumber: number,
  mockedDate: string
): TestRunner.TestCase {
  return {
    mockSettings: { todayDate: mockedDate },
    testName: `should produce week number '${expectedWeekNumber}' given date '${mockedDate}'`,
    testFunction: () => {
      testShouldCalculateWeekNumberCorrectly(expectedWeekNumber);
    },
  };
}

function testShouldCalculateWeekNumberCorrectly(expectedWeekNumber: number) {
  const result = Cupid.DateService.getWeekNumber();
  expect(result).toBe(expectedWeekNumber);
}

function generateGetFormattedDateTestCases(): TestRunner.TestCase[] {
  const testCases = [];
  for (let day = 1; day <= 31; day += 1) {
    const formattedDay = String(day).padStart(2, "0");
    const expectedFormattedDate = `2024-06-${formattedDay}T00:00:00-03:00`;
    const mockedDate = `2024-06-${formattedDay}T00:00:00-03:00`;
    const testCase = generateGetFormattedDateTestCase(
      expectedFormattedDate,
      mockedDate
    );
    testCases.push(testCase);
  }
  return testCases;
}

function generateGetFormattedDateTestCase(
  expectedFormattedDate: string,
  mockedDate: string
): TestRunner.TestCase {
  return {
    mockSettings: { todayDate: mockedDate },
    testName: `should produce formatted date '${expectedFormattedDate}' given date '${mockedDate}'`,
    testFunction: () => {
      testShouldReturnFormattedDateCorrectly(expectedFormattedDate);
    },
  };
}

function testShouldReturnFormattedDateCorrectly(
  expectedFormattedDate: string
): void {
  const formattedDate = Cupid.DateService.getFormattedDate();
  expect(formattedDate).toBe(expectedFormattedDate);
}
