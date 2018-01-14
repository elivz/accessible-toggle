import throttle from 'raf-throttle';

/**
 * Defaults for the user-configurable options
 *
 * @type {Object}
 */
const defaultOptions = {
  trapFocus: true,
  assignFocus: true,
  closeOnEsc: true,
  closeOnClickOutside: false,
  mediaQuery: false,
  onShow: () => {},
  onHide: () => {},
};

/**
 * Elements that can receive tab focus
 * (cribbed from https://github.com/edenspiekermann/a11y-dialog)
 */
const focusable = [
  `a[href]:not([tabindex^="-"]):not([inert])`,
  `area[href]:not([tabindex^="-"]):not([inert])`,
  `input:not([disabled]):not([inert])`,
  `select:not([disabled]):not([inert])`,
  `textarea:not([disabled]):not([inert])`,
  `button:not([disabled]):not([inert])`,
  `iframe:not([tabindex^="-"]):not([inert])`,
  `[contenteditable]:not([tabindex^="-"]):not([inert])`,
  `[tabindex]:not([tabindex^="-"]):not([inert])`,
];

const keyCodes = {
  tab: 9,
  esc: 27,
};

/**
 * Helper that converts the result of querySelectorAll to a plain array
 *
 * @param {string} selector
 * @param {element} context to query
 * @return {array}
 */
function $$(selector, context) {
  const elementList = (context || document).querySelectorAll(selector);
  return Array.prototype.slice.call(elementList);
}

export default class AccessibleToggle {
  /**
   * Constructor – stores references to all the DOM elements
   *               and runs the "setup" function
   *
   * @param  {Element}  element   The toggleable content element
   * @param  {Object}   options   Configurable options
   * @return {null}
   */
  constructor(element, options = {}) {
    if (!element || !(element instanceof HTMLElement)) {
      console.warn(`Toggle: first parameter must by an HTML element.`);
      return;
    }

    this.content = element;
    this.id = element.id;
    this.buttons = $$(`[data-toggle='${this.id}']`);
    this.options = Object.assign({}, defaultOptions, options);

    if (this.buttons.length < 1) {
      console.warn(
        `Toggle: there are no buttons that control the toggleable element.`
      );
      return;
    }

    // Start things off
    if (this.options.mediaQuery === false) {
      // No media query – go ahead and run everything as normal
      this.setup();
    } else {
      // Check if it should be setup now, and again every time the window is resized
      this.testMediaQuery();
      window.addEventListener(
        `resize`,
        throttle(this.testMediaQuery.bind(this))
      );
    }
  }

  /**
   * Adds ARIA roles to all the elements and attaches event handler
   *
   * @return {null}
   */
  setup() {
    if (!this.active) {
      this.boundClickHandler = this.clickHandler.bind(this);
      this.boundKeypressHandler = this.keypressHandler.bind(this);

      document.addEventListener(`keydown`, this.boundKeypressHandler);
      document.addEventListener(`click`, this.boundClickHandler);

      // Toggleable content properties
      this.content.setAttribute(`aria-labelledby`, `${this.id}-control-0`);

      // Button properties
      this.buttons.forEach((button, index) => {
        button.setAttribute(`aria-controls`, this.id);
        button.setAttribute(`id`, `${this.id}-control-${index}`);
      });

      if (this.content.getAttribute(`data-toggle-open`)) {
        this.show();
      } else {
        this.hide();
      }
    }

    this.active = true;
  }

  /**
   * Removes all ARIA roles
   *
   * @return {null}
   */
  teardown() {
    if (this.active) {
      document.removeEventListener(`click`, this.boundClickHandler);
      document.removeEventListener(`keyup`, this.boundKeyupHandler);

      // Button properties
      this.buttons.forEach(button => {
        button.removeAttribute(`aria-label`);
        button.removeAttribute(`aria-expanded`);
        button.removeAttribute(`aria-controls`);
        button.removeAttribute(`id`);
      });

      // Toggleable content properties
      this.content.removeAttribute(`aria-hidden`);
      this.content.removeAttribute(`aria-labelledby`);

      this.active = false;
    }
  }

  /**
   * Toggles the script on and off based on a media query
   *
   * @return {null}
   */
  testMediaQuery() {
    if (
      this.options.mediaQuery &&
      window.matchMedia(this.options.mediaQuery).matches
    ) {
      this.setup();
    } else {
      this.teardown();
    }
  }

  /**
   * Test if the content panel is currently visible
   */
  isOpen() {
    return this.content.getAttribute(`aria-hidden`) !== `true`;
  }

  /**
   * Show the content
   *
   * @return {class}  The accessible-toggle class
   */
  show() {
    this.content.setAttribute(`aria-hidden`, `false`);
    this.buttons.forEach(button => {
      button.setAttribute(`aria-expanded`, `true`);
    });

    // Set focus on first focusable item
    if (this.options.assignFocus) {
      const toFocus =
        this.content.querySelector(`[autofocus]`) ||
        this.getFocusableChildElements()[0];

      if (toFocus) {
        toFocus.focus();
      }
    }

    // Trigger callback
    if (typeof this.options.onShow === `function`) {
      this.options.onShow();
    }

    // Fire custom event
    const event = new Event(`toggle-show`);
    this.content.dispatchEvent(event);

    return this;
  }

  /**
   * Hide the content
   *
   * @return {class}  The accessible-toggle class
   */
  hide() {
    this.content.setAttribute(`aria-hidden`, `true`);
    this.buttons.forEach(button => {
      button.setAttribute(`aria-expanded`, `false`);
    });

    // Trigger callback
    if (typeof this.options.onShow === `function`) {
      this.options.onHide();
    }

    // Fire custom event
    const event = new Event(`toggle-hide`);
    this.content.dispatchEvent(event);

    return this;
  }

  /**
   * Toggles visibility and ARIA roles
   *
   * @param  {bool}   display   True to show the content, false to hide it
   * @return {class}  The accessible-toggle class
   */
  toggle(display) {
    if (typeof display === `undefined`) {
      display = !this.isOpen();
    }

    if (display) {
      this.show();
    } else {
      this.hide();
    }

    return this;
  }

  /**
   * Handle clicks
   *
   * @param  {event}
   * @return {null}
   */
  clickHandler(event) {
    // If the click was on one of the control buttons, toggle visibility
    if (this.buttons.indexOf(event.target) >= 0) {
      event.preventDefault();
      this.toggle();
      return;
    }

    // If the content is visible and the user clicks outside
    // of it, close the content
    if (
      this.closeOnClickOutside &&
      this.isOpen() &&
      !this.content.contains(event.target)
    ) {
      event.preventDefault();
      this.hide();
      return;
    }
  }

  /**
   * Handle keypresses
   *
   * @param  {event}
   * @return {null}
   */
  keypressHandler(event) {
    // Is ESC key?
    if (
      this.options.closeOnEsc &&
      this.isOpen() &&
      event.which === keyCodes.esc
    ) {
      event.preventDefault();
      this.hide();
      this.buttons[0].focus();
    }

    // Tab key?
    if (this.options.trapFocus && event.which === keyCodes.tab) {
      this.trapFocus(event);
    }
  }

  /**
   * Get all focusable child elements of the given element
   *
   * @return {aray}
   */
  getFocusableChildElements() {
    return $$(focusable.join(`,`), this.content).filter(child => {
      return !!(
        child.offsetWidth ||
        child.offsetHeight ||
        child.getClientRects().length
      );
    });
  }

  /**
   * Trap tab focus inside the given element
   *
   * @param {Event} event
   */
  trapFocus(event) {
    const focusableChildren = this.getFocusableChildElements();

    if (focusableChildren.length > 0) {
      const focusedItemIndex =
        focusableChildren.indexOf(document.activeElement) || 0;

      // If we're on the last focusable item, loop back to the first
      if (
        !event.shiftKey &&
        focusedItemIndex === focusableChildren.length - 1
      ) {
        focusableChildren[0].focus();
        event.preventDefault();
      }

      // If we're on the first focusable item and shift-tab
      // (moving backward), wrap to the last item
      if (event.shiftKey && focusedItemIndex === 0) {
        focusableChildren[focusableChildren.length - 1].focus();
        event.preventDefault();
      }
    }
  }
}
