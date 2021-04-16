import path = require("path");
import helpers = require("yeoman-test");

const sut = path.join(__dirname, "../generators/app");

describe("generator-web-modules", () => {
  let runResult: helpers.RunResult;
  beforeEach(async () => {
    runResult = await helpers.create(sut).run();
  });
  afterEach(() => {
    if (runResult) {
      runResult.restore();
    }
  });
  it("runs correctly", () => {
    runResult.assertFile(["README.md"]);
  });
});
