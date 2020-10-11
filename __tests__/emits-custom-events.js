// Set up our document body
document.body.innerHTML = `
  <button id="button" data-toggle="content"></button>
  <div id="content"></div>`;

// Store references to the element
const content = document.querySelector('#content');

const AccessibleToggle = require('../src');

test('emits show event', (done) => {
  function onShow() {
    expect(content.getAttribute('aria-hidden')).toEqual('false');
    done();
  }

  // Initialize the toggle script
  const toggle = new AccessibleToggle(content);
  content.addEventListener('toggle-show', onShow);

  // Show the content
  toggle.show();
});

test('emits hide event', (done) => {
  function onHide() {
    expect(content.getAttribute('aria-hidden')).toEqual('true');
    done();
  }

  // Initialize the toggle script
  const toggle = new AccessibleToggle(content);
  content.addEventListener('toggle-hide', onHide);

  // Hide the content
  toggle.hide();
});

test('triggers the enable callback', (done) => {
  // Initialize the toggle script
  // eslint-disable-next-line no-new
  new AccessibleToggle(content, {
    onEnable: () => {
      expect(content.hasAttribute('aria-hidden')).toEqual(true);
      done();
    },
  });
});

test('triggers the disable callback', (done) => {
  // Initialize the toggle script
  const toggle = new AccessibleToggle(content, {
    onDisable: () => {
      expect(content.hasAttribute('aria-hidden')).toEqual(false);
      done();
    },
  });

  // Hide the content
  toggle.destroy();
});

test('triggers the show callback', (done) => {
  // Initialize the toggle script
  const toggle = new AccessibleToggle(content, {
    onShow: () => {
      expect(content.getAttribute('aria-hidden')).toEqual('false');
      done();
    },
  });

  // Hide the content
  toggle.show();
});

test('triggers the hide callback', (done) => {
  // Initialize the toggle script
  const toggle = new AccessibleToggle(content, {
    onHide: () => {
      expect(content.getAttribute('aria-hidden')).toEqual('true');
      done();
    },
  });

  // Hide the content
  toggle.hide();
});
