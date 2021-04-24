import Generator = require("yeoman-generator");
import chalk = require("chalk");
import Case = require("case");
import path = require("path");

interface Context {
  tbd: boolean;
  appname: string;
  genstamp: string;
}

export default class extends Generator {
  private cwd = path.basename(process.cwd());
  writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
      genstamp: new Date().toString(),
      tbd: false,
    };
    this.fs.copyTpl(this.templatePath("_prettierignore.template"),this.destinationPath(".prettierignore"),context);
    this.fs.copyTpl(this.templatePath("_prettierrc.template"),this.destinationPath(".prettierrc"),context);
    this.fs.copyTpl(this.templatePath(".gitattributes.template"),this.destinationPath(".gitattributes"),context);
    this.fs.copyTpl(this.templatePath("gulpfile.js.template"),this.destinationPath("gulpfile.js"),context);
    this.fs.copyTpl(this.templatePath("package.json.template"),this.destinationPath("package.json"),context);
    this.fs.copyTpl(
      this.templatePath("README.md.template"),
      this.destinationPath("README.md"),
      context
    );
    this.fs.copyTpl(this.templatePath("tsconfig.json.template"),this.destinationPath("tsconfig.json"),context);
    this.fs.copyTpl(this.templatePath("_vscode/settings.json.template"),this.destinationPath(".vscode/settings.json"),context);
    this.fs.copyTpl(this.templatePath("_vscode/tasks.json.template"),this.destinationPath(".vscode/tasks.json"),context);
    this.fs.copyTpl(this.templatePath("assets/index.html.template"),this.destinationPath("assets/index.html"),context);
    this.fs.copyTpl(this.templatePath("assets/manifest.webmanifest.template"),this.destinationPath("assets/manifest.webmanifest"),context);
    this.fs.copyTpl(this.templatePath("assets/web.config.template"),this.destinationPath("assets/web.config"),context);
    this.fs.copyTpl(this.templatePath("assets/img/yeoman-003.png.template"),this.destinationPath("assets/img/yeoman-003.png"),context);
    this.fs.copyTpl(this.templatePath("src/app.ts.template"),this.destinationPath("src/app.ts"),context);
    this.fs.copyTpl(this.templatePath("src/modules/adder.element.spec.ts.template"),this.destinationPath("src/modules/adder.element.spec.ts"),context);
    this.fs.copyTpl(this.templatePath("src/modules/adder.element.ts.template"),this.destinationPath("src/modules/adder.element.ts"),context);
    this.fs.copyTpl(this.templatePath("src/modules/math.spec.ts.template"),this.destinationPath("src/modules/math.spec.ts"),context);
    this.fs.copyTpl(this.templatePath("src/modules/math.ts.template"),this.destinationPath("src/modules/math.ts"),context);
    this.fs.copyTpl(this.templatePath("src/sass/_math.scss.template"),this.destinationPath("src/sass/_math.scss"),context);
    this.fs.copyTpl(this.templatePath("src/sass/_star.scss.template"),this.destinationPath("src/sass/_star.scss"),context);
    this.fs.copyTpl(this.templatePath("src/sass/styles.scss.template"),this.destinationPath("src/sass/styles.scss"),context);
  }
  end(): void {
    this.log(chalk.whiteBright("Generator is coming soon!"));
  }
}
