const Is = require('is');

describe('Html',   () => {
  it('should have "html" property', () => {
    Is.must.own(Element.prototype, 'html')
  })
});

