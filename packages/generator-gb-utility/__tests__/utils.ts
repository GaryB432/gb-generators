import assert = require("assert");
import { mergeDependencies } from "../generators/utils";

describe("generator-gb-utility:prettier", () => {
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
