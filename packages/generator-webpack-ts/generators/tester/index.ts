import Generator = require("yeoman-generator");
import path = require("path");
import Case = require("case");
import { Dictionary } from "yeoman-test";
import chalk = require("chalk");

interface Options {
  library: "karma" | "jest" | "none";
}

interface Context {
  appname: string;
  genstamp: string;
  workbox: boolean;
}

export default class extends Generator {
  private cwd = path.basename(process.cwd());
  constructor(args: string | string[], opts: Dictionary<any>) {
    super(args, opts);
  }
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

  end(): void {
    if (this.options.library === "karma") {
      this.log(chalk.yellowBright("Karma support is deprecated"));
      this.log(
        chalk.redBright("Your tests will need karma-related package upgrades")
      );
    }
  }

  writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
      genstamp: new Date().toString(),
      workbox: false, // TODO: add workbox handling
    };
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
