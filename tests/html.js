const Is = require('../src/is')

describe('Html',   () => {
  it('should have "html" property', () => {
    Is.must.own(Element.prototype, 'html')
  })
});

