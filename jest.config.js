const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ['**/test/**/*.test.ts'],
  collectCoverage: true,
  coverageReporters: ['text'],
  verbose: true,
  transform: {
    ...tsJestTransformCfg,
  },
};