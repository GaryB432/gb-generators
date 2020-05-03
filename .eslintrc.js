"use strict";

module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": 1,
    "sort-keys": 1,
    indent: 0,
  },
  env: {
    browser: true,
    node: true,
  },
};
