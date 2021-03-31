import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

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
  it("creates files", (done) => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ library: "jest", workbox: false })
      .then(() => {
        assert.file(mostFiles);
        assert.noFile("server.js");
        assert.noFile("src/sw.js");
        assert.noFileContent("package.json", "workbox");
        assert.noFileContent("src/scripts/app.ts", "serviceWorker");
        assert.noFileContent("webpack.config.js", "istanbul");
        assert.noFileContent("src/index.html", "manifest.webmanifest");
        assert.fileContent(".gitignore", "junit.xml");
        done();
      });
  }, 10000);
});

describe("generator-webpack-ts:app with workbox", () => {
  it("creates files", (done) => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ library: "jest", workbox: true })
      .then(() => {
        assert.file([
          ...mostFiles,
          "server.js",
          "src/sw.js",
          "src/public/manifest.webmanifest",
          "src/public/web.config",
        ]);
        assert.fileContent(".gitignore", "junit.xml");
        assert.fileContent("package.json", '"format": "prettier --write ."');
        assert.fileContent("src/index.html", "manifest.webmanifest");
        ["dist", "img", "package*.json"].forEach((noFormatting) =>
          assert.fileContent(".prettierignore", noFormatting)
        );
        done();
      });
  }, 10000);

  it("adds dependencies", (done) => {
    const pkgJson = {
      devDependencies: {
        express: "^4.17.1",
        "workbox-webpack-plugin": "^6.1.0",
      },
    };
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ library: "karma", workbox: true })
      .then(() => {
        assert.jsonFileContent("package.json", pkgJson);
        assert.fileContent("src/scripts/app.ts", "serviceWorker");
        assert.fileContent("webpack.config.js", "istanbul");
        assert.fileContent(".gitignore", "results");
        assert.fileContent("package.json", '"format": "prettier --write ."');
        done();
      });
  });
});
