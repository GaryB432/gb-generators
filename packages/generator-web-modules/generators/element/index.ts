import Generator = require("yeoman-generator");
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
      this.templatePath("src/modules/adder.element.spec.ts.template"),
      this.destinationPath("src/modules/adder.element.spec.ts"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/modules/adder.element.ts.template"),
      this.destinationPath("src/modules/adder.element.ts"),
      context
    );
  }
}
