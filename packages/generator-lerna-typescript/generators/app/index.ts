import Generator = require("yeoman-generator");
import chalk = require("chalk");
import Case = require("case");
import path = require("path");

interface Answers {
  independent: boolean;
}

export default class extends Generator {
  private answers?: Answers;
  private cwd = path.basename(process.cwd());
  protected async prompting(): Promise<Answers | void> {
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

  protected initializing(): void {
    this.composeWith(require.resolve("../package"), {
      arguments: ["@myscope/greeter"],
    });
    this.composeWith(
      require.resolve("generator-gb-utility/generators/prettier"),
      {}
    );
    this.composeWith(
      require.resolve("generator-gb-utility/generators/eslint"),
      { browser: false, node: true }
    );
  }

  protected writing(): void {
    const context = {
      appname: Case.kebab(this.cwd),
    };
    this.fs.copy(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("azure-pipelines.yml.template"),
      this.destinationPath("azure-pipelines.yml")
    );
    this.fs.copy(
      this.templatePath("workflow.yml.template"),
      this.destinationPath(".github/workflows/lerna.yml")
    );
    this.fs.copy(
      this.templatePath("jest.config.js.template"),
      this.destinationPath("jest.config.js")
    );

    const lernaJson = {
      packages: ["packages/*", "tools/*"],
      version:
        this.answers && this.answers.independent ? "independent" : "0.0.0",
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
  protected end(): void {
    this.log(
      `Create a new package with ${chalk.green(
        "yo lerna-typescript:package @my-scope/my-new-package"
      )}.`
    );
  }
}
