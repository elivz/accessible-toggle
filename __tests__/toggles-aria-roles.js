// Set up our document body
document.body.innerHTML = `
  <button id="button" data-toggle="content">
    <span id="button-child"></span>
  </button>
  <div id="content">
    <a href="#" id="button2" data-toggle="content"></a>
  </div>`;

const AccessibleToggle = require('../src');

// Store references to the two elements
const button = document.querySelector('#button');
const button2 = document.querySelector('#button2');
const buttonChild = document.querySelector('#button-child');
const content = document.querySelector('#content');

// Initialize the toggle script
// eslint-disable-next-line no-new
new AccessibleToggle(content);

// Create the Event object
const clickEvent = new Event('click', {bubbles: true});

test('control outside of content area toggles aria roles', () => {
  // Click the button
  button.dispatchEvent(clickEvent);

  // Check that all the attributes have been set
  expect(button.getAttribute('aria-expanded')).toEqual('true');
  expect(content.getAttribute('aria-hidden')).toEqual('false');
});

test('child element of button toggles aria roles', () => {
  // Click the button
  buttonChild.dispatchEvent(clickEvent);

  // Check that all the attributes have been set
  expect(button.getAttribute('aria-expanded')).toEqual('false');
  expect(content.getAttribute('aria-hidden')).toEqual('true');
});

test('control inside content area toggles aria roles', () => {
  // Click the other button
  button2.dispatchEvent(clickEvent);

  // Check that all the attributes have been set
  expect(button.getAttribute('aria-expanded')).toEqual('true');
  expect(content.getAttribute('aria-hidden')).toEqual('false');
});
