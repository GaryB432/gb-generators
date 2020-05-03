import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

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
