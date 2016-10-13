const is = require('is')

describe('attrs',  () => {
  it('should have "attrs" method', () => is.func.assert(Element.prototype.attrs))
});
