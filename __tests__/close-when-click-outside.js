// Set up our document body
document.body.innerHTML = `
  <button id="button" data-toggle="content"></button>
  <div id="content">
    <nav>
      <a href="#" id="inside-control">Nav Link</a>
    </nav>
  </div>
  <a href="#" id="outside-control"></a>`;

const AccessibleToggle = require('../src');

// Store references to the two elements
const button = document.getElementById('button');
const content = document.getElementById('content');
const insideControl = document.getElementById('inside-control');
const outsideControl = document.getElementById('outside-control');

// Initialize the toggle script
// eslint-disable-next-line no-new
new AccessibleToggle(content, {
  closeOnClickOutside: true,
});

// Create the Event object
const clickEvent = new Event('click', {bubbles: true});

test('panel closes on click outside', () => {
  // Open the panel
  button.dispatchEvent(clickEvent);

  // Click on another element
  outsideControl.dispatchEvent(clickEvent);

  // Check that all the attributes are correct
  expect(button.getAttribute('aria-expanded')).toEqual('false');
  expect(content.getAttribute('aria-hidden')).toEqual('true');
});

test('panel does not close on click inside', () => {
  // Open the panel
  button.dispatchEvent(clickEvent);

  // Click on element inside panel
  insideControl.dispatchEvent(clickEvent);

  // Check that all the attributes are correct
  expect(button.getAttribute('aria-expanded')).toEqual('true');
  expect(content.getAttribute('aria-hidden')).toEqual('false');
});

test('panel does not close on click on panel', () => {
  // Click on the panel element
  content.dispatchEvent(clickEvent);

  // Check that all the attributes are correct
  expect(button.getAttribute('aria-expanded')).toEqual('true');
  expect(content.getAttribute('aria-hidden')).toEqual('false');
});
