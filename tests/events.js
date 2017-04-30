const Is = require('is');
const fail = require('../util/fail');


describe('Events', () => {
  const el = x => document.createElement(x)

  describe('base', () => {
    let ul = el('ul');

    it('should have "on" method', () => Is.must.be.func(Element.prototype.on));
    it('should have "off" method', () => Is.must.be.func(Element.prototype.off));

    it('should throw when called without event name', () => {
      let err = fail(ul.on, [], ul);
      Is.must.be.err(err)
    });

    it('should throw when called without callback', () => {
      let err = fail(ul.on, [ 'click' ], ul);
      Is.must.be.err(err)
    })
  });

  describe('on', () => {
    it('should add event and return element', () => {
      let div = el('div');
      let ctx = {};
      let ret = div.on('click', function (e) {
        Is.assert(this, ctx);
      }, ctx);

      div.click();
      Is.assert(ret, div)
    });
    it('should delegate event', () => {
      let div = el('div');
      div.innerHTML = '<p></p><b></b>';

      div.on('click p', e => Is.assert(e.target.nodeName, 'P'));
      div.on('click b', e => Is.assert(e.target.nodeName, 'B'));

      div.firstElementChild.click();
      div.lastElementChild.click();
    })
  });

  describe('once', () => {
    let div = el('div');
    let count = 0;
    div.once('click', e => count += 1);
    it('should emit once', () => {
      div.click();
      Is.assert(1, count);
      div.click();
      Is.assert(1, count);
    })
  });

  describe('off', () => {
    function emit(name, el) {
      let e = new MouseEvent(name, {view: window, bubbles: true, cancelable: true});
      el.dispatchEvent(e);
    }

    let div = el('div');
    div.innerHTML = '<p></p><b></b>';

    let p = div.firstElementChild;
    let b = div.lastElementChild;

    let count = {
      click   : {p: 0, b: 0},
      dblclick: {p: 0, b: 0},
      wheel   : {p: 0, b: 0},
      cb      : 0
    };

    let cb = e => count.cb += 1;
    div.on('click b', e => count.click.b += 1);
    div.on('click p', e => count.click.p += 1);
    div.on('dblclick b', e => count.dblclick.b += 1);
    div.on('dblclick p', e => count.dblclick.p += 1);
    div.on('wheel b,p', cb);

    it('should remove all clicks', () => {
      emit('click', p);
      emit('click', b);
      div.off('click');
      emit('click', p);
      emit('click', b);
      Is.assert(count.click.p, 1);
      Is.assert(count.click.b, 1)
    });

    it('should remove dblclick with selector', () => {
      emit('dblclick', p);
      emit('dblclick', b);
      div.off('dblclick p');
      emit('dblclick', p);
      emit('dblclick', b);
      Is.assert(count.dblclick.p, 1);
      Is.assert(count.dblclick.b, 2)
    });

    it('should remove by callback', () => {
      emit('wheel', p);
      emit('wheel', b);
      div.off(cb);
      emit('wheel', p);
      emit('wheel', b);
      Is.assert(count.cb, 2)
    });

    it('should remove all', () => {
      div.off();
      emit('click', p);
      emit('click', b);
      emit('dblclick', p);
      emit('dblclick', b);
      emit('wheel', p);
      emit('wheel', b);
      Is.assert(count.click.p, 1);
      Is.assert(count.click.b, 1);
      Is.assert(count.dblclick.p, 1);
      Is.assert(count.dblclick.b, 2);
      Is.assert(count.cb, 2)
    })
  });
});
