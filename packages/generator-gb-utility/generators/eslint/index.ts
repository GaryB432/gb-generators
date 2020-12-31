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
      this.destinationPath(".eslintrc.json")
    );
    const dependencies: DependencyList = {};
    const devDependencies: DependencyList = {};
    const pkg: PackageJsonDef = this.fs.readJSON(
      this.destinationPath("package.json"),
      {
        dependencies,
        devDependencies,
      }
    );
    const pkgJson: Partial<PackageJsonDef> = {
      devDependencies: {
        "@typescript-eslint/eslint-plugin": "^2.6.1",
        "@typescript-eslint/parser": "^2.6.1",
        eslint: "^6.6.0",
        "eslint-config-prettier": "^6.5.0",
        "eslint-formatter-friendly": "^7.0.0",
        "eslint-plugin-prettier": "^3.1.1",
      },
      scripts: {
        lint: [
          "eslint",
          `"${lintGlob(
            mergeDependencies(pkg.dependencies, pkg.devDependencies)
          )}"`,
          "-f eslint-formatter-friendly",
        ].join(" "),
      },
    };

    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }

  install(): void {
    this.npmInstall();
  }
}
