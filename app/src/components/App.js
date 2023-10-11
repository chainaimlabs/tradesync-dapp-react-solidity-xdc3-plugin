import { ethers } from 'ethers';
import './App.css';
import Sample  from './Sample/Sample';
import Flights from './Flights/Flights';
import Header from './Header/Header';
import { abi } from '../artifacts/contracts/SampleContract.sol/SampleContract.json';
import { SampleContract as address } from '../output.json';
import { abi as consumerabi} from '../artifacts/contracts/CustomerContract.sol/CustomerContract.json';
import { CustomerContract as customeraddress } from '../output.json';
import { abi as flightsabi} from '../artifacts/contracts/FlightsContract.sol/FlightsContract.json';
import { FlightsContract as flightsaddress } from '../output.json';

import { InvoiceContract as invoiceaddress } from '../output.json';
import { abi as invoiceabi} from '../artifacts/contracts/InvoiceContract.sol/InvoiceContract.json';

import { InvoicePluginContract as invoicepluginaddress } from '../output.json';
import { abi as invoicepluginabi} from '../artifacts/contracts/InvoicePluginContract.sol/InvoicePluginContract.json';

import { BLContract as bladdress } from '../output.json';
import { abi as blabi} from '../artifacts/contracts/BLContract.sol/BLContract.json';


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

    console.log('app.js  2 ' );
    
    event.preventDefault();
    console.log('app.js  3 ' );
    const instance = await web3Modal.connect();
    console.log('app.js  4 ' );
    const { provider, signer } = await createWeb3Provider(instance);
    
    console.log('app.js  instance ' + instance);
    
    console.log('app.js  provider ' + provider);
    console.log('app.js  signer '   + signer);

   const sample = await createContractInstance(address, abi, provider);
   
   const consumer = await createContractInstance(customeraddress, consumerabi, provider); 
   
   /*const flights  = await createContractInstance(flightsaddress, flightsabi, provider); */

   //const invoice = await createContractInstance(invoiceaddress, invoiceabi, provider); 

   const invoiceplugin = await createContractInstance(invoicepluginaddress, invoicepluginabi, provider); 

   const bl = await createContractInstance(bladdress, blabi, provider); 

   
    const account = signer.getAddress();
    //setethereumContext({ provider, sample, account, consumer,flights})


    console.log('app.js setEC provider ' + provider);
    console.log('app.js setEC signer '   + sample);

    console.log('app.js setEC account ' + account);
    console.log('app.js setEC consumer '   + consumer);

    console.log('app.js setEC invoiceplugin ' + invoiceplugin);
    console.log('app.js setEC bl '   + bl);
    
    //setethereumContext({ provider, sample, account, consumer})

    //setethereumContext({ provider, sample, account, consumer, invoice, bl})

    setethereumContext({ provider, sample, account, consumer, invoiceplugin, bl})

    log("Connect", "Get Address", await signer.getAddress());

    setconnecting(true);
  }
  
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>Sample Decentralized Application </h1>
        <p>Powered by react-solidity-xdc3 Package</p>
        <p>Contributed by GoPlugin(www.goplugin.co)</p>
        <form onSubmit={connect}>
          <button type="submit" disabled={connecting}>{connecting ? 'Connecting...' : 'Connect'}</button>
        </form>
      </header>
      <section className="App-content">
        <EthereumContext.Provider value={ethereumContext}>
          <Sample />
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}

export default App;