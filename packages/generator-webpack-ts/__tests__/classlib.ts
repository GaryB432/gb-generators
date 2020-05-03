import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

// import App = require("../generators/classlib");

// import App = require( "../generators/classlib");

// const fd = helpers
//     .run(App, {resolved: path.join(__dirname, '../generators/classlib/index')})
//     .withArguments(["CustomerInventoryItem"])
//     .withPrompts({ wtf: false });

// notbeforeAll(() => {
//   return helpers
//     .run(path.join(__dirname, "../generators/classlib"))
//     .withArguments(["CustomerInventoryItem"])
//     .withPrompts({ wtf: false });
// });

// const fdf = helpers
// .run(path.join(__dirname, "../generators/classlib"))
// .withArguments(["CustomerInventoryItem"])
// .withPrompts({ wtf: false });

describe("generator-webpack-ts:classlib", () => {
  // beforeAll(() => {
  //   return helpers
  //     .run(App, {resolved: path.join(__dirname, '../generators/classlib/index')})
  //     .withArguments(["CustomerInventoryItem"])
  //     .withPrompts({ wtf: false });
  // });

  it("creates files", () => {
    return helpers
      .run(path.join(__dirname, "../generators/classlib"))
      .withArguments(["CustomerInventoryItem"])
      .withPrompts({ wtf: false })
      .then(() => {
        assert.file([
          "__tests__/customer-inventory-item.spec.ts",
          "src/scripts/customer-inventory-item.ts",
          "src/styles/customer-inventory-item.scss",
        ]);
      });
  });

  it("mentions CustomerInventoryItem", () => {
    assert.fileContent(
      "src/scripts/customer-inventory-item.ts",
      "export class CustomerInventoryItem"
    );
  });
});
