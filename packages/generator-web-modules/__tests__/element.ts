import { getContext } from "../generators/element";
import path = require("path");
import helpers = require("yeoman-test");

describe("generator-web-modules:element", () => {
  describe("basics", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/element"))
        .withArguments(["CustomerInventory"])
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFileContent(
        "src/modules/customer-inventory.element.ts",
        "export class CustomerInventoryElement"
      );
      runResult.assertFileContent(
        "src/modules/customer-inventory.element.ts",
        "import { adder, parse } from './math';"
      );
      runResult.assertFileContent(
        "src/modules/customer-inventory.element.spec.ts",
        "let customerInventoryEl"
      );
      runResult.assertFileContent(
        "src/modules/customer-inventory.element.spec.ts",
        "import { CustomerInventoryElement } from './customer-inventory.element';"
      );
    });
  });
  describe("subfolder", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/element"))
        .withArguments(["a/b/c/CustomerInventory"])
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFileContent(
        "src/modules/a/b/c/customer-inventory.element.ts",
        "export class CustomerInventoryElement"
      );
      runResult.assertFileContent(
        "src/modules/a/b/c/customer-inventory.element.ts",
        "import { adder, parse } from '../../../math';"
      );
      runResult.assertFileContent(
        "src/modules/a/b/c/customer-inventory.element.spec.ts",
        "let customerInventoryEl"
      );
      runResult.assertFileContent(
        "src/modules/a/b/c/customer-inventory.element.spec.ts",
        "import { CustomerInventoryElement } from './customer-inventory.element';"
      );
    });
  });

  describe("utilities", () => {
    it("gets context windows subfolders", () => {
      expect(getContext("a\\b\\NewClass")).toEqual({
        classCamel: "newClass",
        classKebab: "new-class",
        className: "NewClass",
        filePath: "/a/b/",
        mathImport: "../../math",
      });
    });
    it("gets context subfolders", () => {
      expect(getContext("a/b/c/NewClass")).toEqual({
        classCamel: "newClass",
        classKebab: "new-class",
        className: "NewClass",
        filePath: "/a/b/c/",
        mathImport: "../../../math",
      });
    });
    it("gets context", () => {
      expect(getContext("NewClass")).toEqual({
        classCamel: "newClass",
        classKebab: "new-class",
        className: "NewClass",
        filePath: "/",
        mathImport: "./math",
      });
    });
  });
});
