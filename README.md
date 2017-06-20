# Accessible Toggle

![Node](https://img.shields.io/node/v/accessible-toggle.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/accessible-toggle.svg?style=flat-square)](https://www.npmjs.com/package/accessible-toggle)
[![David](https://img.shields.io/david/elivz/accessible-toggle.svg?style=flat-square)](https://david-dm.org/elivz/accessible-toggle)

> Accessible and responsive toggling of an element's visibility. Supports a `media-query` option, which will enable or disable the toggle based on screen size (e.g. for "hamburger menus" that should only be toggleable on small screens).

### Usage

Initialize Accessible Toggle with the *content* element as the first argument. You may also pass in an optional second argument: an object containing the configuration options ([see below](#configuration)).

```js
import accessibleToggle from 'accessible-toggle';

const toggle = new Toggle(document.getElementById('navigation'), {
  mediaQuery: '(max-width: 600px)',
});
```

#### Suggested CSS

By itself, this script will only toggle the appropriate ARIA roles, which won't cause any visual change. You need to include the following CSS somewhere in your stylesheet to make the element actually disappear and appear.

```css
[aria-hidden="true"] {
  display: none;
}
```

Of course you can also implement your own styles to provide transition effects, etc.

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

  yarn add accessible-toggle (--dev)

or npm

  npm install accessible-toggle (--save-dev)

### Configuration

You can pass in extra options as a configuration object. The following options are supported:

#### `assignFocus`: Set this to true if you want to automatically move focus to the first link or button within the content after is is shown. (Default: `false`)

#### `closeOnEsc`: Allow the user to press the escape key to hide the content. (Default: `true`)

#### `mediaQuery`: If you set a media query (using [standard CSS syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)) the script will be enabled or disabled automatically depending on whether the query matches or not. This is most useful for elements that should be toggleable at certain screen sizes but always visible at others. (Default: none)

### Methods

#### `show`

Show the content programatically.

```js
const toggle = new Toggle(document.getElementById('navigation'));
toggle.show();
```

#### `hide`

Hide the content programatically.

```js
toggle.hide();
```

#### `toggle`

Toggle the content between hidden and visible.

```js
toggle.toggle();
```

### Builds

If you don't use a package manager, you can [access `accessible-toggle` via unpkg (CDN)](https://unpkg.com/accessible-toggle/), download the source, or point your package manager to the url.

`accessible-toggle` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `accessible-toggle` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/accessible-toggle/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/accessible-toggle) on your page. The UMD builds make `accessible-toggle` available as a `window.accessibleToggle` global variable.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Thanks

This script was inspired by [A11y Toggle](https://github.com/edenspiekermann/a11y-toggle).

The project structure was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
