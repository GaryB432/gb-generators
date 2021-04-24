import Generator = require("yeoman-generator");
import chalk = require("chalk");
import Case = require("case");
import { PackageJsonDef } from "generator-gb-utility/util";

interface Options {
  className: string;
  library: "jest" | "karma" | "none";
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
    this.argument("className", {
      description: "the name of the class",
      required: true,
      type: String,
    });
  }

  writing(): void {
    type TestDependencies = {
      karma?: "OK";
      jest?: "OK";
      none?: "OK";
    };

    const classNameInput = this.options.className as string;
    const nameParts = classNameInput.split("/");
    const devDependencies: TestDependencies = { [this.options.library]: "OK" };
    const pkg = (this.fs.readJSON(this.destinationPath("package.json"), {
      devDependencies,
    }) as unknown) as PackageJsonDef;

    const isKarma = pkg.devDependencies.karma;
    const specPath = isKarma ? "__tests__/specs" : "test";
    const srcImportPathParts = [
      ...Array<string>(nameParts.length + (isKarma ? 1 : 0)).fill(".."),
      "src",
      "scripts",
      ...nameParts.map((p) => Case.kebab(p)),
    ];
    const context = {
      classFileName: nameParts.map((p) => Case.kebab(p)).join("/"),
      className: Case.camel(nameParts[nameParts.length - 1]),
      classTypeName: Case.pascal(nameParts[nameParts.length - 1]),
      genstamp: new Date().toString(),
      srcImportPath: srcImportPathParts.join("/"),
    };
    this.fs.copyTpl(
      this.templatePath(`${specPath}/blueprint.spec.ts.template`),
      this.destinationPath(`${specPath}/${context.classFileName}.spec.ts`),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/scripts/blueprint.ts.template"),
      this.destinationPath(`src/scripts/${context.classFileName}.ts`),
      context
    );
    if (!this.options.skipStyles) {
      this.fs.copyTpl(
        this.templatePath("src/styles/blueprint.scss.template"),
        this.destinationPath(`src/styles/${context.classFileName}.scss`),
        context
      );
    }
  }
}
