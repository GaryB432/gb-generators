import Generator = require("yeoman-generator");
import Case = require("case");
import path = require("path");

interface Context {
  className: string;
  classKebab: string;
  classCamel: string;
}

interface Options {
  className: string;
  tbd: never;
}

export default class extends Generator<Options> {
  constructor(args: string | string[], opts: Options) {
    super(args, opts);
    this.argument("className", {
      description: "the class name of the element",
      required: true,
      type: String,
    });
  }
  writing(): void {
    const context: Context = {
      className: Case.pascal(this.options.className),
      classKebab: Case.kebab(this.options.className),
      classCamel: Case.camel(this.options.className),
    };
    this.fs.copyTpl(
      this.templatePath("element.spec.ts.template"),
      this.destinationPath(`src/modules/${context.classKebab}.element.spec.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath("element.ts.template"),
      this.destinationPath(`src/modules/${context.classKebab}.element.ts`),
      context
    );
  }
}
