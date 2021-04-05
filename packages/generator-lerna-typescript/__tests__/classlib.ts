import path = require("path");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:classlib", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["asdf", "someClass"])
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile([
        "packages/asdf/src/some-class.ts",
        "packages/asdf/__tests__/some-class.spec.ts",
      ]);
    });
  });
});
