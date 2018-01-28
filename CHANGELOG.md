# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.2.1

### Improved

* Correctly handle control buttons containing child elements

## 1.2.0

### Added

* `trapFocus` option to prevent the user from tabbing out of the content panel while it is open
* `closeOnClickOutside` option to close the panel if the user clicks on any other part of the page
* Use `data-toggle-open` attribute on content element to make the panel open by default
* A [simple example page](https://github.com/elivz/accessible-toggle/blob/master/examples/index.html)

### Improved

* Prevent elements within the content panel from receiving focus when the panel is hidden
* Include more potentially-focusable elements when assigning focus
* Bind event listeners to the document for better handling of edge-cases

## 1.1.5 - 2017-12-12

### Fixed

* Prevent the class from overwriting the default options when initialized

## 1.1.4 - 2017-11-13

### Improved

* Replaced "frame-throttle" with "raf-throttle" library

## 1.1.3 - 2017-10-15

### Improved

* Updated dependencies

## 1.1.2 - 2017-08-08

### Fixed

* Bound `this` to resize handler function

## 1.1.1 - 2017-08-08

### Fixed

* Missing dependency in package.json

## 1.1.0 - 2017-08-08

### Fixed

* Fix window resize handling

### Improved

* Use [frame-throttle](https://github.com/pelotoncycle/frame-throttle) for more
  performant resize throttling

## 1.0.0 - 2017-07-14

* Bump version number to 1.0

## 0.5.0 - 2017-06-19

### Added

* First public release
