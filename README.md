# Accessible Toggle

[![NPM](https://img.shields.io/npm/v/accessible-toggle.svg?style=flat-square)](https://www.npmjs.com/package/accessible-toggle)
[![Travis](https://img.shields.io/travis/elivz/accessible-toggle/master.svg?style=flat-square)](https://travis-ci.org/elivz/accessible-toggle)
[![David](https://img.shields.io/david/elivz/accessible-toggle.svg?style=flat-square)](https://david-dm.org/elivz/accessible-toggle)
![Compressed/Gzipped Size](http://img.badgesize.io/elivz/accessible-toggle/master/dist/accessibleToggle.min.js.svg?compression=gzip&color=blue&style=flat-square)

> Accessible and responsive toggling of an element's visibility. Supports a `media-query` option, which will enable or disable the toggle based on screen size (e.g. for "hamburger" menus that should only be toggleable on small screens).

### Usage

Initialize Accessible Toggle with the _content_ element as the first argument. You may also pass in an optional second argument: an object containing the configuration options ([see below](#configuration)).

```js
import accessibleToggle from 'accessible-toggle';

const toggle = new Toggle(document.getElementById('navigation'), {
  mediaQuery: '(max-width: 600px)',
});
```

The toggle _controls_ should have a `data-toggle` attribute, set to the value of the content element's ID.

```html
<button data-toggle="navigation">Menu</button>
<nav id="navigation">
  ...
</nav>
```

#### Suggested CSS

By itself, this script will only toggle the appropriate ARIA roles, which won't cause any visual change. You need to include the following CSS somewhere in your stylesheet to make the element actually disappear and appear.

```css
[aria-hidden='true'] {
  display: none;
}
```

Of course you can also implement your own styles to provide transition effects, etc.

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

yarn add accessible-toggle

or npm

npm install accessible-toggle

### Configuration

You can pass in extra options as a configuration object. The following options are supported:

#### `trapFocus`

When the panel is open, prevent the user from tabbing out of it. (Default: `true`)

#### `assignFocus`

Set this to true if you want to automatically move focus to the first link or button within the content after is is shown. (Default: `true`)

#### `closeOnEsc`

Allow the user to press the escape key to hide the content. (Default: `true`)
Set this to true if you want to automatically move focus to the first link or button within the content after is is shown. (Default: `true`)

#### `closeOnClickOutside`

Close the panel when the user clicks on any other element on the page. (Default: `false`)

#### `mediaQuery`

If you set a media query (using [standard CSS syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)) the script will be enabled or disabled automatically depending on whether the query matches or not. This is most useful for elements that should be toggleable at certain screen sizes but always visible at others. (Default: none)

#### `onShow`

A callback function that will be triggered when the content is displayed. You may alternately register an event listener for this purpose – see below. (Default: none)

#### `onHide`

A callback function that will be triggered when the content is hidden. You may alternately register an event listener for this purpose – see below. (Default: none)

### Methods

#### `show()`

Show the content programatically.

```js
const toggle = new Toggle(document.getElementById('navigation'));
toggle.show();
```

#### `hide()`

Hide the content programatically.

```js
toggle.hide();
```

#### `toggle([display])`

Toggle the content between hidden and visible. You may optionally pass `true` or `false` to the function to force the content to be shown or hidden.

```js
toggle.toggle();
```

### Events

You may listen for the following custom events on the content element.

#### `toggle-show`

Triggered when the content is switched to its visible state.

#### `toggle-hide`

Triggered when the content is switched to its hidden state.

### Example

```js
import accessibleToggle from 'accessible-toggle';

const navigation = document.getElementById('navigation');
const toggle = new Toggle(navigation, {
  mediaQuery: '(max-width: 600px)',
});

navigation.addEventListener('toggle-show', () => {
  console.log('I am visible now!');
});
```

### Builds

If you don't use a package manager, you can [access `accessible-toggle` via unpkg (CDN)](https://unpkg.com/accessible-toggle/), download the source, or point your package manager to the url.

`accessible-toggle` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0-9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `accessible-toggle` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/accessible-toggle/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/accessible-toggle) on your page. The UMD builds make `accessible-toggle` available as a `window.accessibleToggle` global variable.

### Changelog

The project's history is recorded in the [Changelog](CHANGELOG.md).

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Thanks

This script was inspired by [A11y Toggle](https://github.com/edenspiekermann/a11y-toggle).

The project structure was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
