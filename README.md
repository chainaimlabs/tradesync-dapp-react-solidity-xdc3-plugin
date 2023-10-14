# TRADESYNC


TRADESYNC is a trade platform built on blockchain and hyperproductive dAPP for doscument and data handling , provenance and decision convergence.

##Problem Statement

Trade finance, particularly cross-borders, has been opaque limiting operational efficiencies and financial access. Though institutional investors want to enter the space, the lack of transparency and not able to identify reliable assets has been a barrier. Beyond operational issues, it is a working capital issue and most MSMEs particularly in developing nations are excluded from the financial system. Some stats show more than 70% of Indian MSMEs are in the informal sector. Most of them are owner-workers , and predominantly tagged as Geographical Indicator occupations.

##Solution 

Trade Sync is a trade platform for MSME Trade Finance functions. It is a DLT implementation that supports interpretation of the recent law, for effectively using both ownership of the trade finance documents and the underlying content, as factors for actors to prove their ownership. Adds on to basic document pointers, a layer of underlying asset integrity by way of composable tokenized assets.

The title document - the Bill of Lading, and the Commercial Invoice - the Accounts Receivables are interesting to institutional investors if they can be transparent, dispute-free, and reliable.

Tradesync creates these efficiencies by a combination of DLT, AI, and hyper-productive flows, and builds counter-party registries and deep provenance, and composable tokenization to keep the integrity at each layer, and transfer the ownership. For MSMEs, this technology opens up many negotiable instruments and broader financial access.

We are building it with DLT tech that are reliable business ledgers with Fast finality, low transaction fees, and have the pathway for sub-net and public ledgers to have full flexibility. Based on research, we are using the XDC network to build the solution. We are using the Plugin component for interacting with the XDC blockchain and for building on needed Oracle injections. The implementation has provided many feasibility points for us. We are planning to extend this to the launch site in the next few months.

The first set of proof points on the XDC ledger, and the Plugin Client have been successful.

## What's next

Continue to work on these items and expand the designs for effective on-chain and off-chain aggregations. Identify needed enhancements to XDC / Plugin.
Follow the phygital notions from the law evolution. Paper and eBL co-exist, and natural progression for eBL.
We will be working on specific studies and design of experiments. Planning a before and after study. 
Conceptualize and work with XDC Foundation, given that XDC is showing traits of enterprise solutions-oriented functionality in trade/insurance verticals.

## Video

The video is available at :  

https://www.youtube.com/watch?v=Ody_Itgo4FQ

## Presentation deck : [TradeSync Presentation Deck] (./documents/TRADEINCLUSIVE-V2.ppt)

### The software architecture document, and screenshots are avaialble at : [TradeSync-SoftwareArchitecture-Design] (./documents/TradeSyncArchitectureDesign.docx)
### The profiles of the founders, their technical background in blockchains and trade policy consulting is avaialble at  [Profiles] (./documents/profiles)

The long github repository is up to date for both the demo and will be updated for the the pre-launch live app builds.

### Thanks to the XDC and Plugin teams for their support

## HOW TO RUN TRADESYNC

##  React-Solidity DAPP   Powered by Plugin(A decentralized Oracle)

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
