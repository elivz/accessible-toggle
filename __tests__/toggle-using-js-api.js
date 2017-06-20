`use strict`;

test(`toggle using js api`, () => {
  // Set up our document body
  document.body.innerHTML = `
    <button id="button" data-toggle="content"></button>
    <div id="content">
      <a href="#" id="button2" data-toggle="content"></a>
    </div>`;

  const AccessibleToggle = require(`../src/index`);

  // Store references to the two elements
  const content = document.getElementById(`content`);

  // Initialize the toggle script
  const toggle = new AccessibleToggle(content);

  // Toggle the content
  toggle.toggle();

  // Check that all the attributes have been set
  expect(content.getAttribute(`aria-hidden`)).toEqual(`false`);

  // Hide the content
  toggle.hide();

  // Check that all the attributes have been set
  expect(content.getAttribute(`aria-hidden`)).toEqual(`true`);

  // Show the content
  toggle.show();

  // Check that all the attributes have been set
  expect(content.getAttribute(`aria-hidden`)).toEqual(`false`);
});
