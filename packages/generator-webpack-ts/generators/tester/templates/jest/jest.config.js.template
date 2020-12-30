module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  coverageReporters: ['cobertura', 'text'],
  collectCoverageFrom: ['src/scripts/**/*.ts', '!**/app.ts'],
  reporters: [
    'default',
    [
      'jest-junit',
      { suiteName: 'jest tests', suiteNameTemplate: '{filepath}' },
    ],
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/test/**/*.ts'],
  globals: {
    skipBabel: true,
  },
};
