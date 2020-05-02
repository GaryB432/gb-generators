"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable sort-keys */
const Generator = require("yeoman-generator");
const path_1 = require("path");
const chalk_1 = require("chalk");
const yosay = require("yosay");
const case_1 = require("case");
class App extends Generator {
    constructor(args, options) {
        super(args, options);
        this.answers = {};
        this.cwd = path_1.basename(process.cwd());
    }
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'confirm',
                name: 'independent',
                message: 'Version packages independently?',
                default: false,
            },
        ]);
    }
    initializing() {
        this.log(yosay(`Welcome to the rad ${chalk_1.red('lerna-typescript')} generator!`));
        this.composeWith(require.resolve('../package'), {
            arguments: ['@myscope/greeter'],
        });
        this.composeWith(require.resolve('../prettier'), []);
        this.composeWith(require.resolve('../eslint'), []);
    }
    writing() {
        const context = {
            appname: case_1.kebab(this.cwd),
        };
        this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('jest.config.js.template'), this.destinationPath('jest.config.js'));
        const lernaJson = {
            packages: ['packages/*', 'tools/*'],
            version: this.answers.independent ? 'independent' : '0.0.0',
        };
        this.fs.extendJSON(this.destinationPath('lerna.json'), lernaJson);
        this.fs.copy(this.templatePath('_travis.yml'), this.destinationPath('.travis.yml'));
        this.fs.copy(this.templatePath('_package.json'), this.destinationPath('package.json'));
        this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), context);
        this.fs.copy(this.templatePath('_tsconfig.json'), this.destinationPath('tsconfig.json'));
    }
    install() {
        this.installDependencies({ npm: true, bower: false, yarn: false });
    }
}
exports.default = App;
