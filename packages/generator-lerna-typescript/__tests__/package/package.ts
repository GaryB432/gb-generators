import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:package no scope", () => {
  it("creates files", (done) => {
    helpers
      .run(path.join(__dirname, "../../generators/package"))
      .withArguments("my-tester")
      .withPrompts({ someAnswer: true })
      .then(() => {
        assert.file([
          "packages/my-tester/__tests__/index.spec.ts",
          "packages/my-tester/src/index.ts",
          "packages/my-tester/package.json",
          "packages/my-tester/tsconfig.json",
        ]);
        assert.jsonFileContent("packages/my-tester/package.json", {
          scripts: { prepare: "npm run build" },
        });
        assert.jsonFileContent("packages/my-tester/package.json", {
          name: "my-tester",
        });
        done();
      });
  });
});
