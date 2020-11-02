import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

const mostFiles = [
  ".eslintrc.json",
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
        assert.noFile("src/public/manifest.json");
        assert.noFileContent("package.json", "workbox");
        assert.noFileContent("src/scripts/app.ts", "serviceWorker");
        assert.noFileContent("webpack.config.js", "istanbul");
        assert.fileContent(".gitignore", "junit.xml");
        done();
      });
  });
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
          "src/public/manifest.json",
        ]);
        assert.fileContent(".gitignore", "junit.xml");
        assert.fileContent(
          "package.json",
          '"format": "prettier --write \\"{test,src}/**\\""'
        );
        done();
      });
  });

  it("adds dependencies", (done) => {
    const pkgJson = {
      devDependencies: {
        express: "^4.17.1",
        "workbox-webpack-plugin": "^4.3.1",
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
        assert.fileContent(
          "package.json",
          '"format": "prettier --write \\"{__tests__,src}/**\\""'
        );
        done();
      });
  });
});
