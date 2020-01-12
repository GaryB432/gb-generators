"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

xdescribe("generator-lerna-typescript:classlib", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../../src/generators/classlib"))
      .withArguments(["MyFunProject", "a/B/c/SomeClass"])
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file([
      "packages/my-fun-project/a/B/c/src/some-class.ts",
      "packages/my-fun-project/a/B/c/__tests__/some-class.spec.ts"
    ]);
  });
});
