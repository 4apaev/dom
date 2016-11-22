const is = require('is')
const getDesc = require('declare').getDesc;
const aliases = require('../src/aliases')

describe('Alias',  () => {
  aliases.forEach(([ src, name, alias, ...targets ]) => {
    let Src = window[ src ]
    let a = declare.getDesc(Src.prototype, name)
    targets.forEach(trg => {
      let Trg = window[ trg ]
      it(`${ Trg.name } "${ name }" should have alias "${ alias }"`, () => {
        let b = declare.getDesc(Trg.prototype, alias)
        is.own.assert(Trg.prototype, alias)
        is.equal.assert(a, b)
      })
    })
  })
});