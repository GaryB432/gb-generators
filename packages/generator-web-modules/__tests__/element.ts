import path = require("path");
import helpers = require("yeoman-test");

describe("generator-web-modules:pipeline", () => {
  describe("karma", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/element"))
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile([
        "src/modules/adder.element.spec.ts",
        "src/modules/adder.element.ts",
      ]);
    });
  });
});
