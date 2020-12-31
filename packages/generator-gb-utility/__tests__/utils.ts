import assert = require("assert");
import { lintGlob, mergeDependencies } from "../generators/utils";

describe("generator-gb-utility:prettier", () => {
  it("lintGlobs", () => {
    assert.strictEqual(lintGlob({}), "{src/scripts,test}/**/*.ts");
    assert.strictEqual(
      lintGlob({ lerna: "OK" }),
      "packages/**/{src,__tests__}/**/*.ts"
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
