let indexOf = [].indexOf
let throws = false
let expected = true

module.exports = Is
function Is(x) {
  return x != null;
}

Object.defineProperty(Is, 'a', { get() { return this }})
Object.defineProperty(Is, 'an', { get() { return this }})
Object.defineProperty(Is, 'it', { get() { return this }})
Object.defineProperty(Is, 'to', { get() { return this }})
Object.defineProperty(Is, 'be', { get() { return this }})
Object.defineProperty(Is, 'have', { get() { return this }})


Object.defineProperty(Is, 'not', {
  get() {
    expected = false
    return this
  }
})

Object.defineProperty(Is, 'must', {
  get() {
    throws = true
    return this
  }
})

Is.assert = (a, b, msg = 'Epic Fail') => {
  if (a !== b)
    throw new TypeError(msg)
}

Is.use = (name, func) => {

  if ('function' !== typeof func) {
    let type = `[object ${ String(func) }]`
    func = x => type === toString.call(x)
  }

  return Object.defineProperty(Is, name, {
    value(...args) {
      let e = expected
      let a = func(...args)
      expected = true
      if (throws) {
        throws = false
        this.assert(a, e, args[ func.length ])
      }
      return a === e
    }
  })
}

Is.use('obj', x => 'object' === typeof x && !!x)
Is.use('str', x => 'string' === typeof x)
Is.use('bool', x => 'boolean' === typeof x)
Is.use('func', x => 'function' === typeof x)
Is.use('undef', x => 'undefined' === typeof x)
Is.use('num', x => x === +x)
Is.use('has', (a, b) => !!a && b in Object(a))
Is.use('own', (a, b) => !!a && hasOwnProperty.call(Object(a), b))
Is.use('inn', (a, b) => !!a && indexOf.call(Object(a), b) > -1)
Is.use('empty', x => {
  for (let i in x)
    return false;
  return !x || 'object' === typeof x
})
Is.use('arr', 'Array')
Is.use('Obj', 'Object')
Is.use('err', 'Error')



