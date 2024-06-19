import { TestMock } from "./testmock";

export namespace TestRunner {
  export function runTestSuiteWithMock(
    testSuiteName: string,
    ...testSuiteGenerators: TestSuiteGenerator[]
  ): void {
    describe(testSuiteName, () => {
      for (const testSuiteGenerator of testSuiteGenerators) {
        const testSuite = testSuiteGenerator();
        describe(testSuite.testName, () => {
          runTestCaseWithMock(...shuffleArray(testSuite.testCases));
        });
      }
    });
  }

  export function runTestCaseWithMock(...testCases: TestCase[]): void {
    testCases.forEach((testCase) => {
      it(testCase.testCaseName, () => {
        TestMock.setupMocks(testCase.mockSettings);
        try {
          testCase.testFunction();
        } finally {
          TestMock.cleanupMocks();
        }
      });
    });
  }

  export interface TestSuite {
    testName: string;
    testCases: TestCase[];
  }

  export interface TestCase {
    mockSettings: TestMock.Settings;
    testFunction: () => void;
    testCaseName: string;
  }

  type TestSuiteGenerator = () => TestSuite;

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
