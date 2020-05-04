import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:app", () => {
  it("has dependent version", (done) => {
    helpers
      .run(path.join(__dirname, "../../generators/app"))
      .withPrompts({ independent: true })
      .then(() => {
        assert.jsonFileContent("lerna.json", { version: "independent" });
        done();
      });
  });
});
