/* eslint-disable sort-keys */
import Generator = require('yeoman-generator');
import { Answers } from 'inquirer';
import { basename } from 'path';
import { red, green } from 'chalk';
import yosay = require('yosay');
import { kebab } from 'case';

export default class App extends Generator {
  private answers: Answers = {};
  private cwd: string = basename(process.cwd());
  constructor(args: string | string[], options: {}) {
    super(args, options);
  }
  public async prompting(): Promise<void> {
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'independent',
        message: 'Version packages independently?',
        default: false,
      },
    ]);
  }

  public initializing(): void {
    this.log(yosay(`Welcome to the rad ${red('lerna-typescript')} generator!`));

    this.composeWith(require.resolve('../package'), {
      arguments: ['@myscope/greeter'],
    });
    this.composeWith(require.resolve('../prettier'), []);
    this.composeWith(require.resolve('../eslint'), []);
  }

  public writing(): void {
    const context = {
      appname: kebab(this.cwd),
    };
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('jest.config.js.template'),
      this.destinationPath('jest.config.js')
    );

    const lernaJson = {
      packages: ['packages/*', 'tools/*'],
      version: this.answers.independent ? 'independent' : '0.0.0',
    };

    this.fs.extendJSON(this.destinationPath('lerna.json'), lernaJson);

    this.fs.copy(
      this.templatePath('_travis.yml'),
      this.destinationPath('.travis.yml')
    );
    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      context
    );
    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
  }

  public install(): void {
    this.installDependencies({ npm: true, bower: false, yarn: false });
  }
}
