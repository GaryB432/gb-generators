import Generator = require("yeoman-generator");
import {
  DependencyList,
  ignorePrettierPaths,
  mergeDependencies,
  PackageJsonDef,
} from "../../util";

export default class extends Generator {
  protected writing(): void {
    const dependencies: DependencyList = {};
    const devDependencies: DependencyList = {};
    const pkg: PackageJsonDef = this.fs.readJSON(
      this.destinationPath("package.json"),
      {
        dependencies,
        devDependencies,
      }
    ) as unknown as PackageJsonDef;
    const pkgJson: Partial<PackageJsonDef> = {
      devDependencies: {
        prettier: "^2.3.2",
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
}
