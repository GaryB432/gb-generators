import Generator = require("yeoman-generator");
import {
  DependencyList,
  lintGlob,
  mergeDependencies,
  PackageJsonDef,
} from "../../util";

export default class extends Generator {
  writing(): void {
    this.fs.copy(
      this.templatePath("eslintignore.template"),
      this.destinationPath(".eslintignore")
    );
    this.fs.copy(
      this.templatePath("eslintrc.json.template"),
      this.destinationPath(".eslintrc.js")
    );
    const dependencies: DependencyList = {};
    const devDependencies: DependencyList = {};
    const pkg: PackageJsonDef = this.fs.readJSON(
      this.destinationPath("package.json"),
      {
        dependencies,
        devDependencies,
      }
    ) as PackageJsonDef;
    const pkgJson: Partial<PackageJsonDef> = {
      devDependencies: {
        "@typescript-eslint/eslint-plugin": "^4.14.2",
        "@typescript-eslint/parser": "^4.14.2",
        eslint: "^7.19.0",
        "eslint-config-prettier": "^7.2.0",
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

  install(): void {
    this.npmInstall();
  }
}
