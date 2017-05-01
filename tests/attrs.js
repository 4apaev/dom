const Is = require('is')

describe('Attrs',  () => {
  it('should have "attr" method', () => Is.must.be.func(Element.prototype.attr))

  it('should get attr', () => {
    let node = document.createElement('div');
    node.id='a'
    Is.assert(node.attr('id'),'a')
  })
  it('should set attr', () => {
    let node = document.createElement('div');
    Is.assert(node.attr('id', 'a'), node)
    Is.assert(node.attr('id'), 'a')
  })
  it('should set all attrs', () => {
    let node = document.createElement('div');
    Is.assert(node.attr({ id:'a',title:'b' }), node)
    Is.assert(node.id, 'a')
    Is.assert(node.title, 'b')
  })
  it('should get all attrs', () => {
    let node = document.createElement('div');
    Is.assert(node.attr({ id:'a',title:'b' }), node)

    let attrs = node.attr()
    Is.must.be.an.arr(attrs)

  })
});
