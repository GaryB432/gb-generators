"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  writing() {
    const pkgJson = {
      scripts: {
        format: `prettier --write "**/*.ts"  "!**/lib/**"`,
      },
      devDependencies: {
        prettier: "^1.19.1",
      },
    };

    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    this.fs.copy(
      this.templatePath("_prettierrc"),
      this.destinationPath(".prettierrc")
    );
  }

  install() {
    this.npmInstall();
  }
};
