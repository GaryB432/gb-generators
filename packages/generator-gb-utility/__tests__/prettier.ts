import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");
import { ignorePaths, mergeDependencies } from "../generators/prettier";

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

  it("gets lerna ignores", () => {
    const ignored = ignorePaths({ lerna: "OK" });
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
    const ignored = ignorePaths({ webpack: "OK" });
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
