export interface DependencyList {
  [name: string]: string;
}

export interface PackageJsonDef {
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

export function ignorePrettierPaths(deps: DependencyList): string[] {
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

export function lintGlob(deps: DependencyList): string {
  return deps.lerna
    ? "packages/**/{src,__tests__}/**/*.ts"
    : "{src/scripts,test}/**/*.ts";
}