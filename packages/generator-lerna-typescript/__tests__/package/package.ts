import path = require("path");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:package no scope", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../../generators/package"))
        .withArguments("my-tester")
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile([
        "packages/my-tester/__tests__/index.spec.ts",
        "packages/my-tester/src/index.ts",
        "packages/my-tester/package.json",
        "packages/my-tester/tsconfig.json",
      ]);
      runResult.assertJsonFileContent("packages/my-tester/package.json", {
        scripts: { prepare: "npm run build" },
      });
      runResult.assertJsonFileContent("packages/my-tester/package.json", {
        name: "my-tester",
      });
    });
  });
});
