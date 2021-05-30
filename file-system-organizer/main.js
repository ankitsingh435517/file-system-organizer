
const treeObj = require('./commands/tree');
const organizeObj = require('./commands/organize');
const helpObj = require('./commands/help');

let inputArr = process.argv.slice(2); // input from user on terminal

let command = inputArr[0];

switch(command) {
    case 'tree':
        treeObj.treeKey(inputArr[1]);
        break;
    case 'organize':
        organizeObj.organizeKey(inputArr[1]);
        break;
    case 'help':
        helpObj.helpKey(inputArr[1]);
        break;
    default:
        console.log('pls enter a valid command');
        break;            
}