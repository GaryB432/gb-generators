import Generator = require("yeoman-generator");
import Case = require("case");

interface Options {
  className: string;
  element: boolean;
  skipStyles: boolean;
}

export default class extends Generator<Options> {
  constructor(args: string | string[], opts: Options) {
    super(args, opts);
    this.option("skip-styles", {
      default: false,
      description: "Do not generate style definitions",
      type: Boolean,
    });
    this.option("element", {
      default: false,
      description: "Generate a custom web element",
      type: Boolean,
    });
    this.argument("className", {
      description: "the name of the class",
      required: true,
      type: String,
    });
  }

  _elementTagName(className: string): string {
    const k = Case.kebab(className);
    return k.indexOf("-") < 0 ? `app-${k}` : k;
  }

  writing(): void {
    const classNameInput = this.options.className as string;
    const nameParts = classNameInput.split("/");
    const kind = this.options.element ? "element" : "class";
    const srcImportPathParts = [
      ...Array<string>(nameParts.length).fill(".."),
      "src",
      "scripts",
      ...nameParts.map((p) => Case.kebab(p)),
    ];
    const context = {
      classFileName: nameParts.map((p) => Case.kebab(p)).join("/"),
      className: Case.camel(nameParts[nameParts.length - 1]),
      classTypeName: Case.pascal(nameParts[nameParts.length - 1]),
      classTagName: this._elementTagName(nameParts[nameParts.length - 1]),
      genstamp: new Date().toString(),
      srcImportPath: srcImportPathParts.join("/"),
    };
    this.fs.copyTpl(
      this.templatePath(`${kind}/test/spec.ts.template`),
      this.destinationPath(`test/${context.classFileName}.spec.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath(`${kind}/src/scripts/ts.template`),
      this.destinationPath(`src/scripts/${context.classFileName}.ts`),
      context
    );
    if (!this.options.skipStyles && kind === "class") {
      this.fs.copyTpl(
        this.templatePath(`${kind}/src/styles/scss.template`),
        this.destinationPath(`src/styles/${context.classFileName}.scss`),
        context
      );
    }
  }
}
