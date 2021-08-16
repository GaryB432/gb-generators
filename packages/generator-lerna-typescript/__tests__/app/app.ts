import path = require("path");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:app", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../../generators/app"))
        .withPrompts({ independent: false })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertJsonFileContent("lerna.json", { version: "0.0.0" });
      runResult.assertFile([
        ".github/workflows/lerna.yml",
        ".gitignore",
        "azure-pipelines.yml",
        "jest.config.js",
        "package.json",
        "README.md",
        "tsconfig.json",
      ]);
      runResult.assertFile([
        "packages/greeter/__tests__/index.spec.ts",
        "packages/greeter/src/index.ts",
        "packages/greeter/package.json",
        "packages/greeter/tsconfig.json",
      ]);
      ["packages/**/lib", "package*.json", "!packages/**/package.json"].forEach(
        (noFormatting) =>
          runResult.assertFileContent(".prettierignore", noFormatting)
      );
    });
  });
});
