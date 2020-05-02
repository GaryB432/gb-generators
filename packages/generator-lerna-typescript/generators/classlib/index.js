"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const Case = require("case");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("packageName", {
      type: String,
      required: true,
      desc: "the name of the package"
    });
    this.argument("className", {
      type: String,
      required: true,
      desc: "the name of the class"
    });
  }

  writing() {
    const context = {
      packageName: Case.kebab(this.options.packageName),
      className: Case.kebab(this.options.className),
      packageTypeName: Case.pascal(this.options.packageName),
      classTypeName: Case.pascal(this.options.className)
    };
    const pfn = fname => path.join("packages", context.packageName, fname);
    this.fs.copyTpl(
      this.templatePath(`lib.spec.ts.template`),
      this.destinationPath(pfn(`__tests__/${context.className}.spec.ts`)),
      context
    );
    this.fs.copyTpl(
      this.templatePath(`lib.ts.template`),
      this.destinationPath(pfn(`src/${context.className}.ts`)),
      context
    );
  }

  install() {
    this.installDependencies({ npm: true, bower: false, yarn: false });
  }
};
