module.exports = {
  preset: 'ts-jest',
  rootDir: 'packages',
  coverageDirectory: '../coverage',
  coverageReporters: ['cobertura', 'text'],
  collectCoverageFrom: ['**/src/**/*.ts'],
  reporters: [
    'default',
    ['jest-junit', { suiteName: 'jest tests', suiteNameTemplate: '{filepath}' }],
  ],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts'],
  globals: {
    skipBabel: true,
  },
};
