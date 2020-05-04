import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

const mostFiles = [
  ".eslintrc.js",
  ".gitignore",
  ".gitattributes",
  ".travis.yml",
  ".vscode/settings.json",
  ".vscode/tasks.json",
  "package.json",
  "karma.conf.js",
  "README.md",
  "src/public/index.html",
  "src/public/img/yeoman-003.png",
  "src/scripts/app.ts",
  "src/styles/app.scss",
  "tsconfig.json",
  "webpack.config.js",
];

describe("generator-webpack-ts:app", () => {
  // beforeAll(() => {
  //   return helpers
  //     .run(path.join(__dirname, "../generators/app"))
  //     .withPrompts({ workbox: false });
  // });

  it("creates files", () => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ workbox: false })
      .then(() => {
        assert.file(mostFiles);
        assert.noFile("server.js");
        assert.noFile("src/sw.js");
        assert.noFile("src/public/manifest.json");
      });
  });

  // it("adds dependencies", () => {
  //   assert.noFileContent("package.json", "workbox");
  // });

  // it("does not mention serviceWorker", () => {
  //   assert.noFileContent("src/scripts/app.ts", "serviceWorker");
  // });
});

describe("generator-webpack-ts:app with workbox", () => {
  it("creates files", () => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ workbox: true })
      .then(() => {
        assert.file([
          ...mostFiles,
          "server.js",
          "src/sw.js",
          "src/public/manifest.json",
        ]);
      });
  });

  it("adds dependencies", () => {
    const pkgJson = {
      devDependencies: {
        express: "^4.17.1",
        "workbox-webpack-plugin": "^4.3.1",
      },
    };
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ workbox: true })
      .then(() => {
        assert.jsonFileContent("package.json", pkgJson);
      });
  });

  it("mentions serviceworker", () => {
    const pkgJson = {
      devDependencies: {
        express: "^4.17.1",
        "workbox-webpack-plugin": "^4.3.1",
      },
    };
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ workbox: true })
      .then(() => {
        assert.fileContent("src/scripts/app.ts", "serviceWorker");
      });
  });
});
