const Is = require('is')

describe('Insert', () => {
  const el = x => document.createElement(x)
  const tag = x => `<${ x }></${ x }>`
  const node = el('div')

  const outer = x => x.HTML
  const identity = x => x

  const eq = expect => (a, b) => {
      let { first, last, count } = node;
      Is.assert(count, 2);
      Is.assert(a, expect(first));
      Is.assert(b, expect(last));
    }

  exec('element', el, eq(identity))
  exec('string', tag, eq(outer))

  function exec(term, make, equal, a, b) {
    describe(term, () => {
      beforeEach(() => {
        a = make('a')
        b = make('b')
        node.empty()
      })
      afterEach(() => equal(a, b))
      it(`should append  "a" and "b" ${ term } to node`,       () => node.append(a).append(b))
      it(`should prepend "b" and "a" ${ term } to node`,       () => node.append(b).prepend(a))
      it(`should insert  "a" ${ term }, before "b" ${ term }`, () => node.append(b).first.before(a))
      it(`should insert  "b" ${ term }, after "a" ${ term }`,  () => node.append(a).first.after(b))
    });
  }
});
