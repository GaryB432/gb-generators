import Generator = require("yeoman-generator");
import path = require("path");
import Case = require("case");

interface Answers {
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
  private answers?: Answers;
  private cwd = path.basename(process.cwd());
  async prompting(): Promise<void | Answers> {
    return this.prompt<Answers>([
      {
        choices: ["Jest", "Karma", "None"],
        filter: (val: string): string => val.toLowerCase(),
        message: "Which testing library?",
        name: "library",
        type: "list",
      },
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  _writePackageJson(_context: Context): void {
    this.fs.extendJSON(
      this.destinationPath("package.json"),
      packageExtensions[this.answers?.library ?? "none"],
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
    switch (this.answers?.library) {
      case "jest":
        this.fs.copyTpl(
          this.templatePath("jest/jest.config.js.template"),
          this.destinationPath("jest.config.js"),
          context
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
        break;
    }

    this._writePackageJson(context);
  }

  install(): void {
    this.installDependencies({ bower: false, npm: true, yarn: false });
  }
}
