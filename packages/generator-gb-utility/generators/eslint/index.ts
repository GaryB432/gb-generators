import Generator = require("yeoman-generator");
import {
  DependencyList,
  lintGlob,
  mergeDependencies,
  PackageJsonDef,
} from "../../util";

interface Options {
  browser: boolean;
  node: boolean;
}

export default class extends Generator<Options> {
  constructor(args: string | string[], opts: Options) {
    super(args, opts);

    this.option("browser", {
      description: "Use browser environment",
      default: false,
      type: Boolean,
    });
    this.option("node", {
      description: "Use node environment",
      default: false,
      type: Boolean,
    });
  }

  writing(): void {
    const { browser, node } = this.options;
    this.fs.copy(
      this.templatePath("eslintignore.template"),
      this.destinationPath(".eslintignore")
    );
    this.fs.copyTpl(
      this.templatePath("eslintrc.js.template"),
      this.destinationPath(".eslintrc.js"),
      { browser, node }
    );
    const dependencies: DependencyList = {};
    const devDependencies: DependencyList = {};
    const pkg: PackageJsonDef = (this.fs.readJSON(
      this.destinationPath("package.json"),
      {
        dependencies,
        devDependencies,
      }
    ) as unknown) as PackageJsonDef;
    const pkgJson: Partial<PackageJsonDef> = {
      devDependencies: {
        "@typescript-eslint/eslint-plugin": "^4.20.0",
        "@typescript-eslint/parser": "^4.20.0",
        eslint: "^7.23.0",
        "eslint-config-prettier": "^8.1.0",
        "eslint-plugin-prettier": "^3.3.1",
      },
      scripts: {
        lint: [
          "eslint",
          `"${lintGlob(
            mergeDependencies(pkg.dependencies, pkg.devDependencies)
          )}"`,
        ].join(" "),
      },
    };

    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }
}
