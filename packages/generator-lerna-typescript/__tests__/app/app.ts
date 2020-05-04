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
          ".eslintrc.js",
          ".gitignore",
          "jest.config.js",
          "package.json",
          "README.md",
          "tsconfig.json",
        ]);
        assert.jsonFileContent("lerna.json", { version: "0.0.0" });
        done();
      });
  });
});
