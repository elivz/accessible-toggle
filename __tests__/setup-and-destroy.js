// Set up our document body
document.body.innerHTML = `
  <button id="button" data-toggle="content"></button>
  <div id="content"></div>`;

const AccessibleToggle = require('../src');

// Store references to the two elements
const content = document.getElementById('content');

// Initialize the toggle script
const toggle = new AccessibleToggle(content);

test('programatically destroy the toggle', () => {
  // Toggle the content
  toggle.destroy();
  expect(content.hasAttribute('aria-hidden')).toEqual(false);
});

test('programatically create the toggle', () => {
  // Toggle the content
  toggle.setup();
  expect(content.getAttribute('aria-hidden')).toEqual('true');
});
