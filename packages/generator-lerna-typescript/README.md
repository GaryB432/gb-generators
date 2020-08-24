# generator-lerna-typescript

[![NPM version][npm-image]][npm-url] 

> Get started with Lerna using TypeScript

## Installation

First, install [Yeoman](http://yeoman.io) and generator-lerna-typescript using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-lerna-typescript
```

Then generate your new project:

```bash
mkdir my-project
cd my-project
yo lerna-typescript
```

Your project will be generated with a sample package. Generate another new package whenever you want with:

```bash
yo lerna-typescript:package @myscope/my-new-package
```

Build your project:

```bash
node_modules/.bin/lerna run build
```

Test your project:

```bash
npm test
```

## License

ISC © [Gary Bortosky]()

[npm-image]: https://badge.fury.io/js/generator-lerna-typescript.svg
[npm-url]: https://npmjs.org/package/generator-lerna-typescript
