import path = require("path");
import helpers = require("yeoman-test");

describe("generator-gb-utility:eslint", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/eslint"))
        .withOptions({ node: true })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile([".eslintrc.js", ".eslintignore"]);
      runResult.assertJsonFileContent("package.json", {
        scripts: {
          lint: 'eslint "**/*.ts"',
        },
      });
      runResult.assertFileContent(".eslintrc.js", /env:.*node: true/s);
      runResult.assertNoFileContent(".eslintrc.js", /env:.*browser/s);
    });
  });
});
