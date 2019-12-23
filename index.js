'use strict';
var inquirer = require('inquirer');
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')

console.log('Map assets for tranfer and withdrawal');

var questions = [
  {
    type: 'input',
    name: 'owner',
    message: "Address of token owner on root:",
    validate: function(value) {
      var pass = value.match(
        /^0x[a-fA-F0-9]{40}$/g
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid address';
    }
  },
  {
    type: 'input',
    name: 'token',
    message: "Token address on root:",
    validate: function(value) {
      var pass = value.match(
        /^0x[a-fA-F0-9]{40}$/g
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid token address';
    }
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name of Token'
  },
  {
    type: 'input',
    name: 'symbol',
    message: 'Symbol of Token'
  },
  {
    type: 'input',
    name: 'decimals',
    message: 'Decimals',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default: 0
  },
  {
    type: 'confirm',
    name: 'isNft',
    message: 'Is this an ERC721?',
    default: false
  }
];

let filePath = './token.json';

inquirer.prompt(questions).then(answers => {
  console.log('\nConfirm the following and run `node map.js`:');
  console.log(JSON.stringify(answers, null, '  '));
  const dirPath = path.dirname(filePath)
  mkdirp.sync(dirPath)

  const fileData = JSON.stringify(answers);
  fs.writeFileSync(filePath, fileData)
});