/* eslint-disable sort-keys */
import Generator = require('yeoman-generator');
import { yellow, bold } from 'chalk';

export default class extends Generator {
  constructor(args: string[], options: {}) {
    super(args, options);
  }

  writing(): void {
    this.fs.copy(
      this.templatePath('_eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );
    const pkgJson = {
      scripts: {
        lint:
          'eslint "packages/**/{src,__tests__}/**/*.ts" -f eslint-formatter-friendly',
      },
      devDependencies: {
        '@typescript-eslint/eslint-plugin': '^2.6.1',
        '@typescript-eslint/parser': '^2.6.1',
        eslint: '^6.6.0',
        'eslint-config-prettier': '^6.5.0',
        'eslint-formatter-friendly': '^7.0.0',
        'eslint-plugin-prettier': '^3.1.1',
      },
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  public install(): void {
    this.installDependencies({ bower: false, npm: true, yarn: false });
  }

  public end(): void {
    this.log(
      `add eslint to a package with ${bold(
        yellow('yo lerna-typescript:eslint')
      )}.`
    );
  }
}
