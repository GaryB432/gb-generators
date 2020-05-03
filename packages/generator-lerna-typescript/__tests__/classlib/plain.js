"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-lerna-typescript:classlib", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../../generators/classlib"))
      .withArguments(["MyFunProject", "SomeClass"])
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file([
      "packages/my-fun-project/src/some-class.ts",
      "packages/my-fun-project/__tests__/some-class.spec.ts",
    ]);
  });
});
