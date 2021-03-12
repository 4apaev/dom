const Is = require('../src/is')

describe('Insert', () => {
  const el = x => document.createElement(x)
  const tag = x => `<${ x }></${ x }>`

  it(`should insert html`, () => {
    const node = el('div')
    Is.assert(node.insert(tag('b')), node);
    Is.assert(node.lastElementChild.tagName, 'B');
    Is.assert(node.childElementCount, 1);
  })
  it(`should insert el`, () => {
    const node = el('div')
    Is.assert(node.insert(el('b')), node);
    Is.assert(node.lastElementChild.tagName, 'B');
    Is.assert(node.childElementCount, 1);
  })

  it(`should append html`, () => {
    const node = el('div')
    node.insert(el('i'))

    Is.assert(node.append(tag('b')), node);
    Is.assert(node.lastElementChild.tagName, 'B');
    Is.assert(node.childElementCount, 2);
  })
  it(`should append el`, () => {
    const node = el('div')
    node.insert(el('i'))

    Is.assert(node.append(el('b')), node);
    Is.assert(node.lastElementChild.tagName, 'B');
    Is.assert(node.childElementCount, 2);
  })


  it(`should prepend html`, () => {
    const node = el('div')
    node.insert(el('i'))
    Is.assert(node.prepend(tag('b')), node);
    Is.assert(node.firstElementChild.tagName, 'B');
    Is.assert(node.childElementCount, 2);
  })
  it(`should prepend el`, () => {
    const node = el('div')
    node.insert(el('i'))
    Is.assert(node.prepend(el('b')), node);
    Is.assert(node.firstElementChild.tagName, 'B');
    Is.assert(node.childElementCount, 2);
  })


  it(`should insert html before`, () => {
    const div = el('div')
    const node = el('i')
    div.insert(node)
    Is.assert(node.before(tag('b')), node);
    Is.assert(div.firstElementChild.tagName, 'B');
    Is.assert(div.childElementCount, 2);
  })
  it(`should insert el before`, () => {
    const div = el('div')
    const node = el('i')
    div.insert(node)
    Is.assert(node.before(el('b')), node);
    Is.assert(div.firstElementChild.tagName, 'B');
    Is.assert(div.childElementCount, 2);
  })

  it(`should insert html after`, () => {
    const div = el('div')
    const node = el('i')
    div.insert(node)
    Is.assert(node.after(tag('b')), node);
    Is.assert(div.lastElementChild.tagName, 'B');
    Is.assert(div.childElementCount, 2);
  })
  it(`should insert el after`, () => {
    const div = el('div')
    const node = el('i')
    div.insert(node)
    Is.assert(node.after(el('b')), node);
    Is.assert(div.lastElementChild.tagName, 'B');
    Is.assert(div.childElementCount, 2);
  })


});
