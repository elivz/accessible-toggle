(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.accessibleToggle = factory());
}(this, (function () { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var rafThrottle_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
var rafThrottle = function rafThrottle(callback) {
  var requestId = void 0;

  var later = function later(context, args) {
    return function () {
      requestId = null;
      callback.apply(context, args);
    };
  };

  var throttled = function throttled() {
    if (requestId === null || requestId === undefined) {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      requestId = requestAnimationFrame(later(this, args));
    }
  };

  throttled.cancel = function () {
    return cancelAnimationFrame(requestId);
  };

  return throttled;
};

exports.default = rafThrottle;
});

var throttle = unwrapExports(rafThrottle_1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Defaults for the user-configurable options
 *
 * @type {Object}
 */
var defaultOptions = {
  trapFocus: true,
  assignFocus: true,
  closeOnEsc: true,
  closeOnClickOutside: false,
  mediaQuery: false,
  onShow: function onShow() {},
  onHide: function onHide() {}
};

/**
 * Elements that can receive tab focus
 * (cribbed from https://github.com/edenspiekermann/a11y-dialog)
 */
var focusable = ['a[href]:not([tabindex^="-"]):not([inert])', 'area[href]:not([tabindex^="-"]):not([inert])', 'input:not([disabled]):not([inert])', 'select:not([disabled]):not([inert])', 'textarea:not([disabled]):not([inert])', 'button:not([disabled]):not([inert])', 'iframe:not([tabindex^="-"]):not([inert])', '[contenteditable]:not([tabindex^="-"]):not([inert])', '[tabindex]:not([tabindex^="-"]):not([inert])'];

var keyCodes = {
  tab: 9,
  esc: 27
};

/**
 * Helper that converts the result of querySelectorAll to a plain array
 *
 * @param {string} selector
 * @param {element} context to query
 * @return {array}
 */
function $$(selector, context) {
  var elementList = (context || document).querySelectorAll(selector);
  return Array.prototype.slice.call(elementList);
}

var AccessibleToggle = function () {
  /**
   * Constructor – stores references to all the DOM elements
   *               and runs the "setup" function
   *
   * @param  {Element}  element   The toggleable content element
   * @param  {Object}   options   Configurable options
   * @return {null}
   */
  function AccessibleToggle(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, AccessibleToggle);

    if (!element || !(element instanceof HTMLElement)) {
      console.warn('Toggle: first parameter must by an HTML element.');
      return;
    }

    this.content = element;
    this.id = element.id;
    this.buttons = $$('[data-toggle=\'' + this.id + '\']');
    this.focusableChildren = this.getFocusableChildElements();
    this.options = Object.assign({}, defaultOptions, options);

    if (this.buttons.length < 1) {
      console.warn('Toggle: there are no buttons that control the toggleable element.');
      return;
    }

    // Start things off
    if (this.options.mediaQuery === false) {
      // No media query – go ahead and run everything as normal
      this.setup();
    } else {
      // Check if it should be setup now, and again every time the window is resized
      this.testMediaQuery();
      window.addEventListener('resize', throttle(this.testMediaQuery.bind(this)));
    }
  }

  /**
   * Adds ARIA roles to all the elements and attaches event handler
   *
   * @return {null}
   */


  AccessibleToggle.prototype.setup = function setup() {
    var _this = this;

    if (!this.active) {
      this.boundClickHandler = this.clickHandler.bind(this);
      this.boundKeypressHandler = this.keypressHandler.bind(this);

      document.addEventListener('keydown', this.boundKeypressHandler);
      document.addEventListener('click', this.boundClickHandler);

      // Toggleable content properties
      this.content.setAttribute('aria-labelledby', this.id + '-control-0');

      // Button properties
      this.buttons.forEach(function (button, index) {
        button.setAttribute('aria-controls', _this.id);
        button.setAttribute('id', _this.id + '-control-' + index);
      });

      if (this.content.hasAttribute('data-toggle-open')) {
        this.show();
      } else {
        this.hide();
      }
    }

    this.active = true;
  };

  /**
   * Removes all ARIA roles
   *
   * @return {null}
   */


  AccessibleToggle.prototype.teardown = function teardown() {
    if (this.active) {
      document.removeEventListener('click', this.boundClickHandler);
      document.removeEventListener('keyup', this.boundKeyupHandler);

      // Button properties
      this.buttons.forEach(function (button) {
        button.removeAttribute('aria-label');
        button.removeAttribute('aria-expanded');
        button.removeAttribute('aria-controls');
        button.removeAttribute('id');
      });

      // Toggleable content properties
      this.content.removeAttribute('aria-hidden');
      this.content.removeAttribute('aria-labelledby');

      // Reset child element tabindexes
      this.focusableChildren.forEach(function (element) {
        if (element.hasAttribute('data-toggle-tabindex')) {
          element.setAttribute('tabindex', element.getAttribute('data-toggle-tabindex'));
          element.removeAttribute('data-toggle-tabindex');
        } else {
          element.removeAttribute('tabindex');
        }
      });

      this.active = false;
    }
  };

  /**
   * Toggles the script on and off based on a media query
   *
   * @return {null}
   */


  AccessibleToggle.prototype.testMediaQuery = function testMediaQuery() {
    if (this.options.mediaQuery && window.matchMedia(this.options.mediaQuery).matches) {
      this.setup();
    } else {
      this.teardown();
    }
  };

  /**
   * Test if the content panel is currently visible
   */


  AccessibleToggle.prototype.isOpen = function isOpen() {
    return this.content.getAttribute('aria-hidden') !== 'true';
  };

  /**
   * Show the content
   *
   * @return {class}  The accessible-toggle class
   */


  AccessibleToggle.prototype.show = function show() {
    // Set ARIA attributes
    this.content.setAttribute('aria-hidden', 'false');
    this.buttons.forEach(function (button) {
      button.setAttribute('aria-expanded', 'true');
    });

    // Allow child elements to receive focus
    this.focusableChildren.forEach(function (element) {
      if (element.hasAttribute('data-toggle-tabindex')) {
        element.setAttribute('tabindex', element.getAttribute('data-toggle-tabindex'));
      } else {
        element.removeAttribute('tabindex');
      }
    });

    // Set focus on first focusable item
    if (this.options.assignFocus) {
      var toFocus = this.content.querySelector('[autofocus]') || this.focusableChildren[0];

      if (toFocus) {
        toFocus.focus();
      }
    }

    // Trigger callback
    if (typeof this.options.onShow === 'function') {
      this.options.onShow();
    }

    // Fire custom event
    var event = new Event('toggle-show');
    this.content.dispatchEvent(event);

    return this;
  };

  /**
   * Hide the content
   *
   * @return {class}  The accessible-toggle class
   */


  AccessibleToggle.prototype.hide = function hide() {
    // Set ARIA attributes
    this.content.setAttribute('aria-hidden', 'true');
    this.buttons.forEach(function (button) {
      button.setAttribute('aria-expanded', 'false');
    });

    // Remove child elements from the tab order
    this.focusableChildren.forEach(function (element) {
      var oldTabIndex = element.getAttribute('tabindex');
      if (oldTabIndex) {
        element.setAttribute('data-toggle-tabindex', oldTabIndex);
      }

      element.setAttribute('tabindex', '-1');
    });

    // Trigger callback
    if (typeof this.options.onShow === 'function') {
      this.options.onHide();
    }

    // Fire custom event
    var event = new Event('toggle-hide');
    this.content.dispatchEvent(event);

    return this;
  };

  /**
   * Toggles visibility and ARIA roles
   *
   * @param  {bool}   display   True to show the content, false to hide it
   * @return {class}  The accessible-toggle class
   */


  AccessibleToggle.prototype.toggle = function toggle(display) {
    if (typeof display === 'undefined') {
      display = !this.isOpen();
    }

    if (display) {
      this.show();
    } else {
      this.hide();
    }

    return this;
  };

  /**
   * Handle clicks
   *
   * @param  {event}
   * @return {null}
   */


  AccessibleToggle.prototype.clickHandler = function clickHandler(event) {
    // If the click was on one of the control buttons, or a
    // child element of a control button, toggle visibility
    var element = event.target;
    while (element && element.nodeType === 1) {
      if (this.buttons.indexOf(element) >= 0) {
        event.preventDefault();
        this.toggle();
        return;
      }
      element = element.parentNode;
    }

    // If the content is visible and the user clicks outside
    // of it, close the content
    if (this.options.closeOnClickOutside && this.isOpen() && this.content !== event.target && !this.content.contains(event.target)) {
      event.preventDefault();
      this.hide();
      return;
    }
  };

  /**
   * Handle keypresses
   *
   * @param  {event}
   * @return {null}
   */


  AccessibleToggle.prototype.keypressHandler = function keypressHandler(event) {
    // Is ESC key?
    if (this.options.closeOnEsc && this.isOpen() && event.which === keyCodes.esc) {
      event.preventDefault();
      this.hide();
      this.buttons[0].focus();
    }

    // Tab key?
    if (this.options.trapFocus && event.which === keyCodes.tab) {
      this.trapFocus(event);
    }
  };

  /**
   * Get all focusable child elements of the given element
   *
   * @return {aray}
   */


  AccessibleToggle.prototype.getFocusableChildElements = function getFocusableChildElements() {
    return $$(focusable.join(','), this.content).filter(function (child) {
      return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
    });
  };

  /**
   * Trap tab focus inside the given element
   *
   * @param {Event} event
   */


  AccessibleToggle.prototype.trapFocus = function trapFocus(event) {
    if (this.focusableChildren.length > 0) {
      var focusedItemIndex = this.focusableChildren.indexOf(document.activeElement) || 0;

      // If we're on the last focusable item, loop back to the first
      if (!event.shiftKey && focusedItemIndex === this.focusableChildren.length - 1) {
        this.focusableChildren[0].focus();
        event.preventDefault();
      }

      // If we're on the first focusable item and shift-tab
      // (moving backward), wrap to the last item
      if (event.shiftKey && focusedItemIndex === 0) {
        this.focusableChildren[this.focusableChildren.length - 1].focus();
        event.preventDefault();
      }
    }
  };

  return AccessibleToggle;
}();

return AccessibleToggle;

})));
