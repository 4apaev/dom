const is = require('is')
const getDesc = require('declare').getDesc;
const aliases = require('../src/aliases')

describe('Alias',  () => {
  aliases.forEach(({ terms, src, trg }) => {
    describe(`${ (trg||src).name } aliases`,  () => {
      terms.forEach(({ alias, name }) => {
          let msg = trg
            ? `${ trg.name } "${ name }" should alias ${ src.name } "${ alias }"`
            : `${ src.name } "${ name }" should have alias "${ alias }"`

          trg||(trg=src);

          it(msg, () => {
            let a = getDesc(src.prototype, name)
            let b = getDesc(trg.prototype, alias)
            is.own.assert(trg.prototype, alias)
            is.equal.assert(a, b)
          })
      })
    })
  })
});