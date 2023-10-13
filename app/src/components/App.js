import { ethers } from 'ethers';
import './App.css';
import Sample  from './Sample/Sample';
import TradeSyncDemo  from './TradeSyncDemo/TradeSyncDemo';

//import Flights from './Flights/Flights';
import Header from './Header/Header';
import { abi } from '../artifacts/contracts/SampleContract.sol/SampleContract.json';
import { SampleContract as address } from '../output.json';
import { abi as consumerabi} from '../artifacts/contracts/CustomerContract.sol/CustomerContract.json';
import { CustomerContract as customeraddress } from '../output.json';

//import { abi as flightsabi} from '../artifacts/contracts/FlightsContract.sol/FlightsContract.json';
//import { FlightsContract as flightsaddress } from '../output.json';

import { TradeSyncPluginContract as tradesyncpluginaddress } from '../output.json';
import { abi as tradesyncpluginabi} from '../artifacts/contracts/TradeSyncPluginContract.sol/TradeSyncPluginContract.json';

import { InvoiceCustomerContract as invoiceconsumeraddress } from '../output.json';
import { abi as invoiceconsumerabi} from '../artifacts/contracts/InvoiceCustomerContract.sol/InvoiceCustomerContract.json';

import { Invoice721Contract as invoice721address } from '../output.json';
import { abi as invoice721abi} from '../artifacts/contracts/Invoice721Contract.sol/Invoice721Contract.json';

import { BL721Contract as bl721address } from '../output.json';
import { abi as bl721abi} from '../artifacts/contracts/BL721Contract.sol/BL721Contract.json';


import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { getWeb3Modal, createWeb3Provider, connectWallet, EthereumContext, createContractInstance, log } = require('react-solidity-xdc3');

var connectOptions = {
  rpcObj: {
    50: "https://erpc.xinfin.network",
    51: "https://erpc.apothem.network"
  },
  network: "mainnet",
  toDisableInjectedProvider: true
}

function App() {
  const [connecting, setconnecting] = useState(false);
  const [ethereumContext, setethereumContext] = useState({});
  const web3Modal = getWeb3Modal(connectOptions);

  console.log('app.js  1 ' );

  const connect = async (event) => {
 
    event.preventDefault();
    const instance = await web3Modal.connect();
    console.log('app.js  4 ' );
    const { provider, signer } = await createWeb3Provider(instance);

    console.log('app.js init provider ' + provider);
    console.log('app.js init signer   ' + signer)

    console.log('app.js init address2sample ..' + address);
    console.log('app.js init address2consumer ..  ' + customeraddress);
    
   const sample = await createContractInstance(address, abi, provider);   
   const consumer = await createContractInstance(customeraddress, consumerabi, provider);    

   /*const flights  = await createContractInstance(flightsaddress, flightsabi, provider); */
   
   const tradesyncplugin = await createContractInstance(tradesyncpluginaddress, tradesyncpluginabi, provider); 
   const invoiceconsumer = await createContractInstance(invoiceconsumeraddress, invoiceconsumerabi, provider); 

   const invoice721 = await createContractInstance(invoice721address, invoice721abi, provider); 
   const bl721 = await createContractInstance(bl721address, bl721abi, provider); 
   
   const account = signer.getAddress();
    //setethereumContext({ provider, sample, account, consumer,flights})

    console.log('app.js setEC provider ' + provider);
    console.log('app.js setEC account   ' + account);
    console.log('app.js setEC sample address', sample.address);
    console.log('app.js setEC consumer address ', consumer.address);
    console.log('app.js setEC tradesyncplugin address',  tradesyncplugin.address);
    console.log('app.js setEC invoiceconsumer address',  invoiceconsumer.address);
    console.log('app.js setEC invoice721 address',  invoice721.address);
    console.log('app.js setEC bl721 address',  bl721.address);

    setethereumContext({ provider, sample, account, consumer, tradesyncplugin,invoiceconsumer,invoice721,bl721});

    log("Connect", "Get signer Address", await signer.getAddress());
    setconnecting(true);

  }
  
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h3>TradeSync Demo </h3>
        <h5>Sathya Krishnasamy </h5>
        <h5>krisat3003@gmail.com  sathya@chainaim.com </h5>
        <p>uses react-solidity-xdc3 Package</p>
        <p>thanks to GoPlugin(www.goplugin.co)</p>
        <form onSubmit={connect}>
          <button type="submit" disabled={connecting}>{connecting ? 'Connecting...' : 'Connect'}</button>
        </form>
      </header>
      <section className="App-content">
        <EthereumContext.Provider value={ethereumContext}>
          <TradeSyncDemo/>
      </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}

export default App;