import path = require("path");
import helpers = require("yeoman-test");

describe("generator-web-modules:pipeline", () => {
  describe("karma", () => {
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
        "src/modules/customer-inventory.element.spec.ts",
        "let customerInventoryEl"
      );
      runResult.assertFileContent(
        "src/modules/customer-inventory.element.spec.ts",
        "import { CustomerInventoryElement } from './customer-inventory.element';"
      );
    });
  });
});
