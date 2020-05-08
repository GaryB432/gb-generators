import Generator = require("yeoman-generator");
import chalk = require("chalk");
import yosay = require("yosay");
import Case = require("case");
import path = require("path");

interface Answers {
  independent: boolean;
}

export default class extends Generator {
  private answers: Answers;
  private cwd: string;
  async prompting(): Promise<Answers | void> {
    const answers = await this.prompt([
      {
        default: false,
        message: "Version packages independently?",
        name: "independent",
        type: "confirm",
      },
    ]);
    this.answers = answers;
  }

  initializing(): void {
    this.log(
      yosay(`Welcome to the rad ${chalk.red("lerna-typescript")} generator!`)
    );

    this.composeWith(require.resolve("../package"), {
      arguments: ["@myscope/greeter"],
    });
    this.composeWith(require.resolve("../prettier"), {});
    this.composeWith(require.resolve("../eslint"), {});

    this.cwd = path.basename(process.cwd());
  }

  writing(): void {
    const context = {
      appname: Case.kebab(this.cwd),
    };
    this.fs.copy(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("jest.config.js.template"),
      this.destinationPath("jest.config.js")
    );

    const lernaJson = {
      packages: ["packages/*", "tools/*"],
      version: this.answers.independent ? "independent" : "0.0.0",
    };

    this.fs.extendJSON(this.destinationPath("lerna.json"), lernaJson);

    this.fs.copy(
      this.templatePath("_package.json"),
      this.destinationPath("package.json")
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      context
    );
    this.fs.copy(
      this.templatePath("_tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
  }

  install(): void {
    this.installDependencies({ bower: false, npm: true, yarn: false });
  }

  end(): void {
    this.log(
      `Create a new package with ${chalk.green(
        "yo lerna-typescript:package @my-scope/my-new-package"
      )}.`
    );
  }
}
