const is = require('is');

describe('Html',   () => {
  it('should have "html" property', () => {
    is.own.assert(Element.prototype, 'html')
  })
});

