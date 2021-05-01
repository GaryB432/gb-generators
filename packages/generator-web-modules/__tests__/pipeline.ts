import path = require("path");
import helpers = require("yeoman-test");

describe("generator-web-modules:pipeline", () => {
  let runResult: helpers.RunResult;
  beforeEach(async () => {
    runResult = await helpers
      .create(path.join(__dirname, "../generators/pipeline"))
      .run();
  });
  afterEach(() => {
    if (runResult) {
      runResult.restore();
    }
  });
  it("runs correctly", () => {
    runResult.assertFile([".github/workflows/main.yml", "azure-pipelines.yml"]);
  });
});
