const is = require('is')


describe('insert', () => {
  it('should have "insert" method',  () => is.func.assert(Element.prototype.insert))
  it('should have "append" method',  () => is.func.assert(Element.prototype.append))
  it('should have "prepend" method', () => is.func.assert(Element.prototype.prepend))
  it('should have "after" method',   () => is.func.assert(Element.prototype.after))
  it('should have "before" method',  () => is.func.assert(Element.prototype.before))
});