# generator-webpack-ts

[![NPM version][npm-image]][npm-url]

> A Yeoman Generator for creating websites with TypeScript, Sass, ESLint and Webpack 5

## Installation

First, install [Yeoman](http://yeoman.io) and generator-webpack-ts using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-webpack-ts
```

Then generate your new project:

```bash
mkdir my-project
cd my-project
yo webpack-ts
```

The generator will prompt if you want to include the [Workbox](https://developers.google.com/web/tools/workbox/) service worker helper.

See `my-project/README.md` for information on working with your new project.

## Subgenerator: classlib

You can add new classes any time with the subgenerator. Add the `--skip-styles` flag to skip generating the SCSS file when it is not desired.
Add the `--element` flag to generate a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). `Element` will be appended to the class name you supply.

```bash
yo webpack-ts:classlib [optional/path/]another-greeter [--skip-styles] [--element]
```

Build your project:

```bash
npm run build
```

Test your project:

```bash
npm test
```

## License

ISC © [Gary Bortosky](https://github.com/GaryB432)

[npm-image]: https://badge.fury.io/js/generator-webpack-ts.svg
[npm-url]: https://npmjs.org/package/generator-webpack-ts
