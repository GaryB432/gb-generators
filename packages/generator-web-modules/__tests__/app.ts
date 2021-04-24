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
    runResult.assertFile([
      "_prettierignore",
      "_prettierrc",
      ".gitattributes",
      "gulpfile.js",
      "package.json",
      "README.md",
      "tsconfig.json",
      "assets/index.html",
      "assets/manifest.webmanifest",
      "assets/web.config",
      "assets/img/yeoman-003.png",
      "src/app.ts",
      "src/modules/adder.element.spec.ts",
      "src/modules/adder.element.ts",
      "src/modules/math.spec.ts",
      "src/modules/math.ts",
      "src/sass/_math.scss",
      "src/sass/_star.scss",
      "src/sass/styles.scss",
      "_vscode/settings.json",
      "_vscode/tasks.json",
    ]);
  });
});