import path = require("path");
import helpers = require("yeoman-test");

const sut = path.join(__dirname, "../generators/app");

const mostFiles = [
  ".gitignore",
  ".gitattributes",
  ".prettierignore",
  ".prettierrc",
  ".travis.yml",
  ".vscode/settings.json",
  ".vscode/tasks.json",
  "package.json",
  "README.md",
  "src/index.html",
  "src/public/img/yeoman-003.png",
  "src/public/img/icon-144.png",
  "src/public/img/icon-512.png",
  "src/scripts/app.ts",
  "src/styles/app.scss",
  "tsconfig.json",
  "webpack.config.js",
];

describe("generator-webpack-ts:app", () => {
  describe("workbox", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(sut)
        .withPrompts({ library: "jest", workbox: true })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile([
        ...mostFiles,
        "server.js",
        "src/sw.js",
        "src/public/manifest.webmanifest",
        "src/public/web.config",
      ]);
      runResult.assertFileContent(".gitignore", "junit.xml");
      runResult.assertFileContent(
        "package.json",
        '"format": "prettier --write ."'
      );
      runResult.assertFileContent("src/index.html", "manifest.webmanifest");
      ["dist", "img", "package*.json"].forEach((noFormatting) =>
        runResult.assertFileContent(".prettierignore", noFormatting)
      );
    });
  });
  describe("no workbox", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(sut)
        .withPrompts({ library: "jest", workbox: false })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile(mostFiles);
      runResult.assertNoFile("server.js");
      runResult.assertNoFile("src/sw.js");
      runResult.assertNoFileContent("package.json", "workbox");
      runResult.assertNoFileContent("src/scripts/app.ts", "serviceWorker");
      runResult.assertNoFileContent("webpack.config.js", "istanbul");
      runResult.assertNoFileContent("src/index.html", "manifest.webmanifest");
      runResult.assertFileContent(".gitignore", "junit.xml");
    });
  });
  describe("workbox karma", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(sut)
        .withPrompts({ library: "karma", workbox: true })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertJsonFileContent("package.json", {
        devDependencies: {
          express: "^4.17.1",
          "workbox-webpack-plugin": "^6.1.0",
        },
      });
      runResult.assertFileContent("src/scripts/app.ts", "serviceWorker");
      runResult.assertFileContent("webpack.config.js", "istanbul");
      runResult.assertFileContent(".gitignore", "results");
      runResult.assertFileContent(
        "package.json",
        '"format": "prettier --write ."'
      );
    });
  });
});
