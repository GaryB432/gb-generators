import utils = require("../../utils");
import Generator = require("yeoman-generator");
import path = require("path");

interface LernaJson {
  version: string;
}

interface Options {
  packageName: string;
}

export default class extends Generator<Options> {
  constructor(args: string | string[], opts: Options) {
    super(args, opts);
    this.argument("packageName", {
      description: "the name of the package",
      required: true,
      type: String,
    });
  }

  writing(): void {
    const pkgInfo = utils.getPackageInfo(this.options.packageName);
    const context = {
      folder: pkgInfo.name,
      packageName: pkgInfo.scope
        ? `@${pkgInfo.scope}/${pkgInfo.name}`
        : pkgInfo.name,
    };

    const lernaJson = this.fs.readJSON("lerna.json", {
      version: "independent",
    }) as unknown as LernaJson;

    const packageJson = {
      name: context.packageName,
      version:
        lernaJson.version === "independent" ? "0.0.0" : lernaJson.version,
      description: "",
      devDependencies: {
        typescript: "^4.3.5",
      },
      files: ["lib"],
      keywords: [],
      license: "ISC",
      main: "lib/index.js",
      scripts: {
        build: "tsc --pretty",
        prepare: "npm run build",
      },
      typings: "lib/index.d.ts",
    };

    const pfn: (fname: string) => string = (fname) =>
      path.join("packages", context.folder, fname);
    this.fs.copyTpl(
      this.templatePath("__tests__/index.spec.ts.template"),
      this.destinationPath(pfn("__tests__/index.spec.ts")),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/index.ts.template"),
      this.destinationPath(pfn("src/index.ts")),
      context
    );

    this.fs.extendJSON(pfn("package.json"), packageJson);

    this.fs.copyTpl(
      this.templatePath("_tsconfig.json"),
      this.destinationPath(pfn("tsconfig.json")),
      context
    );
  }
}
