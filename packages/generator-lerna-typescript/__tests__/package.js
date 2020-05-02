"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-lerna-typescript:package", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/package"))
      .withArguments("@MyScope/MyTester")
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file([
      "packages/my-tester/__tests__/index.spec.ts",
      "packages/my-tester/src/index.ts",
      "packages/my-tester/package.json",
      "packages/my-tester/tsconfig.json"
    ]);
  });

  it("contains prepare script", () => {
    assert.jsonFileContent("packages/my-tester/package.json", {
      scripts: { prepare: "npm run build" }
    });
  });

  it("is named properly", () => {
    assert.jsonFileContent("packages/my-tester/package.json", {
      name: "@my-scope/my-tester"
    });
  });
});
