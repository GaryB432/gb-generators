import path = require("path");
import helpers = require("yeoman-test");

describe("classlib skipStyle", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["CustomerInventoryItem"])
        .withOptions({ skipStyles: true })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertNoFile("src/styles/customer-inventory-item.scss");
      runResult.assertFileContent(
        "src/scripts/customer-inventory-item.ts",
        "export class CustomerInventoryItem"
      );
      runResult.assertFileContent(
        "test/customer-inventory-item.spec.ts",
        "let customerInventoryItem"
      );
    });
  });
});

describe("classlib", () => {
  describe("plain class", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["CustomerInventoryItem"])
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile("src/styles/customer-inventory-item.scss");
      runResult.assertFileContent(
        "src/scripts/customer-inventory-item.ts",
        "export class CustomerInventoryItem"
      );
      runResult.assertFileContent(
        "test/customer-inventory-item.spec.ts",
        "let customerInventoryItem"
      );
    });
  });
  describe("element", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withOptions({ element: true })
        .withArguments(["CustomerInventoryItem"])
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      // runResult.assertFile("src/styles/customer-inventory-item.scss");
      runResult.assertFileContent(
        "src/scripts/customer-inventory-item.ts",
        "export class customerInventoryItemElement extends HTMLElement"
      );
      runResult.assertFileContent(
        "test/customer-inventory-item.spec.ts",
        "let customerInventoryItemEl: CustomerInventoryItemElement;"
      );
    });
  });
});

describe("generator-webpack-ts:classlib subfolder", () => {
  describe("plain", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["a/b/c/CustomerInventoryItem"])
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile("src/styles/a/b/c/customer-inventory-item.scss");
      runResult.assertFileContent(
        "src/scripts/a/b/c/customer-inventory-item.ts",
        "export class CustomerInventoryItem"
      );
      runResult.assertFileContent(
        "test/a/b/c/customer-inventory-item.spec.ts",
        "let customerInventoryItem"
      );
      runResult.assertFileContent(
        "test/a/b/c/customer-inventory-item.spec.ts",
        "import { CustomerInventoryItem } from '../../../../src/scripts/a/b/c/customer-inventory-item';"
      );
    });
  });
});
