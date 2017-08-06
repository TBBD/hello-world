# hello-world
## HelloWorld contract example for meetup on 07/06/17

Steps from scratch for creating and deploying a HelloWorld contract

# Initial downloads

Download geth at https://geth.ethereum.org/downloads/

Once geth is downloaded, begin syncing the Rinkeby blockchain by opening a new terminal window and running `geth --rinkeby --fast`

Download truffle `npm install -g truffle`


# Create new directory
`mkdir HelloWorld`

## Init Truffle in Project
`truffle init`

## Remove unnecessary files
```
cd contracts/
rm ConvertLib.sol && rm MetaCoin.sol
cd ..
```
```
cd migrations/
rm 2_deploy_contracts.js
cd ..
```
```
cd test/
rm TestMetacoin.sol && rm metacoin.js
cd ..
```
## Create New HelloWorld contract
`truffle create contract HelloWorld`

See contracts/HelloWorld for code.

## Create migration for HelloWorld contract

`truffle create migration deploy_hello_world`

There is a bug with the above command that will cause your contract to fail migration. Change the name of `migration.js` to the created directory name.  In this case it is `1502019599_deploy_hello_world.js`. Place the file in the migrations directory and delete the directory that was created automatically. Please see /migrations to see structure.

Current release is 3.4.5. The pull request for fix this issue will be deployed in the next release of truffle.

See `migrations/1502019599_deploy_hello_world.js` for code.

## Deploy contract on testrpc
In terminal window downloading Rinkeby blockchain, `ctrl+C` to exit.

`testrpc`

Navigate to original terminal window

```
truffle compile
truffle migrate --reset
truffle console
```
## Interact with contract using testrpc
Create instance of contract for easy use
`HelloWorld.deployed().then(function(instance) { contract = instance })`

Check initial message
`contract.getMessage.call()`

Set new message
`contract.setMessage("Welcome to TBBD!")`

Check new message
`contract.getMessage.call()`

## Create an account with geth and get some test ether
Exit testrpc
`ctrl+C`

Run geth on rinkeby again but with additional commands
`geth rinkeby --rpc --rpcapi web3,db,personal,eth,net`

Retrieve ipc filepath from rinkeby startup information
Will look like `INFO [08-06|08:06:14] IPC endpoint opened: <path>`

Open a new terminal window
`geth attach ipc:<path>`

Create new account
`personal.newAccount("passphrase")`

Retrieve account address
`eth.accounts[0]`

Create public gist at https://gist.github.com/
Paste address in gist and click `Create public gist`
Navigate to https://faucet.rinkeby.io/ and paste in gist URL
Click Give me ether and wait 15-30 seconds to receive ether

Check balance in geth
`eth.getBalance(eth.accounts[0])`

## Deploy to rinkeby
Configure `truffle.js` for rinkeby testnet
See `truffle.js` for configuration code.

Get account address
`eth.accounts[0]`

Unlock account in geth console
`personal.unlockAccount(<address>)`

Deploy to rinkeby testnet
`truffle migrate --network rinkeby`

Wait about 1 minute to get final HelloWorld contract address
Search for deployed contract at https://rinkeby.etherscan.io with address

## Interact with contract

Get contract abi by navigating to https://ethereum.github.io/browser-solidity/
Copy paste contract code
On the right click contract details and copy the interface JSON

Navigate to geth console again
```
abi = <interface JSON>
contract = eth.contract(abi)
```
Copy the HelloWorld contract address from the migration
`instance = contract.at("address")`

Check deployed message
`instance.getMessage.call()`

Change message
`instance.setMessage("Welcome to TBBG!")`

Wait 15-30 seconds for transaction to get mined
Check deployed message
`instance.getMessage.call()`
