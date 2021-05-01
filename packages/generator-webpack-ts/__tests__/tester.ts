import path = require("path");
import helpers = require("yeoman-test");

describe("generator-webpack-ts:tester", () => {
  let runResult: helpers.RunResult;
  beforeEach(async () => {
    runResult = await helpers
      .create(path.join(__dirname, "../generators/tester"))
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
  });
});
