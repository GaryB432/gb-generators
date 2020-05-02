"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable sort-keys */
const Generator = require("yeoman-generator");
const chalk_1 = require("chalk");
class default_1 extends Generator {
    constructor(args, options) {
        super(args, options);
    }
    writing() {
        this.fs.copy(this.templatePath('_eslintrc.js'), this.destinationPath('.eslintrc.js'));
        const pkgJson = {
            scripts: {
                lint: 'eslint "packages/**/{src,__tests__}/**/*.ts" -f eslint-formatter-friendly',
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
    install() {
        this.installDependencies({ bower: false, npm: true, yarn: false });
    }
    end() {
        this.log(`add eslint to a package with ${chalk_1.bold(chalk_1.yellow('yo lerna-typescript:eslint'))}.`);
    }
}
exports.default = default_1;
