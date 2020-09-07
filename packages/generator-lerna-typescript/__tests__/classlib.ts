import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:classlib", () => {
  it("creates files", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/classlib"))
      .withArguments(["asdf", "someClass"])
      .then(() => {
        assert.file([
          "packages/asdf/src/some-class.ts",
          "packages/asdf/__tests__/some-class.spec.ts",
        ]);
        done();
      });
  });
});
