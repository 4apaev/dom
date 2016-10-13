const is = require('is')

describe('alias',  () => {

  const test = (Ctor, dict) => {
    dict.forEach(x => {
      let [ alias, method ] = x.split(':');
      let msg = `${ Ctor.name }.prototype.${ method } should have alias "${ alias }"`
      it(msg, () => is.own.assert(Ctor.prototype, alias, msg))
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

