const utils = require("../src/utils");

describe("Utilities", () => {
  it("asdf", () => {
    expect(utils.getPackageInfo("asdf")).toEqual({ name: "asdf" });
  });
});
