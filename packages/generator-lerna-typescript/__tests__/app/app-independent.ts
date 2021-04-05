import path = require("path");
import helpers = require("yeoman-test");

describe("generator-lerna-typescript:app", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../../generators/app"))
        .withPrompts({ independent: true })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertJsonFileContent("lerna.json", { version: "independent" });
    });
  });
});
