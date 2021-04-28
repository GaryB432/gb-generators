import Generator = require("yeoman-generator");
import path = require("path");
import Case = require("case");
import chalk = require("chalk");

interface Options {
  tbd: never;
}

interface Context {
  appname: string;
}

export default class extends Generator<Options> {
  private cwd = path.basename(process.cwd());

  writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
    };

    this.fs.copyTpl(
      this.templatePath("_github/workflows/main.yml.template"),
      this.destinationPath(".github/workflows/main.yml"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("azure-pipelines.yml.template"),
      this.destinationPath("azure-pipelines.yml"),
      context
    );
  }
}
