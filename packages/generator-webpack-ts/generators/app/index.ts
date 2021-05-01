import Generator = require("yeoman-generator");
import chalk = require("chalk");
import path = require("path");
import Case = require("case");

interface Answers {
  workbox: boolean;
}
interface Context {
  appname: string;
  genstamp: string;
  workbox: boolean;
  testsPath: string;
}

export default class extends Generator {
  private answers?: Answers;
  private cwd = path.basename(process.cwd());

  async prompting(): Promise<void | Answers> {
    const answers = await this.prompt<Answers>([
      {
        default: true,
        message: `Would you like to include ${chalk.green(
          "Workbox"
        )} service worker?`,
        name: "workbox",
        type: "confirm",
      },
    ]);
    this.answers = answers;
    this.composeWith(require.resolve("../tester"), { ...answers });
    this.composeWith(require.resolve("../classlib"), {
      arguments: ["Greeter"],
      ...answers,
    });
    return answers;
  }

  initializing(): void {
    this.composeWith(
      require.resolve("generator-gb-utility/generators/prettier"),
      {}
    );
    this.composeWith(
      require.resolve("generator-gb-utility/generators/eslint"),
      { browser: true, node: false }
    );
  }

  _writePackageJson(context: Context): void {
    this.fs.copyTpl(
      this.templatePath("package.json.template"),
      this.destinationPath("package.json"),
      context
    );
    if (this.answers?.workbox) {
      this.fs.extendJSON(this.destinationPath("package.json"), {
        devDependencies: {
          express: "^4.17.1",
          "workbox-webpack-plugin": "^6.1.0",
        },
      });
    }
  }

  writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
      genstamp: new Date().toString(),
      testsPath: "tests",
      workbox: !!this.answers?.workbox,
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
      this.templatePath("src/index.html.template"),
      this.destinationPath("src/index.html"),
      context
    );
    ["144", "512"]
      .map((f) => `icon-${f}.png`)
      .forEach((f) => {
        this.fs.copyTpl(
          this.templatePath(`src/public/img/${f}`),
          this.destinationPath(`src/public/img/${f}`),
          context
        );
      });
    this.fs.copy(
      this.templatePath("src/public/img/yeoman-003.png"),
      this.destinationPath("src/public/img/yeoman-003.png")
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
    const ignore = ["node_modules", "dist", "coverage", "junit.xml"];
    this.fs.write(
      ".gitignore",
      ignore
        .map((fn) => `${fn}\n`)
        .sort((a, b) => a.localeCompare(b))
        .join("")
    );
    this.fs.copy(
      this.templatePath(".gitattributes.template"),
      this.destinationPath(".gitattributes")
    );
    this.fs.copy(
      this.templatePath(".travis.yml.template"),
      this.destinationPath(".travis.yml")
    );

    this._writePackageJson(context);

    this.fs.copyTpl(
      this.templatePath("README.md.template"),
      this.destinationPath("README.md"),
      context
    );
    if (this.answers?.workbox) {
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
        this.templatePath("src/public/manifest.webmanifest.template"),
        this.destinationPath("src/public/manifest.webmanifest"),
        context
      );
      this.fs.copyTpl(
        this.templatePath("src/public/web.config.template"),
        this.destinationPath("src/public/web.config"),
        context
      );
    }

    this.fs.copy(
      this.templatePath("tsconfig.json.template"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js.template"),
      this.destinationPath("webpack.config.js"),
      context
    );
  }
}
