import Generator = require("yeoman-generator");
import {
  DependencyList,
  ignorePrettierPaths,
  mergeDependencies,
  PackageJsonDef,
} from "../utils";

export default class extends Generator {
  writing(): void {
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
        prettier: "^2.2.1",
      },
      scripts: {
        format: "prettier --write .",
      },
    };
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    this.fs.copy(
      this.templatePath("_prettierrc.template"),
      this.destinationPath(".prettierrc")
    );
    this.fs.write(
      ".prettierignore",
      ignorePrettierPaths(
        mergeDependencies(pkg.dependencies, pkg.devDependencies)
      )
        .map((fn) => `${fn}\n`)
        .join("")
    );
  }

  install(): void {
    this.npmInstall();
  }
}
