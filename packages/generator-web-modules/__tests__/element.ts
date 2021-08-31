import { getContext, getFilePath } from "../generators/element";
import path = require("path");
import helpers = require("yeoman-test");

describe("generator-web-customer-inventory:element", () => {
  describe("basics", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/element"))
        .withArguments(["CustomerInventory"])
        .withOptions({ minimal: false })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile([
        "src/customer-inventory/index.html",
        "src/customer-inventory/customer-inventory.app.ts",
        "src/customer-inventory/customer-inventory.element.spec.ts",
        "src/customer-inventory/customer-inventory.element.ts",
        "src/customer-inventory/customer-inventory.scss",
      ]);
      runResult.assertFileContent(
        "src/customer-inventory/customer-inventory.element.ts",
        "export class CustomerInventoryElement"
      );
      runResult.assertFileContent(
        "src/customer-inventory/customer-inventory.element.ts",
        "import { adder, parse } from '../app/math';"
      );
      runResult.assertFileContent(
        "src/customer-inventory/customer-inventory.element.spec.ts",
        "let customerInventoryEl"
      );
      runResult.assertFileContent(
        "src/customer-inventory/customer-inventory.element.spec.ts",
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
        .withOptions({ minimal: false })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFileContent(
        "src/a/b/c/customer-inventory/customer-inventory.element.ts",
        "export class CustomerInventoryElement"
      );
      runResult.assertFileContent(
        "src/a/b/c/customer-inventory/customer-inventory.element.ts",
        "import { adder, parse } from '../../../../app/math';"
      );
      runResult.assertFileContent(
        "src/a/b/c/customer-inventory/customer-inventory.element.spec.ts",
        "let customerInventoryEl"
      );
      runResult.assertFileContent(
        "src/a/b/c/customer-inventory/customer-inventory.element.spec.ts",
        "import { CustomerInventoryElement } from './customer-inventory.element';"
      );
    });
  });

  describe("basics minimal", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/element"))
        .withArguments(["CustomerInventory"])
        .withOptions({ minimal: true })
        .run();
    });
    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });
    it("runs correctly", () => {
      runResult.assertFile([
        "src/customer-inventory/customer-inventory.element.spec.ts",
        "src/customer-inventory/customer-inventory.element.ts",
      ]);
      runResult.assertNoFile([
        "src/customer-inventory/customer-inventory.app.ts",
        "src/customer-inventory/index.html",
        "src/customer-inventory/customer-inventory.scss",
      ]);
    });
  });

  describe("utilities", () => {
    it("gets context windows subfolders", () => {
      expect(getContext("a\\b\\NewClass")).toEqual({
        classCamel: "newClass",
        classKebab: "new-class",
        className: "NewClass",
        filePath: "/a/b/",
        mathImport: "../../../app/math",
      });
    });
    it("gets context subfolders", () => {
      expect(getContext("a/b/c/NewClass")).toEqual({
        classCamel: "newClass",
        classKebab: "new-class",
        className: "NewClass",
        filePath: "/a/b/c/",
        mathImport: "../../../../app/math",
      });
    });
    it("gets context", () => {
      expect(getContext("NewClass")).toEqual({
        classCamel: "newClass",
        classKebab: "new-class",
        className: "NewClass",
        filePath: "/",
        mathImport: "../app/math",
      });
    });

    it("gets paths", () => {
      expect(getFilePath("NewClass", "readme.txt")).toEqual(
        "src/new-class/readme.txt"
      );
      expect(getFilePath("a/b/c/NewClass", "readme.txt")).toEqual(
        "src/a/b/c/new-class/readme.txt"
      );
    });
  });
});
