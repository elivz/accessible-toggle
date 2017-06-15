# accessible-toggle

![Node](https://img.shields.io/node/v/accessible-toggle.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/accessible-toggle.svg?style=flat-square)](https://www.npmjs.com/package/accessible-toggle)
[![Travis](https://img.shields.io/travis/elivz/accessible-toggle/master.svg?style=flat-square)](https://travis-ci.org/elivz/accessible-toggle)
[![David](https://img.shields.io/david/elivz/accessible-toggle.svg?style=flat-square)](https://david-dm.org/elivz/accessible-toggle)
[![Coverage Status](https://img.shields.io/coveralls/elivz/accessible-toggle.svg?style=flat-square)](https://coveralls.io/github/elivz/accessible-toggle)

> Accessible and responsive toggling of an element&#39;s visibility

### Usage

```js
import accessibleToggle from 'accessible-toggle';

```

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

	yarn add accessible-toggle (--dev)

or npm

	npm install accessible-toggle (--save-dev)


### configuration

You can pass in extra options as a configuration object (➕ required, ➖ optional, ✏️ default).

```js
import accessibleToggle from 'accessible-toggle';

```

➖ **property** ( type ) ` ✏️ default `
<br/> 📝 description
<br/> ❗️ warning
<br/> ℹ️ info
<br/> 💡 example

### methods

#### #name

```js
accessibleToggle

```

### Examples

See [`example`](example/script.js) folder or the [runkit](https://runkit.com/elivz/accessible-toggle) example.

### Builds

If you don't use a package manager, you can [access `accessible-toggle` via unpkg (CDN)](https://unpkg.com/accessible-toggle/), download the source, or point your package manager to the url.

`accessible-toggle` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `accessible-toggle` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/accessible-toggle/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/accessible-toggle) on your page. The UMD builds make `accessible-toggle` available as a `window.accessibleToggle` global variable.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
