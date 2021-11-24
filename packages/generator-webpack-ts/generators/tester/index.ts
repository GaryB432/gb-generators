import Generator = require("yeoman-generator");

export default class extends Generator {
  private _writePackageJson(): void {
    this.fs.extendJSON(
      this.destinationPath("package.json"),
      {
        devDependencies: {
          "@types/jest": "^27.0.1",
          "@types/node": "^16.6.1",
          jest: "^27.0.6",
          "jest-junit": "^12.2.0",
          "ts-jest": "^27.0.4",
        },
        scripts: {
          test: "jest",
          "test-ci": "jest --ci --coverage",
        },
      },
      undefined,
      2
    );
  }

  protected writing(): void {
    this.fs.copy(
      this.templatePath("jest/jest.config.js.template"),
      this.destinationPath("jest.config.js")
    );
    this.fs.copy(
      this.templatePath("jest/azure-pipelines.yml.template"),
      this.destinationPath("azure-pipelines.yml")
    );

    this._writePackageJson();
  }
}
