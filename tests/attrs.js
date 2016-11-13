const is = require('is')

describe('Attrs',  () => {
  it('should have "attrs" method', () => is.func.assert(Element.prototype.attrs))
});
