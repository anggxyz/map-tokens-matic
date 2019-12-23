# Map tokens on Matic chain

works for newer contracts on `testnet3`, `betav2`, `cs-1001`

## files to edit
- `./config.json`
- `./network.json`

for testing deposit of erc20 tokens, edit the file `test-erc20.js` to add private key and address of the account to test deposit from (in addition to this, token id for `test-erc721.js`).

## Usage
```bash
$ node index.js
# enter details of token on Ropsten

$ node map.js
```