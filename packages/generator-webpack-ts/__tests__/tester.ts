import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("generator-webpack-ts:tester karma", () => {
  it("creates files", (done) => {
    return helpers
      .run(path.join(__dirname, "../generators/tester"))
      .withPrompts({ workbox: false })
      .then(() => {
        assert.file(["__tests__/index.ts", "karma.conf.js"]);
        assert.jsonFileContent("package.json", {
          devDependencies: { karma: "^5.1.0" },
        });
        // assert.noFile("server.js");
        // assert.noFile("src/sw.js");
        // assert.noFile("src/public/manifest.json");
        // assert.fileContent("package.json", "workbox");
        // assert.noFileContent("src/scripts/app.ts", "serviceWorker");
        done();
      });
  });
});

// describe("generator-webpack-ts:tester jest", () => {
//   it("creates files", (done) => {
//     return helpers
//       .run(path.join(__dirname, "../generators/tester"))
//       .withPrompts({ workbox: true })
//       .then(() => {
//         assert.file([
//           ...mostFiles,
//           "server.js",
//           "src/sw.js",
//           "src/public/manifest.json",
//         ]);
//         done();
//       });
//   });

//   it("adds dependencies", (done) => {
//     const pkgJson = {
//       devDependencies: {
//         express: "^4.17.1",
//         "workbox-webpack-plugin": "^4.3.1",
//       },
//     };
//     return helpers
//       .run(path.join(__dirname, "../generators/tester"))
//       .withPrompts({ workbox: true })
//       .then(() => {
//         assert.jsonFileContent("package.json", pkgJson);
//         assert.fileContent("src/scripts/tester.ts", "serviceWorker");
//         done();
//       });
//   });
// });
