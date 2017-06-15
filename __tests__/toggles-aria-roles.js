`use strict`;

test(`adds aria roles`, () => {
  // Set up our document body
  document.body.innerHTML = `<button id="button" data-toggle="content"></button>
    <div id="content"></div>`;

  const AccessibleToggle = require(`../dist/accessibleToggle`);

  // Store references to the two elements
  const button = document.getElementById(`button`);
  const content = document.getElementById(`content`);

  // Initialize the toggle script
  new AccessibleToggle(content);

  // Click the button
  const clickEvent = document.createEvent(`HTMLEvents`);
  clickEvent.initEvent(`click`, true, false);
  button.dispatchEvent(clickEvent);

  // Check that all the attributes have been set
  expect(button.getAttribute(`aria-expanded`)).toEqual(`true`);
  expect(content.getAttribute(`aria-hidden`)).toEqual(`false`);
});
