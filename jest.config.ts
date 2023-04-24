/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  collectCoverageFrom: ["src/functions/**"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/"],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  moduleDirectories: ["node_modules"],

  preset: "ts-jest",

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: [".test.ts$"],

  transform: {
    "^.+\\.(t|j|mj)s$": "ts-jest",
  },

  transformIgnorePatterns: ["node_modules/(?!.*.mjs$)"],
};
