import path = require("path");
import assert = require("yeoman-assert");
import helpers = require("yeoman-test");

describe("classlib skipStyle", () => {
  describe("generator-webpack-ts:classlib", () => {
    it("creates files", (done) => {
      return helpers
        .run(path.join(__dirname, "../generators/classlib"))
        .withArguments(["CustomerInventoryItem"])
        .withOptions({ library: "jest", skipStyles: true })
        .then(() => {
          assert.noFile("src/styles/customer-inventory-item.scss");
          assert.fileContent(
            "src/scripts/customer-inventory-item.ts",
            "export class CustomerInventoryItem"
          );
          assert.fileContent(
            "test/customer-inventory-item.spec.ts",
            "let customerInventoryItem"
          );
          done();
        });
    });
  });
});

describe("Jest classlib", () => {
  describe("generator-webpack-ts:classlib", () => {
    it("creates files", (done) => {
      return helpers
        .run(path.join(__dirname, "../generators/classlib"))
        .withArguments(["CustomerInventoryItem"])
        .withOptions({ library: "jest" })
        .then(() => {
          assert.file("src/styles/customer-inventory-item.scss");
          assert.fileContent(
            "src/scripts/customer-inventory-item.ts",
            "export class CustomerInventoryItem"
          );
          assert.fileContent(
            "test/customer-inventory-item.spec.ts",
            "let customerInventoryItem"
          );
          done();
        });
    });
  });

  describe("generator-webpack-ts:classlib subfolder", () => {
    it("creates files", (done) => {
      return helpers
        .run(path.join(__dirname, "../generators/classlib"))
        .withArguments(["a/b/c/CustomerInventoryItem"])
        .withOptions({ library: "jest" })
        .then(() => {
          assert.file("src/styles/a/b/c/customer-inventory-item.scss");
          assert.fileContent(
            "src/scripts/a/b/c/customer-inventory-item.ts",
            "export class CustomerInventoryItem"
          );
          assert.fileContent(
            "test/a/b/c/customer-inventory-item.spec.ts",
            "let customerInventoryItem"
          );
          assert.fileContent(
            "test/a/b/c/customer-inventory-item.spec.ts",
            "import { CustomerInventoryItem } from '../../../../src/scripts/a/b/c/customer-inventory-item';"
          );
          done();
        });
    });
  });
});

describe("Karma classlib", () => {
  describe("generator-webpack-ts:classlib", () => {
    it("creates files", (done) => {
      return helpers
        .run(path.join(__dirname, "../generators/classlib"))
        .withArguments(["CustomerInventoryItem"])
        .withOptions({ library: "karma" })
        .then(() => {
          assert.file("src/styles/customer-inventory-item.scss");
          assert.fileContent(
            "src/scripts/customer-inventory-item.ts",
            "export class CustomerInventoryItem"
          );
          assert.fileContent(
            "__tests__/specs/customer-inventory-item.spec.ts",
            "let customerInventoryItem"
          );
          done();
        });
    });
  });

  describe("generator-webpack-ts:classlib subfolder", () => {
    it("creates files", (done) => {
      return helpers
        .run(path.join(__dirname, "../generators/classlib"))
        .withArguments(["a/b/c/CustomerInventoryItem"])
        .withOptions({ library: "karma" })
        .then(() => {
          assert.file("src/styles/a/b/c/customer-inventory-item.scss");
          assert.fileContent(
            "src/scripts/a/b/c/customer-inventory-item.ts",
            "export class CustomerInventoryItem"
          );
          assert.fileContent(
            "__tests__/specs/a/b/c/customer-inventory-item.spec.ts",
            "let customerInventoryItem"
          );
          assert.fileContent(
            "__tests__/specs/a/b/c/customer-inventory-item.spec.ts",
            "import { CustomerInventoryItem } from '../../../../../src/scripts/a/b/c/customer-inventory-item';"
          );
          done();
        });
    });
  });
});
