import Generator = require("yeoman-generator");

export default class extends Generator {
  _writePackageJson(): void {
    this.fs.extendJSON(
      this.destinationPath("package.json"),
      {
        devDependencies: {
          "@types/jest": "^26.0.20",
          "@types/node": "^14.14.22",
          jest: "^26.6.3",
          "jest-junit": "^12.0.0",
          "ts-jest": "^26.5.0",
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

  writing(): void {
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
