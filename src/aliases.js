module.exports = `
  Array  map      map      NodeList  NamedNodeMap  HTMLCollection
  Array  forEach  forEach  NodeList  NamedNodeMap  HTMLCollection
  Array  reduce   reduce   NodeList  NamedNodeMap  HTMLCollection
  Node  textContent    text    Node
  Node  parentElement  parent  Node
  Element  querySelector           find    Element
  Element  querySelectorAll        query   Element
  Element  nextElementSibling      next    Element
  Element  previousElementSibling  prev    Element
  Element  lastElementChild        last    Element
  Element  firstElementChild       first   Element
  Element  clientWidth             width   Element
  Element  clientHeight            height  Element
  Element  childElementCount       count   Element
  Element  outerHTML               HTML    Element
`.trim().split('\n').map(x => x.match(/\S+/g));