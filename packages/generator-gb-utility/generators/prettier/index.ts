import Generator = require("yeoman-generator");

interface DependencyList {
  [name: string]: string;
}

interface PackageJsonDef {
  dependencies: DependencyList;
  devDependencies: DependencyList;
  scripts: DependencyList;
}

export function mergeDependencies(...deps: DependencyList[]): DependencyList {
  const merged = {};
  for (const d of deps) {
    Object.assign(merged, d);
  }
  return merged;
}

export function ignorePaths(deps: DependencyList): string[] {
  const ignore: string[] = [];
  if (deps.lerna) {
    ignore.push(
      "packages/**/lib",
      "package*.json",
      "!packages/**/package.json"
    );
  }
  if (deps.webpack) {
    ignore.push("dist", "img", "package*.json");
  }
  return ignore;
}

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
    const pkgJson : Partial< PackageJsonDef> = {
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
      ignorePaths(mergeDependencies(pkg.dependencies, pkg.devDependencies))
        .map((fn) => `${fn}\n`)
        .join("")
    );
  }

  install(): void {
    this.npmInstall();
  }
}
