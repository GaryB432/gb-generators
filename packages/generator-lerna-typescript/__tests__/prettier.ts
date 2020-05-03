import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:prettier", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/prettier"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file(["package.json", ".prettierrc"]);
  });
});
