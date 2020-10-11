// Set up our document body
document.body.innerHTML = `
  <button id="button" data-toggle="content"></button>
  <div id="content">
    <a href="#" id="button2" data-toggle="content"></a>
  </div>`;

const AccessibleToggle = require('../src');

// Store references to the two elements
const content = document.querySelector('#content');

// Initialize the toggle script
const toggle = new AccessibleToggle(content);

test('toggle() using js api', () => {
  // Toggle the content
  toggle.toggle();
  expect(content.getAttribute('aria-hidden')).toEqual('false');
});

test('hide() using js api', () => {
  // Hide the content
  toggle.hide();
  expect(content.getAttribute('aria-hidden')).toEqual('true');
});

test('show() using js api', () => {
  // Show the content
  toggle.show();
  expect(content.getAttribute('aria-hidden')).toEqual('false');
});

test('toggle(false) using js api', () => {
  // Toggle the content
  toggle.toggle(false);
  expect(content.getAttribute('aria-hidden')).toEqual('true');
});

test('toggle(true) using js api', () => {
  // Toggle the content
  toggle.toggle(true);
  expect(content.getAttribute('aria-hidden')).toEqual('false');
});
