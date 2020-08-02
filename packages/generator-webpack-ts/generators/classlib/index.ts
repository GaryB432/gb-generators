import Generator = require("yeoman-generator");
import chalk = require("chalk");
import Case = require("case");

interface Options {
  library: "jest" | "karma" | "none";
}

export default class extends Generator {
  constructor(args: string | string[], private opts: Options) {
    super(args, opts);
    this.argument("className", {
      description: "the name of the class",
      required: true,
      type: String,
    });
  }

  initializing(): void {
    this.log(chalk.gray(`${this.options.className} coming right up`));
  }

  writing(): void {
    const pkg = this.fs.readJSON(this.destinationPath("package.json"), {});
    const isJest = !!pkg.devDependencies?.jest ?? this.opts.library === "jest";
    const specPath = isJest ? "test" : "__tests__/specs";
    const context = {
      className: Case.kebab(this.options.className),
      classTypeName: Case.pascal(this.options.className),
      genstamp: new Date().toString(),
    };
    this.fs.copyTpl(
      this.templatePath(`${specPath}/blueprint.spec.ts.template`),
      this.destinationPath(`${specPath}/${context.className}.spec.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/scripts/blueprint.ts.template"),
      this.destinationPath(`src/scripts/${context.className}.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/styles/blueprint.scss.template"),
      this.destinationPath(`src/styles/${context.className}.scss`),
      context
    );
  }
}
