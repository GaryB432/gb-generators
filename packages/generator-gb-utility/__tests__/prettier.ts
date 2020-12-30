import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-gb-utility:prettier", () => {
  it("creates files", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/prettier"))
      .withPrompts({ someAnswer: true })
      .then(() => {
        assert.file(["package.json", ".prettierrc", ".prettierignore"]);
        done();
      });
  });
});
