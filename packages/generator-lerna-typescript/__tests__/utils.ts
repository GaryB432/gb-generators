import utils = require("../utils");

describe("Utilities", () => {
  test("asdf", () => {
    expect(utils.getPackageInfo("asdf")).toEqual({ name: "asdf" });
  });
  test("with scope", () => {
    expect(utils.getPackageInfo("@scope/asdf")).toEqual({
      name: "asdf",
      scope: "scope",
    });
  });
  test("with camel scope", () => {
    expect(utils.getPackageInfo("@MyScope/asdf")).toEqual({
      name: "asdf",
      scope: "my-scope",
    });
  });
  test("two slashes", () => {
    expect(utils.getPackageInfo("@scope/another/asdf")).toEqual({
      name: "-scope-another-asdf",
    });
  });
});
