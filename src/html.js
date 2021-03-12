const Is = require('./is')
module.exports = {
  empty() {
    while (this.firstChild)
        this.removeChild(Is.func(this.firstChild.off) ? this.firstChild.off() : this.firstChild);
    return this;
  },
  get() {
      return this.innerHTML
    },
  set(html) {
      return this.empty().append(html)
    },
  query(x) {
    return [ ...this.querySelectorAll(x) ]
  }
}