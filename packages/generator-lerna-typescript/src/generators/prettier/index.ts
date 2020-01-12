/* eslint-disable sort-keys */
import Generator = require('yeoman-generator');
import { bold, yellow } from 'chalk';

export default class extends Generator {
  constructor(args: string[], options: {}) {
    super(args, options);
  }

  writing(): void {
    const pkgJson = {
      scripts: {
        format: `prettier --write "**/*.ts"  "!**/lib/**"`,
      },
      devDependencies: {
        prettier: '^1.19.1',
      },
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.fs.copy(
      this.templatePath('_prettierrc'),
      this.destinationPath('.prettierrc')
    );
  }

  public install(): void {
    this.installDependencies({ bower: false, npm: true, yarn: false });
  }

  public end(): void {
    this.log(
      `Create a new prettier with ${bold(
        yellow('yo lerna-typescript:prettier')
      )}.`
    );
  }
}
