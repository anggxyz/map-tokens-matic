#!/usr/bin/env node
const Web3 = require('web3');
const network = require('./network.json')
const config = require('./config.json');
const ChildChainArtifacts = require('./abi/ChildChain.json');
const RegistryArtifacts = require('./abi/Registry.json');
const Token = require('./token.json')
var fs = require('fs');

let web3Child = new Web3(network.child);
let web3Root = new Web3(network.root);
let walletChild = web3Child.eth.accounts.wallet;
let walletRoot = web3Root.eth.accounts.wallet;

walletChild.add(config.childOwnerPrivateKey);
walletRoot.add(config.rootOwnerPrivateKey);

const ChildChainContract = new web3Child.eth.Contract(ChildChainArtifacts.abi, config.childChainContract);
const RegistryContract = new web3Root.eth.Contract(RegistryArtifacts.abi, config.registryContract);

let owner = Token.owner;
let rootToken = Token.token;
let name = Token.name;
let symbol = Token.symbol;
let decimals = Token.decimals;
let isNft = Token.isNft;

let mappedAddress

async function mapToken () {
    await ChildChainContract.methods.addToken(
        owner, 
        rootToken, 
        name, 
        symbol, 
        decimals, 
        isNft
    ).send({
        from: walletChild[0].address,
        gas: 5000000
    }).then((res) => {
        mappedAddress = res.events.NewToken.returnValues.token;
        console.log("mapped address on Matic chain: ", mappedAddress)
    })
    await RegistryContract.methods.mapToken(
        rootToken,
        mappedAddress,
        isNft
    ).send({
        from: walletRoot[0].address,
        gas: 5000000
    }).then(console.log('mapping successful.'));
    
    let toAppend = '\n' + name + ',' + rootToken + ',' + mappedAddress
    await fs.appendFileSync('mapped.csv', toAppend);
    let tokenDetails = '{"root":"'+ rootToken + '","child":"' + mappedAddress + '}';
    await fs.writeFile('tests/token.json', tokenDetails);
}

mapToken();