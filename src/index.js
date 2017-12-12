import throttle from 'raf-throttle';

/**
 * Defaults for the user-configurable options
 *
 * @type {Object}
 */
const defaultOptions = {
  assignFocus: false,
  closeOnEsc: true,
  mediaQuery: false,
  onShow: () => {},
  onHide: () => {},
};

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
    this.buttons = Array.prototype.slice.call(
      document.querySelectorAll(`[data-toggle='${this.id}']`)
    );
    this.firstFocusable = element.querySelector(
      `a[href], input:not([disabled]), button:not([disabled]), [tabindex]`
    );
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
      this.boundKeyupHandler = this.keyupHandler.bind(this);

      // Toggleable content properties
      this.content.setAttribute(`aria-labelledby`, `${this.id}-control-0`);
      if (this.options.closeOnEsc) {
        this.content.addEventListener(`keyup`, this.boundKeyupHandler);
      }

      // Button properties
      this.buttons.forEach((button, index) => {
        button.setAttribute(`aria-controls`, this.id);
        button.setAttribute(`id`, `${this.id}-control-${index}`);
        button.addEventListener(`click`, this.boundClickHandler);
        button.addEventListener(`keyup`, this.boundKeyupHandler);
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
      // Button properties
      this.buttons.forEach(button => {
        button.removeAttribute(`aria-label`);
        button.removeAttribute(`aria-expanded`);
        button.removeAttribute(`aria-controls`);
        button.removeAttribute(`id`);
        button.removeEventListener(`click`, this.boundClickHandler);
      });

      // Toggleable content properties
      this.content.removeAttribute(`aria-hidden`);
      this.content.removeAttribute(`aria-labelledby`);
      this.content.removeEventListener(`keyup`, this.boundKeyupHandler);

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
   * Show the content
   *
   * @return {class}  The accessible-toggle class
   */
  show() {
    this.content.setAttribute(`aria-hidden`, `false`);
    this.buttons.forEach(button => {
      button.setAttribute(`aria-expanded`, `true`);
    });

    // Set focus on first link
    if (this.options.assignFocus && this.firstFocusable) {
      this.firstFocusable.focus();
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
      display = this.content.getAttribute(`aria-hidden`) === `true`;
      console.log(display);
    }

    if (display) {
      this.show();
    } else {
      this.hide();
    }

    return this;
  }

  /**
   * Handle clicks on the button element
   *
   * @param  {event}
   * @return {null}
   */
  clickHandler(event) {
    this.toggle();
    event.preventDefault();
  }

  /**
   * Handle keypresses within the content element
   *
   * @param  {event}
   * @return {null}
   */
  keyupHandler(event) {
    // Is ESC key?
    if (
      this.options.closeOnEsc &&
      (event.which === 27 || event.keyCode === 27)
    ) {
      event.preventDefault();
      this.hide();
      this.buttons[0].focus();
    }
  }
}
