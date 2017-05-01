const Is = require('is');
const fail = require('../util/fail');

describe('Events', () => {
  const el = (x, html) => {
    let node = document.createElement(x)
    html  && (node.innerHTML=html)
    return node
  }
  function emit(name, node) {
      node.dispatchEvent(new MouseEvent(name, {view: window, bubbles: true, cancelable: true}));
    }

  describe('base', () => {
    let ul = el('ul');
    it('should have "on" method', () => Is.must.be.func(Element.prototype.on));
    it('should have "off" method', () => Is.must.be.func(Element.prototype.off));
    it('should throw when called without event name', () => Is.must.be.err(fail(ul.on, [], ul)));
    it('should throw when called without callback', () => Is.must.be.err(fail(ul.on, [ 'click' ], ul)))
  });

  describe('on', () => {
    it('should add event and return element', () => {
      let node = el('div');
      let ctx = {};
      let div = node.on('click', function(e) {
        Is.assert(this, ctx);
      }, ctx);
      emit('click', node);
      Is.assert(div, node)
    });

    it('should delegate event', () => {
      let node = el('div', '<p></p><b></b>');

      node.on('click p', e => Is.assert(e.target.nodeName, 'P'));
      node.on('click b', e => Is.assert(e.target.nodeName, 'B'));

      emit('click', node.firstElementChild);
      emit('click', node.lastElementChild);
    })
  });

  describe('once', () => {
    let i = 0, node = el('div');
    node.once('click', e => i += 1);
    emit('click', node);
    emit('click', node);
    it('should emit once', () => Is.assert(1, i, `actual: ${ i }, expected: 1`))
  });

  describe('off', () => {
    it('should remove all clicks', () => {
      let node = el('div', '<p></p><b></b>');
      let cnt = {
        cl: { p: 0, b: 0 },
        db: { p: 0, b: 0 }}

      node.on('click b'   , e => cnt.cl.b += 1);
      node.on('click p'   , e => cnt.cl.p += 1);
      node.on('dblclick b', e => cnt.db.b += 1);
      node.on('dblclick p', e => cnt.db.p += 1);

      emit('click',    node.firstElementChild);
      emit('click',    node.lastElementChild);
      emit('dblclick', node.firstElementChild);
      emit('dblclick', node.lastElementChild);

      node.off('click');

      emit('click',    node.firstElementChild);
      emit('click',    node.lastElementChild);
      emit('dblclick', node.firstElementChild);
      emit('dblclick', node.lastElementChild);

      Is.assert(1, cnt.cl.b, `cl b actual: ${ cnt.cl.b }, expected: 1`);
      Is.assert(1, cnt.cl.p, `cl p actual: ${ cnt.cl.p }, expected: 1`);
      Is.assert(2, cnt.db.b, `db b actual: ${ cnt.db.b }, expected: 2`);
      Is.assert(2, cnt.db.p, `db p actual: ${ cnt.db.p }, expected: 2`);
    });

    it('should remove dblclick with selector', () => {
      let node = el('div', '<p></p><b></b>');
      let cnt = {
        cl: { p: 0, b: 0 },
        db: { p: 0, b: 0 }}

      node.on('click b'   , e => cnt.cl.b += 1);
      node.on('click p'   , e => cnt.cl.p += 1);
      node.on('dblclick b', e => cnt.db.b += 1);
      node.on('dblclick p', e => cnt.db.p += 1);

      emit('click',    node.firstElementChild);
      emit('click',    node.lastElementChild);
      emit('dblclick', node.firstElementChild);
      emit('dblclick', node.lastElementChild);

      node.off('dblclick p');

      emit('click',    node.firstElementChild);
      emit('click',    node.lastElementChild);
      emit('dblclick', node.firstElementChild);
      emit('dblclick', node.lastElementChild);

      Is.assert(2, cnt.cl.b, `cl b actual: ${ cnt.cl.b }, expected: 2`);
      Is.assert(2, cnt.cl.p, `cl p actual: ${ cnt.cl.p }, expected: 2`);
      Is.assert(2, cnt.db.b, `db b actual: ${ cnt.db.b }, expected: 2`);
      Is.assert(1, cnt.db.p, `db p actual: ${ cnt.db.p }, expected: 1`);
    });

    it('should remove by callback', () => {
      let node = el('div', '<p></p><b></b>');
      let cnt = {
        cl: { p: 0, b: 0 },
        db: { p: 0, b: 0 }}
      let handler = e => cnt.db.p += 1

      node.on('click b'   , e => cnt.cl.b += 1);
      node.on('click p'   , e => cnt.cl.p += 1);
      node.on('dblclick b', e => cnt.db.b += 1);
      node.on('dblclick p', handler);

      emit('click',    node.firstElementChild);
      emit('click',    node.lastElementChild);
      emit('dblclick', node.firstElementChild);
      emit('dblclick', node.lastElementChild);

      node.off(handler);

      emit('click',    node.firstElementChild);
      emit('click',    node.lastElementChild);
      emit('dblclick', node.firstElementChild);
      emit('dblclick', node.lastElementChild);

      Is.assert(2, cnt.cl.b, `cl b actual: ${ cnt.cl.b }, expected: 2`);
      Is.assert(2, cnt.cl.p, `cl p actual: ${ cnt.cl.p }, expected: 2`);
      Is.assert(2, cnt.db.b, `db b actual: ${ cnt.db.b }, expected: 2`);
      Is.assert(1, cnt.db.p, `db p actual: ${ cnt.db.p }, expected: 1`);
    });

    it('should remove all', () => {
      let node = el('div', '<p></p><b></b>');
      let cnt = {
        cl: { p: 0, b: 0 },
        db: { p: 0, b: 0 }}

      node.on('click b',    e => cnt.cl.b += 1);
      node.on('click p',    e => cnt.cl.p += 1);
      node.on('dblclick b', e => cnt.db.b += 1);
      node.on('dblclick p', e => cnt.db.p += 1);

      emit('click',    node.firstElementChild);
      emit('click',    node.lastElementChild);
      emit('dblclick', node.firstElementChild);
      emit('dblclick', node.lastElementChild);

      node.off();

      emit('click',    node.firstElementChild);
      emit('click',    node.lastElementChild);
      emit('dblclick', node.firstElementChild);
      emit('dblclick', node.lastElementChild);

      Is.assert(1, cnt.cl.b, `cl b actual: ${ cnt.cl.b }, expected: 1`);
      Is.assert(1, cnt.cl.p, `cl p actual: ${ cnt.cl.p }, expected: 1`);
      Is.assert(1, cnt.db.b, `db b actual: ${ cnt.db.b }, expected: 1`);
      Is.assert(1, cnt.db.p, `db p actual: ${ cnt.db.p }, expected: 1`);
    })
  });
});
