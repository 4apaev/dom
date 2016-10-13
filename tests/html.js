const is = require('is')

describe('html',   () => {
  it('should have "html" property', () => {
    is.own.assert(Element.prototype, 'html')
  })
});

