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
      ".eslintignore",
      ".eslintrc.js",
      ".prettierignore",
      ".prettierrc",
      ".gitattributes",
      ".gitignore",
      "gulpfile.js",
      "jest.config.js",
      "package.json",
      "README.md",
      "tsconfig.json",
      ".vscode/settings.json",
      ".vscode/tasks.json",
      "assets/index.html",
      "assets/manifest.webmanifest",
      "assets/web.config",
      "assets/img/yeoman-003.png",
      "src/app.ts",
      "src/modules/math.spec.ts",
      "src/modules/math.ts",
      "src/sass/_star.scss",
      "src/sass/styles.scss",
    ]);
  });
});
