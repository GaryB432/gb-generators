import path = require("path");
import helpers = require("yeoman-test");

describe("generator-webpack-ts:tester", () => {
  describe("karma", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/tester"))
        .withOptions({ library: "karma" })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile([
        "azure-pipelines.yml",
        "__tests__/index.ts",
        "karma.conf.js",
      ]);
      runResult.assertJsonFileContent("package.json", {
        devDependencies: { karma: "^5.1.0" },
      });
      runResult.assertNoFile("jest.config.js");
    });
  });
});

describe("generator-webpack-ts:tester", () => {
  describe("jest", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/tester"))
        .withOptions({ library: "jest" })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile(["azure-pipelines.yml", "jest.config.js"]);
      runResult.assertJsonFileContent("package.json", {
        devDependencies: { jest: "^26.6.3" },
      });
      runResult.assertNoFile("karma.conf.js");
    });
  });
});

describe("generator-webpack-ts:tester", () => {
  describe("none", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/tester"))
        .withOptions({ library: "none" })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertNoFile([
        "azure-pipelines.yml",
        "jest.config.js",
        "karma.conf.js",
      ]);
      runResult.assertJsonFileContent("package.json", {
        scripts: { test: "echo no tests", "test-ci": "echo no tests" },
      });
    });
  });
});
