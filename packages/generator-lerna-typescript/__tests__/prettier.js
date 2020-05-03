"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

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
