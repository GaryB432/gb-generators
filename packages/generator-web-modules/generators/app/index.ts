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
  protected writing(): void {
    const context: Context = {
      appname: Case.kebab(this.cwd),
      genstamp: new Date().toString(),
      tbd: false,
    };
    this.composeWith(require.resolve("../pipeline"), {});
    this.composeWith(require.resolve("../element"), { arguments: ["Adder"] });
    this.composeWith(
      require.resolve("generator-gb-utility/generators/prettier"),
      {}
    );
    this.composeWith(
      require.resolve("generator-gb-utility/generators/eslint"),
      { browser: true, node: false, eslintConfig: true }
    );
    this.fs.copyTpl(
      this.templatePath(".gitattributes.template"),
      this.destinationPath(".gitattributes"),
      context
    );
    this.fs.copyTpl(
      this.templatePath(".gitignore.template"),
      this.destinationPath(".gitignore"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("gulpfile.js.template"),
      this.destinationPath("gulpfile.js"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("package.json.template"),
      this.destinationPath("package.json"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("jest.config.js.template"),
      this.destinationPath("jest.config.js"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("README.md.template"),
      this.destinationPath("README.md"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("tsconfig.eslint.json.template"),
      this.destinationPath("tsconfig.eslint.json"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("tsconfig.json.template"),
      this.destinationPath("tsconfig.json"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("_vscode/settings.json.template"),
      this.destinationPath(".vscode/settings.json"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("_vscode/tasks.json.template"),
      this.destinationPath(".vscode/tasks.json"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/index.html.template"),
      this.destinationPath("src/index.html"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("assets/manifest.webmanifest.template"),
      this.destinationPath("assets/manifest.webmanifest"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("assets/web.config.template"),
      this.destinationPath("assets/web.config"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("assets/img/yeoman-003.png.template"),
      this.destinationPath("assets/img/yeoman-003.png"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/app/app.ts.template"),
      this.destinationPath("src/app/app.ts"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/app/math.spec.ts.template"),
      this.destinationPath("src/app/math.spec.ts"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/app/math.ts.template"),
      this.destinationPath("src/app/math.ts"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/app/_star.scss.template"),
      this.destinationPath("src/app/_star.scss"),
      context
    );
    this.fs.copyTpl(
      this.templatePath("src/app/app.scss.template"),
      this.destinationPath("src/app/app.scss"),
      context
    );
  }
  protected end(): void {
    this.log(
      chalk.whiteBright(
        `See ${chalk.greenBright(
          "README.md"
        )} for information on working with your new project.`
      )
    );
  }
}
