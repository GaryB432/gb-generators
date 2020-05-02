"use strict";
const utils = require("../../utils");
const Generator = require("yeoman-generator");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("packageName", {
      type: String,
      required: true,
      desc: "the name of the package",
    });
  }

  writing() {
    const pkgInfo = utils.getPackageInfo(this.options.packageName);
    const context = {
      packageName: pkgInfo.scope
        ? `@${pkgInfo.scope}/${pkgInfo.name}`
        : pkgInfo.name,
      folder: pkgInfo.name,
    };

    const lernaJson = this.fs.readJSON("lerna.json", {
      version: "independent",
    });

    const packageJson = {
      name: context.packageName,
      version:
        lernaJson.version === "independent" ? "0.0.0" : lernaJson.version,
      description: "",
      files: ["lib"],
      private: false,
      main: "lib/index.js",
      typings: "lib/index.d.ts",
      scripts: {
        prepare: "npm run build",
        build: "tsc --pretty",
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        typescript: "^3.7.2",
      },
    };

    const pfn = (fname) => path.join("packages", context.folder, fname);
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
};
