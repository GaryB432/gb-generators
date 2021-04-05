import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");
import { ignorePrettierPaths, mergeDependencies } from "../util";

describe("generator-gb-utility:prettier", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/prettier"), {}, {})
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile(["package.json", ".prettierrc", ".prettierignore"]);
    });
  });
});

describe("other", () => {
  it("gets lerna ignores", () => {
    const ignored = ignorePrettierPaths({ lerna: "OK" });
    const names = [
      "packages/**/lib",
      "package*.json",
      "!packages/**/package.json",
    ];
    names.forEach((name) =>
      assert.ok(ignored.includes(name), `"${name}" not ignored`)
    );
  });

  it("gets webpack ignores", () => {
    const ignored = ignorePrettierPaths({ webpack: "OK" });
    const names = ["dist", "img", "package*.json"];
    names.forEach((name) =>
      assert.ok(ignored.includes(name), `"${name}" not ignored`)
    );
  });

  it("merges dependencies", () => {
    assert.deepStrictEqual(
      mergeDependencies(
        {
          aaaaaaaaaaaaaaaaaa: "0.0.0",
          bbbbbbbbbbbbbbbbbb: "1.0.0",
          cccccccccccccccccc: "1.0.0",
          dddddddddddddddddd: "1.0.0",
          ffffffffffffffffff: "9.0.0",
        },
        {
          aaaaaaaaaaaaaaaaaa: "1.0.0",
          bbbbbbbbbbbbbbbbbb: "1.0.0",
          dddddddddddddddddd: "1.0.0",
          ffffffffffffffffff: "0.0.0",
        },
        {
          eeeeeeeeeeeeeeeeee: "1.0.0",
          ffffffffffffffffff: "1.0.0",
        }
      ),
      {
        aaaaaaaaaaaaaaaaaa: "1.0.0",
        bbbbbbbbbbbbbbbbbb: "1.0.0",
        cccccccccccccccccc: "1.0.0",
        dddddddddddddddddd: "1.0.0",
        eeeeeeeeeeeeeeeeee: "1.0.0",
        ffffffffffffffffff: "1.0.0",
      }
    );
  });
});
