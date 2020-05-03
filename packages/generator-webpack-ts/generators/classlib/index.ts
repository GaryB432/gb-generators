import Generator = require("yeoman-generator");
import chalk = require("chalk");
import path = require("path");
import Case = require("case");

export default class extends Generator {
  private cwd: string;
  constructor(args, opts) {
    super(args, opts);
    this.argument("className", {
      description: "the name of the class",
      required: true,
      type: String,
    });
  }

  initializing() {
    this.log(chalk.gray(`${this.options.className} coming right up`));
    this.cwd = path.basename(process.cwd());
  }

  writing() {
    const context = {
      className: Case.kebab(this.options.className),
      classTypeName: Case.pascal(this.options.className),
      genstamp: new Date().toString(),
    };
    this.fs.copyTpl(
      this.templatePath("__tests__/blueprint.spec.ts.template"),
      this.destinationPath(`__tests__/${context.className}.spec.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/scripts/blueprint.ts"),
      this.destinationPath(`src/scripts/${context.className}.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/styles/blueprint.scss"),
      this.destinationPath(`src/styles/${context.className}.scss`),
      context
    );
  }
}
