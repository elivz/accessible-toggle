`use strict`;

test(`toggles aria roles`, () => {
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

  // Click the button
  const clickEvent = new Event(`click`);
  button.dispatchEvent(clickEvent);

  // Check that all the attributes have been set
  expect(button.getAttribute(`aria-expanded`)).toEqual(`true`);
  expect(content.getAttribute(`aria-hidden`)).toEqual(`false`);

  // Click the other button
  button2.dispatchEvent(clickEvent);

  // Check that all the attributes have been set
  expect(button.getAttribute(`aria-expanded`)).toEqual(`false`);
  expect(content.getAttribute(`aria-hidden`)).toEqual(`true`);
});
