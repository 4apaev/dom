const Is = require('is')

describe('Attrs',  () => {
  it('should have "attrs" method', () => Is.must.be.func(Element.prototype.attrs))
});
