import { TestMock } from "./testmock";

export namespace TestRunner {
  /**
   * Runs multiple tests with mocks for Date, Utilities, and Session.
   * @param todayDateMock - The date to mock.
   * @param testFunction - The test function to run for each test case.
   * @param testCases - Array of test cases containing input and expected output.
   */
  export function runTestWithMock(...testCases: TestCase[]): void {
    testCases.forEach((testCase) => {
      it(testCase.testName, () => {
        TestMock.setupMocks(testCase.mockSettings);
        try {
          testCase.testFunction();
        } finally {
          TestMock.cleanupMocks();
        }
      });
    });
  }

  export interface TestCase {
    mockSettings: TestMock.Settings;
    testFunction: () => void;
    testName: string;
  }
}
