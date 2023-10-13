# TRADESYNC





























## Powered by Plugin(A decentralized Oracle)

This guide will give you a clear direction on how to deploy your smart contract, create react component and wire web3 package to push and pull the data onto/from blockchain.

if any queries / comments, feel free to raise an issue.

# IMPORTANT LINKS:
XDC Mainnet explorer - https://explorer.xinfin.network/
Apothem FAUCET - https://faucet.apothem.network/
Apothem Blockchain explorer - https://explorer.apothem.network/
XDCPay Wallet - https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo
NPM package - https://www.npmjs.com/package/react-solidity-web3-v2
XDC Remix - https://remix.xinfin.network/#optimize=true&runs=200&evmVersion=null&version=soljson-v0.4.26+commit.4563c3fc.js
Developer Forum -https://www.xdc.dev/
How to Articles - https://docs.xdc.community/learn/how-to-articles/
XDC Tools - https://xinfin.org/xdc-chain-network-tools-and-documents

# Table of Contents
- Pre-requisites
- How it works
- How to deploy
- How to create a component
- How to steup a function to submit txn to Blockchain
- How to query data from blockchain
- How to query events

## pre-requisites
- nvm version 0.37.2
- npm version 7.24.0
- node version 16.10.0
- do seup XDCPay Chrome Extension in your chrome 
- setup Hardhat (https://www.npmjs.com/package/hardhat)

## How it works?
- This project uses react-solidity-xdc3 npm package
- Copy down your contract in contract folder
- Update deplooyment script under scripts/ folder to refer your contract name
- Pass necessary constructor parameter if any
- If you have more than one contract to deploy, then refer those accordingly
- Pass your PRIVATE_KEY in .env to deploy your contract against specific network ( Apothem or Mainnet)
- After successfull deployment, copy down the output.json into App folder
- Go to App folder, creaet your component and call execute function for write, and queryData function for read

## .env should have following parameters
- PRIVATE_KEY(of your account) to migrate the contract

## How to RUn
- do git clone & npm install

```
 npm install
```
## How to deploy sample contract
```
yarn deploy --network apothem
```
this will deploy the contract in apothem network and contract address will be stored in output.json

copy down this contract address in app folder, under same output.json

## How to run client application
- After copying the contract address run react application using following command
```
yarn install
yarn start
```
this will start the application in http://localhost:3000 
