import path = require("path");
import helpers = require("yeoman-test");

describe("classlib skipStyle", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["CustomerInventoryItem"])
        .withOptions({ library: "jest", skipStyles: true })
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

describe("Jest classlib", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["CustomerInventoryItem"])
        .withOptions({ library: "jest" })
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
});

describe("generator-webpack-ts:classlib subfolder", () => {
  describe("test", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["a/b/c/CustomerInventoryItem"])
        .withOptions({ library: "jest" })
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

describe("Karma classlib", () => {
  describe("root folder", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["CustomerInventoryItem"])
        .withOptions({ library: "karma" })
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
        "__tests__/specs/customer-inventory-item.spec.ts",
        "let customerInventoryItem"
      );
    });
  });
});

describe("Karma classlib", () => {
  describe("subfolder", () => {
    let runResult: helpers.RunResult;
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/classlib"))
        .withArguments(["a/b/c/CustomerInventoryItem"])
        .withOptions({ library: "karma" })
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
        "__tests__/specs/a/b/c/customer-inventory-item.spec.ts",
        "let customerInventoryItem"
      );
      runResult.assertFileContent(
        "__tests__/specs/a/b/c/customer-inventory-item.spec.ts",
        "import { CustomerInventoryItem } from '../../../../../src/scripts/a/b/c/customer-inventory-item';"
      );
    });
  });
});
