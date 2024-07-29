# generator-web-modules

[![No Maintenance Intended](https://unmaintained.tech/badge.svg)](https://unmaintained.tech/)

[![NPM version][npm-image]][npm-url]

> A Yeoman Generator for creating websites with TypeScript, Sass, ESLint, [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) and [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-web-modules` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-web-modules
```

Then generate your new project:

```bash
mkdir my-project
cd my-project
yo web-modules
```

See `my-project/README.md` for information on working with your new project.

You can add a new web component any time with the subgenerator. A preceeding path is optional. `Element` will be appended to the name given so don't include that yourself.

```bash
yo web-modules:element [optional/path/to/]todo-panel
```

## License

ISC © [Gary Bortosky](https://github.com/GaryB432)

[npm-image]: https://badge.fury.io/js/generator-web-modules.svg
[npm-url]: https://npmjs.org/package/generator-web-modules
