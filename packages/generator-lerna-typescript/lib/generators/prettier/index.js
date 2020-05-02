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
        const pkgJson = {
            scripts: {
                format: `prettier --write "**/*.ts"  "!**/lib/**"`,
            },
            devDependencies: {
                prettier: '^1.19.1',
            },
        };
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.fs.copy(this.templatePath('_prettierrc'), this.destinationPath('.prettierrc'));
    }
    install() {
        this.installDependencies({ bower: false, npm: true, yarn: false });
    }
    end() {
        this.log(`Create a new prettier with ${chalk_1.bold(chalk_1.yellow('yo lerna-typescript:prettier'))}.`);
    }
}
exports.default = default_1;
