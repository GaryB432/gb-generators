"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-lerna-typescript:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../../generators/app"))
      .withPrompts({ independent: true });
  });

  it("has dependent version", () => {
    assert.jsonFileContent("lerna.json", { version: "independent" });
  });
});
