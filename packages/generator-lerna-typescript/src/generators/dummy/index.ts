import Generator = require('yeoman-generator');
import { getPackageInfo } from '../../utils';
import { join } from 'path';
import { bold, yellow } from 'chalk';

/* dummy */

export default class extends Generator {
  constructor(args: string[], options: {}) {
    super(args, options);
    // this.argument('packageName', {
    //   description: 'the name of the package (with optional scope)',
    //   required: true,
    //   type: String,
    // });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public writing(): void {}

  // public install(): void {
  //   this.installDependencies({ bower: false, npm: true, yarn: false });
  // }

  public end(): void {
    this.log(
      `Create a new dummy with ${bold(yellow('yo lerna-typescript:dummy!'))}.`
    );
  }
}
