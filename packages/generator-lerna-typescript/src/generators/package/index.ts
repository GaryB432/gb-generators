/* eslint-disable sort-keys */
import Generator = require('yeoman-generator');
import { getPackageInfo } from '../../utils';
import { join } from 'path';
import { green } from 'chalk';

const independent = 'independent';

export default class extends Generator {
  constructor(args: string[], options: {}) {
    super(args, options);
    this.argument('packageName', {
      description: 'the name of the package (with optional scope)',
      required: true,
      type: String,
    });
  }
  public writing(): void {
    const pkgInfo = getPackageInfo(this.options.packageName);
    const context = {
      packageName: pkgInfo.scope
        ? `@${pkgInfo.scope}/${pkgInfo.name}`
        : pkgInfo.name,
      folder: pkgInfo.name,
    };

    const lernaJson = this.fs.readJSON('lerna.json', {
      version: independent,
    });

    const packageJson = {
      name: context.packageName,
      version: lernaJson.version === independent ? '0.0.0' : lernaJson.version,
      description: '',
      files: ['lib'],
      private: false,
      main: 'lib/index.js',
      typings: 'lib/index.d.ts',
      scripts: {
        prepare: 'npm run build',
        build: 'tsc --pretty',
      },
      keywords: [],
      author: '',
      license: 'ISC',
      devDependencies: {
        typescript: '^3.7.2',
      },
    };

    const pfn = (fname: string): string =>
      join('packages', context.folder, fname);

    this.fs.copyTpl(
      this.templatePath('__tests__/index.spec.ts.template'),
      this.destinationPath(pfn('__tests__/index.spec.ts')),
      context
    );
    this.fs.copyTpl(
      this.templatePath('src/index.ts.template'),
      this.destinationPath(pfn('src/index.ts')),
      context
    );

    this.fs.extendJSON(pfn('package.json'), packageJson);

    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath(pfn('tsconfig.json')),
      context
    );
  }

  public install(): void {
    this.installDependencies({ bower: false, npm: true, yarn: false });
  }

  public end(): void {
    this.log(
      `Create a new package with ${green(
        'yo lerna-typescript:package @my-scope/my-new-package'
      )}.`
    );
  }
}
