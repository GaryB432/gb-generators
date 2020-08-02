import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-webpack-ts:tester karma", () => {
  it("creates files", async (done) => {
    await helpers
      .run(path.join(__dirname, "../generators/tester"))
      .withPrompts({ library: "karma" });
    assert.file(["azure-pipelines.yml", "__tests__/index.ts", "karma.conf.js"]);
    assert.jsonFileContent("package.json", {
      devDependencies: { karma: "^5.1.0" },
    });
    assert.noFile("jest.config.js");
    done();
  });
});

describe("generator-webpack-ts:tester jest", () => {
  it("creates files", async (done) => {
    await helpers
      .run(path.join(__dirname, "../generators/tester"))
      .withPrompts({ library: "jest" });
    assert.file(["azure-pipelines.yml", "jest.config.js"]);
    assert.jsonFileContent("package.json", {
      devDependencies: { jest: "^26.1.0" },
    });
    assert.noFile("karma.conf.js");
    done();
  });
});
