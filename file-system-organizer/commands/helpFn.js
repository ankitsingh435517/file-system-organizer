
function helpFn() {
    console.log(`
          List of All commands
                 node main.js tree 'directory Path'
                 node main.js organize 'directory Path'
                 node help
              `)
}

module.exports = {
    helpKey:helpFn
}