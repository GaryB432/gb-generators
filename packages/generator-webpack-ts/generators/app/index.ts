import Generator = require("yeoman-generator");
import chalk = require("chalk");
import yosay = require("yosay");
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
  prompting(): Promise<void | Answers> {
    return this.prompt<Answers>([
      {
        default: true,
        message: `Would you like to include ${chalk.green(
          "Workbox"
        )} service worker?`,
        name: "workbox",
        type: "confirm",
      },
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  initializing(): void {
    this.log(
      yosay(
        "Welcome to the minimal " +
          chalk.red("Webpack TypeScript") +
          " generator!"
      )
    );

    this.composeWith(require.resolve("../classlib"), {
      arguments: ["Greeter"],
    });

    this.log(chalk.gray("Coming right up"));
  }

  _writePackageJson(context: Context): void {
    this.fs.copyTpl(
      this.templatePath("package.json.template"),
      this.destinationPath("package.json"),
      context
    );
    if (this.answers && this.answers.workbox) {
      this.fs.extendJSON(this.destinationPath("package.json"), {
        devDependencies: {
          express: "^4.17.1",
          "workbox-webpack-plugin": "^4.3.1",
        },
      });
    }
  }

  writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
      genstamp: new Date().toString(),
      workbox: (this.answers && this.answers.workbox) || false,
    };
    this.fs.copy(
      this.templatePath("_vscode/settings.json"),
      this.destinationPath(".vscode/settings.json")
    );
    this.fs.copy(
      this.templatePath("_vscode/tasks.json"),
      this.destinationPath(".vscode/tasks.json")
    );
    this.fs.copyTpl(
      this.templatePath("__tests__/index.ts.template"),
      this.destinationPath("__tests__/index.ts"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/public/index.html"),
      this.destinationPath("src/public/index.html"),
      context
    );
    this.fs.copy(
      this.templatePath("src/public/img/yeoman-003.png"),
      this.destinationPath("src/public/img/yeoman-003.png"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/scripts/app.ts.template"),
      this.destinationPath("src/scripts/app.ts"),
      context
    );
    this.fs.copy(
      this.templatePath("src/styles/app.scss.template"),
      this.destinationPath("src/styles/app.scss")
    );
    this.fs.copy(
      this.templatePath(".gitignore.template"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath(".gitattributes.template"),
      this.destinationPath(".gitattributes")
    );
    this.fs.copy(
      this.templatePath("azure-pipelines.yml.template"),
      this.destinationPath("azure-pipelines.yml")
    );
    this.fs.copy(
      this.templatePath(".travis.yml.template"),
      this.destinationPath(".travis.yml")
    );

    this._writePackageJson(context);

    this.fs.copyTpl(
      this.templatePath("karma.conf.js.template"),
      this.destinationPath("karma.conf.js"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("README.md.template"),
      this.destinationPath("README.md"),
      context
    );
    if (this.answers && this.answers.workbox) {
      this.fs.copy(
        this.templatePath("server.js.template"),
        this.destinationPath("server.js")
      );
      this.fs.copyTpl(
        this.templatePath("src/sw.js.template"),
        this.destinationPath("src/sw.js"),
        context
      );
      this.fs.copyTpl(
        this.templatePath("src/public/manifest.json.template"),
        this.destinationPath("src/public/manifest.json"),
        context
      );
    }

    this.fs.copy(
      this.templatePath("tsconfig.json.template"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copy(
      this.templatePath(".eslintrc.js.template"),
      this.destinationPath(".eslintrc.js")
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js.template"),
      this.destinationPath("webpack.config.js"),
      context
    );
  }

  install(): void {
    this.installDependencies({ bower: false, npm: true, yarn: false });
  }
}
