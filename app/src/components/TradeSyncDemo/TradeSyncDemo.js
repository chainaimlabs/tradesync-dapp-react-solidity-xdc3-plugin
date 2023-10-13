import { useState, useContext } from 'react';
import { EthereumContext } from 'react-solidity-xdc3';
import './TradeSyncDemo.css';
const { executeTransaction, log, queryData } = require('react-solidity-xdc3');

function TradeSyncDemo() {
  const [submitting, setSubmitting] = useState(false);
  const { provider, sample, consumer, tradesyncplugin, invoiceconsumer, invoice721, bl721, account } = useContext(EthereumContext);
  
  /*
  const registerFlights = async (event) => {
    event.preventDefault();
    setSubmitting(true);
   
    let _flightAddress = sample.address;

    console.log("sample.js reg sample", sample.address);
    console.log("sample.js reg consumer", consumer.address);

    let _careerFlightNo = "1ING695";
    let _serviceProviderName = "Indigo Airlines";

    console.log("sample.js  careerflight no", _careerFlightNo);
    console.log("sample.js serviceProviderName", _serviceProviderName);

    console.log("sample.js  register flightAddress signer" , account);

    let response1 = await executeTransaction(sample, provider, 'registerFlights', [_flightAddress, _careerFlightNo, _serviceProviderName]);
    log("registerFlights", "hash", response1.txHash)
    setSubmitting(false);
  }

  const fetchFlight = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _flightId = "1";

    let _flightAddress = sample.address;

    console.log("sample.js  fetch flightAddress", _flightAddress);
    console.log("sample.js  fetch flightAddress   sample ..", sample);

    let response1 = await queryData(sample, provider, 'flights', [_flightId, _flightAddress]);
    log("submitClaim", "hash", response1)
    setSubmitting(false);
  }
*/

  async function readContentFromFile(fileString){

    console.log (" read content from .. " + fileString);

    const response = await fetch(fileString);
    // waits until the request completes...

    const contentFromFile = await response.json();
    console.log(response);
    console.log(" contentFromFile  .." , contentFromFile );
    return contentFromFile;
  }

  async function readInvoiceFromFile(invFileString){
    const invContentFromFile = readContentFromFile(invFileString);
    return invContentFromFile;
  }

  async function readBLFromFile(blFileString){
    const invContentFromFile = readContentFromFile(blFileString);
    return invContentFromFile;
  }

  async function digestMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hash;
  }

  function validateTradeContentComposition(innerDocContent, innterDocStandard, outerDocContent, outerDocStandard)
  {
    // TO DO .. to support multiple composition schemes to be plugged in through oracles
    // for evolving standards and physical / digital guidelines.

    var isCompositionValid = new Boolean(true);
 
     return isCompositionValid;
  }


  const tokenizeInvoice = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let _tradesyncpluginAddress = tradesyncplugin.address;
    let _invoiceNumber = "INVG10001-1012-1938";
    //let _invoiceDemostring = "Invoice101";

    console.log (" tok Inv 1 ", );
    let invoiceFileString = "./tradedocuments-carrier-original/INVG10001NAMM.json";
    //let invoiceFileString = "./tradedocuments-carrier-original/Invoice101.xml";

    console.log (" tok Inv 2 ", );
    let storageInvoiceContentStringFromFile = await readInvoiceFromFile(invoiceFileString);
    console.log (" tok Inv 3 ", );
    let _invoiceDemoContent = JSON.stringify(storageInvoiceContentStringFromFile);
    console.log (" tok Inv 4 ", );
    let _invoiceDemoContentHash = await digestMessage(_invoiceDemoContent);
    

    console.log("TSD.js  invoicedemopluginAddress", _tradesyncpluginAddress);
    
    console.log("TSD.js  invoicedemoplugin no", _invoiceNumber);
    console.log("TSD.js  invoiceDemoContent  ", _invoiceDemoContent);
    console.log("TSD.js  invoiceDemoContentHash  ", _invoiceDemoContentHash);

    let response1 = await executeTransaction(tradesyncplugin, provider, 'tokenizeInvoices', [_tradesyncpluginAddress,_invoiceNumber,_invoiceDemoContent,_invoiceDemoContentHash], 0);
  
    log("tokenizeInvoice", "hash", response1.txHash)
    setSubmitting(false);
  }

  const fetchInvoice = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _invoiceId = "1";
    let _tradesyncpluginAddress = tradesyncplugin.address;

    log("TSD.js _tradesyncpluginAddress  ", _tradesyncpluginAddress);

    let response1 = await queryData(tradesyncplugin, provider, 'invoices', [_invoiceId, _tradesyncpluginAddress]);

    log("TSD.js fetchInvoiceFromXDC", "hash", response1);
    console.log(" fetched inv ", response1);
    setSubmitting(false);
  }

const tokenizeBL = async (event) => {

    event.preventDefault();
    setSubmitting(true);

    let _tradesyncpluginAddress = tradesyncplugin.address;
    let _blNumber = "BLG10001-1012-2045";

    console.log (" tok bl 1 ", );
    //let blFileString = "./tradedocuments-carrier-original/BLdoc10001.json";
    let blFileString = "./tradedocuments-carrier-original/BLG10001.json";
    
    console.log (" tok bl 2 ", );
    let storageBLContentStringFromFile = await readBLFromFile(blFileString);
    console.log (" tok bl 3 .. ",  );
    let _blDemoContent = JSON.stringify(storageBLContentStringFromFile);
    console.log (" tok bl 4 .. ", _blDemoContent );

    let _blDemoContentHash = await digestMessage(_blDemoContent);

    console.log("TSD.js  bldemopluginAddress", _tradesyncpluginAddress);
    
    console.log("TSD.js  bldemoplugin no", _blNumber);
    console.log("TSD.js  blDemo content  ", _blDemoContent);

    let invoiceContent ="invoiceContent";
    let  invoiceStandard = "invoiveStandard";
    let blContent = "blContent";
    let blStandard = "blStandard";

    validateTradeContentComposition(invoiceContent, invoiceStandard,blContent,blStandard);

    console.log("TSD.js  blDemo content Hash  ", _blDemoContentHash);

    let response1 = await executeTransaction(tradesyncplugin, provider, 'tokenizeBLs', [_tradesyncpluginAddress,_blNumber,_blDemoContent,_blDemoContentHash], 0);
  
    log("tokenizeBL", "hash", response1.txHash)
    setSubmitting(false);

  }

  const fetchBL = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _blId = "5";
    let _tradesyncpluginAddress = tradesyncplugin.address;

    log("TSD.js _tradesyncpluginAddress  ", _tradesyncpluginAddress);

    let response1 = await queryData(tradesyncplugin, provider, 'bls', [_blId, _tradesyncpluginAddress]);

    log("TSD.js fetchInvoiceFromXDC", "hash", response1);
    console.log(" fetched inv ", response1);
    setSubmitting(false);
  }



  const addInvoice = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let invoiceNumber = "INV-1011-1727";

    let invoiceFileString = "./tradedocuments-carrier-original/Invoice101.json";
    let storageInvoiceContentStringFromFile = await readInvoiceFromFile(invoiceFileString);
    console.log("sample.js   invoiceNumber storageInvoiceContentStringFromFile  ", invoiceNumber ,JSON.stringify(storageInvoiceContentStringFromFile));
    let response = await executeTransaction(invoiceconsumer, provider, 'addInvoices', [invoiceNumber,JSON.stringify(storageInvoiceContentStringFromFile)], 0);
  
    log("addInvoice", "hash", response);
    setSubmitting(false);
  }

  const retrieveInvoice = async (event) =>{
    
    event.preventDefault();
    setSubmitting(true);

    let invoiceId = 2;
    console.log( " retrieve invoiceId  " + invoiceId);
    //let response = await queryData(invoiceconsumer, provider, 'invoices', [invoiceId]);
    let response = await queryData(invoiceconsumer, provider, 'invoices', [invoiceId]);

    //let invoiceNumber = "INV-1011-1727";
    //let response = await queryData(invoiceconsumer, provider, 'invoices', [invoiceNumber]);

    //let retBookname = "My Second Book";
    //let response = await queryData(consumer, provider, 'books', [retBookname]);

    log("retrieveInvoice", "hash", response)
    setSubmitting(false);
  }

  const addBook = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    
    let bookName ="book-1011-0627";
    let response = await executeTransaction(consumer, provider, 'addBooks', [bookName], 0);

    //let invoiceString = "./tradedocuments-carrier-original/Invoice101.json";
    //let storageInvoiceContentStringFromFile = await fetchInvoiceFromFile(invoiceString);
    //console.log("sample.js  storageInvoiceContentStringFromFile  ", storageInvoiceContentStringFromFile);
    //let response = await executeTransaction(consumer, provider, 'addBooks', [JSON.stringify(storageInvoiceContentStringFromFile)], 0);
      
    console.log(" book . response .. " , bookName , response);
    log("addBook", "hash", response)
    setSubmitting(false);
  }

  const retrieveBook = async (event) => {
        event.preventDefault();
    setSubmitting(true);

    let bookid = 1;
    //let retBookName ="book-1011-0627";
    let response = await queryData(consumer, provider, 'books', [bookid]);
    //let response = await queryData(consumer, provider, 'books', [retBookname]);

    console.log(response);
    //var resJson = JSON.parse(response[1]);
    //console.log( "resJson  " + resJson.doc_type );
    setSubmitting(false);
  }

  const getPriceInfo = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let response1 = await executeTransaction(consumer, provider, 'getPriceInfo', [], 0);
    log("getPriceInfo", "hash", response1.txHash)
    setSubmitting(false);
  }

  const showPrice = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let response = await queryData(consumer, provider, 'show', []);
    log("showPrice", "hash", response)
    setSubmitting(false);
  }

  return <div className="Container">

    <div>
      <h3>Tokenize Invoice</h3><br></br>
      <form onSubmit={tokenizeInvoice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Tokenizing.' : 'Invoice '}</button>
      </form>
    </div>

    <div>
      <h3>Fetch Invoice from XDC</h3><br></br>
      <form onSubmit={fetchInvoice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Fetch Invoice '}</button>
      </form>
    </div>


    <div>
      <h3>Tokenize BL </h3><br></br>
      <form onSubmit={tokenizeBL}>
        <button type="submit" disabled={submitting}>{submitting ? 'Tokenizng..' : 'BL '}</button>
      </form>
    </div>


    <div>
      <h3>Fetch BL</h3><br></br>
      <form onSubmit={fetchBL}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Fetch BL '}</button>
      </form>
    </div>



     <div>
     <h3>Add Invoice </h3><br></br>
      <form onSubmit={addInvoice}>
      <button type="submit" disabled={submitting}>{submitting ? 'Adding Invoice..' : 'Add Invoice '}</button>
     </form>
    </div>

    <div>
     <h3>Retrieve Invoice </h3><br></br>
     <form onSubmit={retrieveInvoice}>
       <button type="submit" disabled={submitting}>{submitting ? 'Retrieving Invoice..' : 'Show Invoice '}</button>
      </form>
    </div>



    <div>
      <h3>Get Price Info</h3><br></br>
      <form onSubmit={getPriceInfo}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Get Price '}</button>
      </form>
    </div>

    <div>
     <h3>Show Price</h3><br></br>
      <form onSubmit={showPrice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Show Price '}</button>
     </form>
      </div>

  </div>
}
export default TradeSyncDemo;
