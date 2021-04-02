import Generator = require("yeoman-generator");
import path = require("path");
import Case = require("case");

interface Options {
  library: "karma" | "jest" | "none";
}

interface Context {
  appname: string;
  genstamp: string;
  workbox: boolean;
}

const packageExtensions = {
  jest: {
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
  karma: {
    devDependencies: {
      "@types/jasmine": "^3.5.11",
      "istanbul-instrumenter-loader": "^3.0.1",
      jasmine: "^3.5.0",
      karma: "^5.1.0",
      "karma-chrome-launcher": "^3.1.0",
      "karma-coverage": "^2.0.2",
      "karma-coverage-istanbul-reporter": "^3.0.3",
      "karma-jasmine": "^3.3.1",
      "karma-junit-reporter": "^2.0.1",
      "karma-sourcemap-loader": "^0.3.7",
      "karma-spec-reporter": "0.0.32",
      "karma-webpack": "^4.0.2",
    },
    scripts: {
      test: "karma start --single-run",
      "test-watch": "karma start",
    },
  },
  none: {
    scripts: {
      test: "echo no tests",
      "test-ci": "echo no tests",
    },
  },
};

export default class extends Generator<Options> {
  private cwd = path.basename(process.cwd());
  constructor(args: string | string[], opts: Options) {
    super(args, opts);
  }
  _writePackageJson(): void {
    this.fs.extendJSON(
      this.destinationPath("package.json"),
      packageExtensions[this.options.library],
      undefined,
      2
    );
  }

  writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
      genstamp: new Date().toString(),
      workbox: false, // TODO: add workbox handling
    };
    switch (this.options.library) {
      case "jest":
        this.fs.copy(
          this.templatePath("jest/jest.config.js.template"),
          this.destinationPath("jest.config.js")
        );
        this.fs.copy(
          this.templatePath("jest/azure-pipelines.yml.template"),
          this.destinationPath("azure-pipelines.yml")
        );
        break;
      case "karma":
        this.fs.copyTpl(
          this.templatePath("karma/__tests__/index.ts.template"),
          this.destinationPath("__tests__/index.ts"),
          context
        );
        this.fs.copyTpl(
          this.templatePath("karma/karma.conf.js.template"),
          this.destinationPath("karma.conf.js"),
          context
        );
        this.fs.copy(
          this.templatePath("karma/azure-pipelines.yml.template"),
          this.destinationPath("azure-pipelines.yml")
        );
        break;
    }

    this._writePackageJson();
  }
}
