module.exports = {
  coverageDirectory: 'coverage',
  coverageReporters: ['cobertura', 'text'],
  collectCoverageFrom: ['./src/**/*.ts'],
  reporters: [
    'default',
    [
      'jest-junit',
      { suiteName: 'jest tests', suiteNameTemplate: '{filepath}' },
    ],
  ],
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'jsdom',
  transform: { '^.+\\.(ts|js|json|html)$': 'ts-jest' },
};
