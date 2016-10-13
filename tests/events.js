const is = require('is');
const fail = require('../util/fail');
const equal = is.assert;


describe('EVENTS', () => {

  describe('base', () => {
    it('should have "on" method',  () => is.func.assert(Element.prototype.on))
    it('should have "off" method',  () => is.func.assert(Element.prototype.off))

    let ul = document.createElement('div')

    it('should throw when called without event name', () => {
      let err = fail(ul.on, [], ul)
      equal(is(err), 'Error')
      equal(err.message, '[Event:on] first argument must be a string')
    })

    it('should throw when called without callback', () => {
      let err = fail(ul.on, ['click'], ul)
      equal(is(err), 'Error')
      equal(err.message, '[Event:on] second argument must be a function')
    })

  });

  describe('on', () => {

    it('should add event and return element', () => {
      let div = document.createElement('div')
      let ctx = {};

      let ret = div.on('click', function(e) {
        equal(this, ctx)
        equal(is(e), 'MouseEvent')
      }, ctx);

      div.click()
      equal(ret, div)
    })

    it('should delegate event', () => {
      let div = document.createElement('div')
      div.innerHTML = '<p></p><b></b>'

      div.on('click p', e => equal(e.target.nodeName, 'P'))
      div.on('click b', e => equal(e.target.nodeName, 'B'))

      div.firstElementChild.click();
      div.lastElementChild.click();

    })
  });

  describe('off', () => {
    function emit(name, el) {
      let e = new MouseEvent(name, { view: window, bubbles: true, cancelable: true });
      el.dispatchEvent(e);
    }
    let div = document.createElement('div')
    div.innerHTML = '<p></p><b></b>'

    let p = div.firstElementChild;
    let b = div.lastElementChild;

    let count = {
      click: { p: 0, b: 0 },
      dblclick: { p: 0, b: 0 },
      wheel: { p: 0, b: 0 },
      cb:0
     }

    let cb = e => count.cb+=1

    div.on('click b', e => count.click.b+=1)
    div.on('click p', e => count.click.p+=1)

    div.on('dblclick b', e => count.dblclick.b+=1)
    div.on('dblclick p', e => count.dblclick.p+=1)

    div.on('wheel b,p', cb)

    it('should remove all clicks', () => {
      emit('click', p);
      emit('click', b);

      div.off('click');

      emit('click', p);
      emit('click', b);

      equal(count.click.p, 1)
      equal(count.click.b, 1)
    })

    it('should remove dblclick with selector', () => {
      emit('dblclick', p);
      emit('dblclick', b);

      div.off('dblclick p');

      emit('dblclick', p);
      emit('dblclick', b);

      equal(count.dblclick.p, 1)
      equal(count.dblclick.b, 2)
    })

    it('should remove by callback', () => {
      emit('wheel', p);
      emit('wheel', b);

      div.off(cb);

      emit('wheel', p);
      emit('wheel', b);

      equal(count.cb, 2)
    })

    it('should remove all', () => {
      div.off();
      emit('click', p);
      emit('click', b);
      emit('dblclick', p);
      emit('dblclick', b);
      emit('wheel', p);
      emit('wheel', b);

      equal(count.click.p, 1)
      equal(count.click.b, 1)
      equal(count.dblclick.p, 1)
      equal(count.dblclick.b, 2)
      equal(count.cb, 2)
    })


  });

});