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
  minimal: boolean;
  tbd: never;
}

export function getContext(className: string): Context {
  const parts = className.split(/[\\/]/g);
  const name = parts.slice(-1)[0];
  const mathParts: string[] =
    parts.length === 1 ? [".."] : Array(parts.length).fill("..");
  const mathImport = [...mathParts, "app", "math"].join("/");
  return {
    className: Case.pascal(name),
    classKebab: Case.kebab(name),
    classCamel: Case.camel(name),
    filePath: ["", ...parts.slice(0, -1), ""].join("/"),
    mathImport,
  };
}

export function getFilePath(className: string, fileName: string): string {
  const parts = className.split(/[\\/]/g);
  const kparts = parts.map(Case.kebab);
  return path.posix.join("src", ...kparts, fileName);
}

export default class extends Generator<Options> {
  protected constructor(args: string | string[], opts: Options) {
    super(args, opts);
    this.argument("className", {
      description: "the class name of the element",
      required: true,
      type: String,
    });
    this.option("minimal", {
      alias: "m",
      default: false,
      description: "generate only the basics",
      type: Boolean,
    });
  }
  protected writing(): void {
    const context = getContext(this.options.className);

    if (!this.options.minimal) {
      this.fs.copyTpl(
        this.templatePath("element.app.ts.template"),
        this.destinationPath(
          getFilePath(this.options.className, `${context.classKebab}.app.ts`)
        ),
        context
      );
      this.fs.copyTpl(
        this.templatePath("index.html.template"),
        this.destinationPath(getFilePath(this.options.className, "index.html")),
        context
      );
      this.fs.copyTpl(
        this.templatePath("element.scss.template"),
        this.destinationPath(
          getFilePath(this.options.className, `${context.classKebab}.scss`)
        ),
        context
      );
    }

    this.fs.copyTpl(
      this.templatePath("element.element.spec.ts.template"),
      this.destinationPath(
        getFilePath(
          this.options.className,
          `${context.classKebab}.element.spec.ts`
        )
      ),
      context
    );
    this.fs.copyTpl(
      this.templatePath("element.element.ts.template"),
      this.destinationPath(
        getFilePath(this.options.className, `${context.classKebab}.element.ts`)
      ),
      context
    );
  }
}
