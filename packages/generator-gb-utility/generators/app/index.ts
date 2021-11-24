import Generator = require("yeoman-generator");
import chalk = require("chalk");

export default class extends Generator {
  protected end(): void {
    this.log(chalk.greenBright("Please use one of the subgenerators."));
  }
}
