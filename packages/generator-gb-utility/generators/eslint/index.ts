import Generator = require("yeoman-generator");
import {
  DependencyList,
  lintGlob,
  mergeDependencies,
  PackageJsonDef,
} from "../../util";

interface Options {
  browser: boolean;
  eslintConfig: boolean;
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
    this.option("eslintConfig", {
      description: "Use eslint tsconfig for parserOptions",
      default: false,
      type: Boolean,
    });
  }

  writing(): void {
    const { browser, node, eslintConfig } = this.options;
    this.fs.copy(
      this.templatePath("eslintignore.template"),
      this.destinationPath(".eslintignore")
    );
    this.fs.copyTpl(
      this.templatePath("eslintrc.js.template"),
      this.destinationPath(".eslintrc.js"),
      { browser, node, eslintConfig }
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
        "@typescript-eslint/eslint-plugin": "^4.29.1",
        "@typescript-eslint/parser": "^4.29.1",
        eslint: "^7.32.0",
        "eslint-config-prettier": "^8.3.0",
        "eslint-plugin-prettier": "^3.4.0",
        "eslint-plugin-jest": "^24.4.0",
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
