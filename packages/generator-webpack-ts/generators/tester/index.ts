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
  jest: {
    devDependencies: {
      "@types/jest": "^26.0.7",
      "@types/node": "^14.0.26",
      jest: "^26.1.0",
      "jest-junit": "^11.0.1",
      "ts-jest": "^26.1.3",
    },
    scripts: {
      test: "jest",
      "test-ci": "jest --ci --coverage",
    },
  },
  none: {
    scripts: {
      test: "echo no tests",
    },
  },
};

export default class extends Generator {
  private cwd = path.basename(process.cwd());
  constructor(args: string | string[], private opts: Options) {
    super(args, opts);
  }
  _writePackageJson(_context: Context): void {
    this.fs.extendJSON(
      this.destinationPath("package.json"),
      packageExtensions[this.opts.library],
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
    switch (this.opts.library) {
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
      default: {
        throw new Error(JSON.stringify(this.opts, undefined, 2));
      }
    }

    this._writePackageJson(context);
  }

  install(): void {
    this.installDependencies({ bower: false, npm: true, yarn: false });
  }
}
