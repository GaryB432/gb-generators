import Generator = require("yeoman-generator");
import chalk = require("chalk");
import Case = require("case");
import path = require("path");

interface Context {
  tbd: boolean;
  appname: string;
  genstamp: string;
}

export default class extends Generator {
  private cwd = path.basename(process.cwd());
  writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
      genstamp: new Date().toString(),
      tbd: false,
    };
    this.fs.copyTpl(
      this.templatePath("README.md.template"),
      this.destinationPath("README.md"),
      context
    );
  }
  end(): void {
    this.log(chalk.whiteBright("Generator is coming soon!"));
  }
}
