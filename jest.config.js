// const base = require("./jest.config.base.js");

// export default {
//     ...base,
//     projectsx:
//     [
//         "<rootDir>/packages/*/jest.config.js"
//     ],
//     coverageDirectory: "<rootDir>/coverage/"
// };

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

// module.exports = {
//   globals: { skipBabel: true },
//   preset: "ts-jest",
//   testEnvironment: "node",
//   testMatch: ["**/__tests__/**/*.ts"],
//   // testPathIgnorePatterns: ["/node_modules/", "/output/"]
// };

module.exports = {
  // clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "js", "json", "html"],
  // projects: ["<rootDir>/packages/*"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts"],
  transform: { "^.+\\.(ts|js|json|html)$": "ts-jest" },
};
