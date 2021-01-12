import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-gb-utility:eslint", () => {
  it("creates files", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/eslint"))
      .withPrompts({ someAnswer: true })
      .then(() => {
        assert.file([".eslintrc.json", ".eslintignore"]);
        assert.jsonFileContent("package.json", {
          scripts: {
            lint: 'eslint "**/*.ts"',
          },
        });
        done();
      });
  });
});
