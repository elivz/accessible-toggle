`use strict`;

// Set up our document body
document.body.innerHTML = `
  <button id="button" data-toggle="content"></button>
  <div id="content"></div>`;

// Store references to the element
const content = document.getElementById(`content`);

const AccessibleToggle = require(`../src/index`);

test(`emits show event`, done => {
  function onShow() {
    expect(content.getAttribute(`aria-hidden`)).toEqual(`false`);
    done();
  }

  // Initialize the toggle script
  const toggle = new AccessibleToggle(content);
  content.addEventListener(`toggle-show`, onShow);

  // Show the content
  toggle.show();
});

test(`emits hide event`, done => {
  function onHide() {
    expect(content.getAttribute(`aria-hidden`)).toEqual(`true`);
    done();
  }

  // Initialize the toggle script
  const toggle = new AccessibleToggle(content);
  content.addEventListener(`toggle-hide`, onHide);

  // Hide the content
  toggle.hide();
});

test(`triggers the show callback`, done => {
  // Initialize the toggle script
  const toggle = new AccessibleToggle(content, {
    onShow: () => {
      expect(content.getAttribute(`aria-hidden`)).toEqual(`false`);
      done();
    },
  });

  // Hide the content
  toggle.show();
});

test(`triggers the hide callback`, done => {
  // Initialize the toggle script
  const toggle = new AccessibleToggle(content, {
    onHide: () => {
      expect(content.getAttribute(`aria-hidden`)).toEqual(`true`);
      done();
    },
  });

  // Hide the content
  toggle.hide();
});
