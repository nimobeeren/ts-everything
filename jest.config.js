/* eslint-disable */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.[tj]s?(x)',
    '!client/src/index.tsx',
    '!server/src/index.ts'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/__generated__/'],
  coverageReporters: ['html', 'text-summary'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  preset: 'ts-jest', // enables type checking during tests
  setupFilesAfterEnv: ['<rootDir>client/src/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/src/**/__tests__/**/*.[jt]s?(x)',
    '**/src/**/?(*.)+(spec|test).[jt]s?(x)'
  ]
};
