import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:app", () => {
  it("creates files", (done) => {
    helpers
      .run(path.join(__dirname, "../../generators/app"))
      .withPrompts({ independent: false })
      .then(() => {
        assert.file([
          // ".eslintrc.js",
          ".github/workflows/lerna.yml",
          ".gitignore",
          "azure-pipelines.yml",
          "jest.config.js",
          "package.json",
          "README.md",
          "tsconfig.json",
        ]);
        assert.file([
          "packages/greeter/__tests__/index.spec.ts",
          "packages/greeter/src/index.ts",
          "packages/greeter/package.json",
          "packages/greeter/tsconfig.json",
        ]);
        assert.jsonFileContent("lerna.json", { version: "0.0.0" });
        [
          "packages/**/lib",
          "package*.json",
          "!packages/**/package.json",
        ].forEach((noFormatting) =>
          assert.fileContent(".prettierignore", noFormatting)
        );
        done();
      });
  }, 10000);
});
