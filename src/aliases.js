const arrayTerms = [
  { alias: 'map'     , name: 'map' },
  { alias: 'each'    , name: 'forEach' },
  { alias: 'reduce'  , name: 'reduce' },
  { alias: 'filter'  , name: 'filter' }];
module.exports = [{
  src: Node, terms: [
    { alias: 'text',   name: 'textContent' },
    { alias: 'parent', name: 'parentElement' }]},
  { src: Element, terms: [
    { alias: 'find'   , name: 'querySelector' },
    { alias: 'query'  , name: 'querySelectorAll' },
    { alias: 'next'   , name: 'nextElementSibling' },
    { alias: 'prev'   , name: 'previousElementSibling' },
    { alias: 'last'   , name: 'lastElementChild' },
    { alias: 'first'  , name: 'firstElementChild' },
    { alias: 'width'  , name: 'clientWidth' },
    { alias: 'height' , name: 'clientHeight' },
    { alias: 'count'  , name: 'childElementCount' },
    { alias: 'HTML'   , name: 'outerHTML' }]},
  { src: Array, terms: arrayTerms, trg: NodeList },
  { src: Array, terms: arrayTerms, trg: NamedNodeMap },
  { src: Array, terms: arrayTerms, trg: HTMLCollection }];