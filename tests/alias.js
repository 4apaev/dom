const is = require('is')
const declare = require('declare')

describe('alias',  () => {

  const test = (Ctor, dict) => {
    dict.forEach(x => {
      let [ alias, method ] = x.split(':');

      it(`${ Ctor.name }.prototype.${ method } should have alias "${ alias }"`, () => {
        is.own.assert(Ctor.prototype, alias)
      })

      it(`"${ method }" descriptor should be the same as "${ alias }" descriptor`, () => {
        let a = declare.getDesc(Ctor.prototype, method)
        let b = declare.getDesc(Ctor.prototype, alias)
        is.equal.assert(a, b)
      })

    })
  }

  test(Node, ['text:textContent','parent:parentElement'])
  test(Element, [
    'find:querySelector',
    'query:querySelectorAll',
    'next:nextElementSibling',
    'prev:previousElementSibling',
    'last:lastElementChild',
    'first:firstElementChild',
    'width:clientWidth',
    'height:clientHeight'
  ])
});

