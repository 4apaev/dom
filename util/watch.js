const exec = require('child_process').exec;
const fs = require('fs');
const cwd = process.cwd();

const watch = (cmd, dir, msg) =>

  fs.watch(cwd + dir, { recursive: true }, (e, fileName) => {
    exec(cmd, (err, stdout, stderr) => {
      console.log(`[ ${ msg }:${ e } ] ${ fileName }`)
      console.log(err||stdout)
    })
  })


const { js, pug, mocha } = require(cwd + '/package.json').scripts;

watch(js,    '/src', 'js');
watch(mocha, '/tests', 'tests');
watch(pug,   '/views', 'pug');