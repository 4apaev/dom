const Is = require('is');


describe('Empty', () => {
  it('should have "empty" method', () => Is.must.be.func(Element.prototype.empty));

  it('should empty and return element ', () => {
    let ul = document.createElement('ul');

    ul.innerHTML = `
      <li>a</li>
      <li>b</li>
      <li>c</li>`;

    Is.assert(ul.children.length, 3);
    Is.assert(ul.empty(), ul);
    Is.assert(ul.children.length, 0);
    Is.assert(ul.innerHTML, '')
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

    Is.assert(count, 3);
    Is.assert(ul.empty(), ul);

    for (let li of ul.children)
      li.click()
    Is.assert(count, 3)
  })
});