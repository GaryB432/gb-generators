"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const chalk_1 = require("chalk");
/* dummy */
class default_1 extends Generator {
    constructor(args, options) {
        super(args, options);
        // this.argument('packageName', {
        //   description: 'the name of the package (with optional scope)',
        //   required: true,
        //   type: String,
        // });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writing() { }
    // public install(): void {
    //   this.installDependencies({ bower: false, npm: true, yarn: false });
    // }
    end() {
        this.log(`Create a new dummy with ${chalk_1.bold(chalk_1.yellow('yo lerna-typescript:dummy!'))}.`);
    }
}
exports.default = default_1;
