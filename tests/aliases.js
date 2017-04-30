const Is = require('is')
const aliases = require('../src/aliases')
const { keys, getOwnPropertyDescriptor } = Object

describe('Alias',  () => {
  aliases.forEach(([ src, name, alias, ...targets ]) => {
    let Src = window[ src ],
        a = getOwnPropertyDescriptor(Src.prototype, name)

    targets.forEach(trg => {
      let Trg = window[ trg ],
          b = getOwnPropertyDescriptor(Trg.prototype, alias)

      it(`${ Trg.name } "${ name }" should have alias "${ alias }"`, () => {
        Is.must.own(Trg.prototype, alias)
        Is.assert(keys(b).every(k => a[ k ]===b[ k ]), true)
      })
    })
  })
});