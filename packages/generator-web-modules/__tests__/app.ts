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
      "tsconfig.eslint.json",
      "tsconfig.json",
      ".vscode/settings.json",
      ".vscode/tasks.json",
      "assets/manifest.webmanifest",
      "assets/web.config",
      "assets/img/yeoman-003.png",
      "src/app/app.ts",
      "src/app/math.spec.ts",
      "src/app/math.ts",
      "src/app/_star.scss",
      "src/app/app.scss",
      "src/index.html",
    ]);
  });
});
