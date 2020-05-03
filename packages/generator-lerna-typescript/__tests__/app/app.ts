import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../../generators/app"))
      .withPrompts({ independent: false });
  });

  it("creates files", () => {
    assert.file([
      ".eslintrc.js",
      ".gitignore",
      "jest.config.js",
      "package.json",
      "README.md",
      "tsconfig.json",
    ]);
  });

  it("has dependent version", () => {
    assert.jsonFileContent("lerna.json", { version: "0.0.0" });
  });
});
