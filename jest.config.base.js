module.exports = {
  rootsx: [
      "<rootDir>/src",
      "<rootDir>/tests"
  ],
  transformx: {
      "^.+\\.ts$": "ts-jest"
  },
  transform: {},
  testRegexxxx: "(/__tests__/.*.(test|spec)).(jsx?|tsx?)$",
  moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
      "(tests/.*.mock).(jsx?|tsx?)$",
      "templates"
  ],
  verbose: true
};