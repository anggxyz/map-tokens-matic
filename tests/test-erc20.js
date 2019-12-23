const Matic = require('maticjs').default
const network = require('../network.json')
const config = require('../config.json')
const tokenDetails = require('token.json')
const token = tokenDetails.root // test token address
const amount = '1' // amount in wei

const matic = new Matic({
  maticProvider: network.child,
  parentProvider: network.root,
  rootChainAddress: config.rootChainAddress,
  syncerUrl: network.syncer,
  watcherUrl: network.watcher,
})

matic.wallet = '' // enter private key of the account to test from
const from = '' // address of the private key above
// Approve token
matic
  .approveERC20TokensForDeposit(token, amount, {
    from,
    onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash) // eslint-disable-line
    },
  })
  .then(() => {
    // Deposit tokens
    matic.depositERC20Tokens(token, from, amount, {
      from,
      onTransactionHash: (hash) => {
        // action on Transaction success
        console.log(hash) // eslint-disable-line
      },
    })
  })
