const assert = require('assert');
const render = require('../../render');

it('has a text input', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');
  assert(input);
});

it('shows a success message with a valid', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');
  input.value = 'chicken@factory.com';
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');
  assert.strictEqual(h1.innerHTML, 'Looks good!!');
});

/*               <<<<<<<< Script execution delay issue >>>>>>>>
Time
  | We tell JSDOM to load up index.html
  |                 |
  |                 V
  | JSDOM fetches the HTML file and parses it. 'fromFile' promise resolved!
  |             Our tests run        |
  |  We submit form, check h1        |
  |                                  V
  |             JSDOM loads up the index.js file and executes code in it
  V

  
  JSDOM does not wait for the <script> tags to be executed.
  So we need JSDOM to wait!
*/
