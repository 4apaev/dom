'use strict';

// const { keys, assign, create } = Object
// const camel2cabab = x => (x.match(/([A-Z]+)?([a-z]+)?/g)||[]).slice(0,-1).join('-').toLowerCase()
// const styl = x => keys(x).map(k => `${k}:${x[k]}`).join(';')

const is = require('is')
const selfClosed = [].includes.bind('br,hr,img,input,link'.split(','));


function setAttrs(attrs={}, buf=[]) {

  for (let k in attrs) {
    let v = attrs[k];

    if (is.bool(v) && v)
      buf.push(k)

    else if (is.def(v))
      buf.push(`${ k }="${ is.arr(v) ? arr.join(' ') : v }"`)
  }

  return buf.join(' ')
}


module.exports = tag;
function tag(name, attrs={}, ...argv) {
  let open = `<${ setAttrs(attrs, [name]) }>`;
  if (selfClosed(name))
    return open;

  let body = argv.join('');
  return `${ open }${ body }</${name}>`;
}

