import Generator = require("yeoman-generator");
import Case = require("case");
import path = require("path");

interface Context {
  className: string;
  classKebab: string;
  classCamel: string;
  filePath: string;
  mathImport: string;
}

interface Options {
  className: string;
  tbd: never;
}

export function getContext(className: string): Context {
  const parts = className.split(/[\\/]/g);
  const name = parts.slice(-1)[0];
  const mathParts: string[] =
    parts.length === 1 ? ["."] : Array(parts.length).fill("..");
  const mathImport = [...mathParts, "math"].join("/");
  return {
    className: Case.pascal(name),
    classKebab: Case.kebab(name),
    classCamel: Case.camel(name),
    filePath: ["", ...parts.slice(0, -1), ""].join("/"),
    mathImport,
  };
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
    const context = getContext(this.options.className);
    this.fs.copyTpl(
      this.templatePath("element.spec.ts.template"),
      this.destinationPath(
        `src/modules${context.filePath}${context.classKebab}.element.spec.ts`
      ),
      context
    );
    this.fs.copyTpl(
      this.templatePath("element.ts.template"),
      this.destinationPath(
        `src/modules${context.filePath}${context.classKebab}.element.ts`
      ),
      context
    );
  }
}
