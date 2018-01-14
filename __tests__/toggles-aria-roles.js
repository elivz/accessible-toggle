`use strict`;

// Set up our document body
document.body.innerHTML = `
  <button id="button" data-toggle="content"></button>
  <div id="content">
    <a href="#" id="button2" data-toggle="content"></a>
  </div>`;

const AccessibleToggle = require(`../src/index`);

// Store references to the two elements
const button = document.getElementById(`button`);
const button2 = document.getElementById(`button2`);
const content = document.getElementById(`content`);

// Initialize the toggle script
new AccessibleToggle(content);

// Create the Event object
const clickEvent = new Event(`click`, { bubbles: true });

test(`control outside of content area toggles aria roles`, () => {
  // Click the button
  button.dispatchEvent(clickEvent);

  // Check that all the attributes have been set
  expect(button.getAttribute(`aria-expanded`)).toEqual(`true`);
  expect(content.getAttribute(`aria-hidden`)).toEqual(`false`);
});

test(`control inside content area toggles aria roles`, () => {
  // Click the other button
  button2.dispatchEvent(clickEvent);

  // Check that all the attributes have been set
  expect(button.getAttribute(`aria-expanded`)).toEqual(`false`);
  expect(content.getAttribute(`aria-hidden`)).toEqual(`true`);
});
