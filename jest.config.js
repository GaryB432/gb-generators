const base = require("./jest.config.base.js");

module.exports = {
    ...base,
    projectsx:
    [
        "<rootDir>/packages/*/jest.config.js"
    ],
    coverageDirectory: "<rootDir>/coverage/"
};