`use strict`;

test(`adds aria roles`, () => {
  // Set up our document body
  document.body.innerHTML = `
    <button id="button" data-toggle="content"></button>
    <div id="content"></div>`;

  const AccessibleToggle = require(`../src/index`);

  // Store references to the two elements
  const button = document.getElementById(`button`);
  const content = document.getElementById(`content`);

  // Initialize the toggle script
  new AccessibleToggle(content);

  // Check that all the attributes have been set
  expect(button.getAttribute(`aria-expanded`)).toEqual(`false`);
  expect(button.getAttribute(`aria-controls`)).toEqual(`content`);
  expect(button.getAttribute(`id`)).toEqual(`content-control-0`);
  expect(content.getAttribute(`aria-hidden`)).toEqual(`true`);
  expect(content.getAttribute(`aria-labelledby`)).toEqual(`content-control-0`);
});
