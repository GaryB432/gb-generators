import Generator = require("yeoman-generator");

export default class extends Generator {
  writing(): void {
    const pkgJson = {
      devDependencies: {
        prettier: "^2.0.0",
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
    this.fs.copy(
      this.templatePath("_prettierignore.template"),
      this.destinationPath(".prettierignore")
    );
  }

  install(): void {
    this.npmInstall();
  }
}
