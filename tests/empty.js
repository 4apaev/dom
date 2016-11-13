const is = require('is');
const equal = is.assert;

describe('empty', () => {
  it('should have "empty" method', () => is.func.assert(Element.prototype.empty));

  it('should empty and return element ', () => {
    let ul = document.createElement('ul');

    ul.innerHTML = `
      <li>a</li>
      <li>b</li>
      <li>c</li>`;

    equal(ul.children.length, 3);
    equal(ul.empty(), ul);
    equal(ul.children.length, 0);
    equal(ul.innerHTML, '')
  });

  it('should remove all events listeners if children has any ', () => {
    let ul = document.createElement('ul');
    let count = 0;

    ul.innerHTML = `
      <li>a</li>
      <li>b</li>
      <li>c</li>`;

    for (let li of ul.children)
      li.on('click', e => count += 1).click()

    equal(count, 3);
    equal(ul.empty(), ul);

    for (let li of ul.children)
      li.click()
    equal(count, 3)
  })
});