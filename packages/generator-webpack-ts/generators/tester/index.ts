import Generator = require("yeoman-generator");
import path = require("path");
import Case = require("case");

interface Answers {
  workbox: boolean;
}
interface Context {
  appname: string;
  genstamp: string;
  workbox: boolean;
}

export default class extends Generator {
  private answers?: Answers;
  private cwd = path.basename(process.cwd());
  // async prompting(): Promise<void | Answers> {
  //   return this.prompt<Answers>([
  //     {
  //       default: true,
  //       message: `Would you like to include ${chalk.green(
  //         "Workbox"
  //       )} service worker?`,
  //       name: "workbox",
  //       type: "confirm",
  //     },
  //   ]).then((answers) => {
  //     this.answers = answers;
  //   });
  // }

  // initializing(): void {
  //   // this.composeWith(require.resolve("../classlib"), {
  //   //   arguments: ["Greeter"],
  //   // });

  //   this.log(chalk.gray("Adding test scaffolding"));
  // }

  _writePackageJson(_context: Context): void {
    this.fs.extendJSON(
      this.destinationPath("package.json"),
      {
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
      undefined,
      2
    );
    // this.fs.copyTpl(
    //   this.templatePath("package.json.template"),
    //   this.destinationPath("package.json"),
    //   context
    // );
    // if (this.answers && this.answers.workbox) {
    //   this.fs.extendJSON(this.destinationPath("package.json"), {
    //     devDependencies: {
    //       express: "^4.17.1",
    //       "workbox-webpack-plugin": "^4.3.1",
    //     },
    //   });
    // }
  }

  writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
      genstamp: new Date().toString(),
      workbox: (this.answers && this.answers.workbox) || false,
    };
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

    this._writePackageJson(context);
  }

  install(): void {
    this.installDependencies({ bower: false, npm: true, yarn: false });
  }
}
