let flag = true
let configurable = flag
let enumerable = flag
let writable = flag


module.exports = {
  property(o, name, desc) {
      this.ok.conf.enum.write;
      return Object.defineProperty(o, name, desc);
    },
  alias(src, name, alias=name, trg=src, desc) {
      if (desc = Object.getOwnPropertyDescriptor(src, name))
        return Object.defineProperty(trg, alias, desc);
      else
        throw new ReferenceError(`declare.alias: property not exist`)
    },
  method(o, name, x) {
    return this.not.enum.value(o, name, x)
  },
  getter(o, name, get, set) {
    return this.accessor(o, name, get, set)
  },
  value(o, name, value) {
    return this.property(o, name, { configurable, enumerable, writable, value })
  },
  accessor(o, name, get, set) {
    return this.property(o, name, { configurable, enumerable, get, set })
  },
  get ok() { return (flag = true), this },
  get not() { return (flag = false), this },
  get conf() { return (configurable = flag), this.ok },
  get enum() { return (enumerable = flag), this.ok },
  get write() { return (writable = flag), this.ok },
}