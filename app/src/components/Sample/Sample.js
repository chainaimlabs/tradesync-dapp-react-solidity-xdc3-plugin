import { useState, useContext } from 'react';
import { EthereumContext } from 'react-solidity-xdc3';
import './Sample.css';
const { executeTransaction, log, queryData } = require('react-solidity-xdc3');

function Sample() {
  const [submitting, setSubmitting] = useState(false);
  const { provider, sample, consumer, invoiceplugin, blplugin, invoiceconsumer, account } = useContext(EthereumContext);
  
  console.log("sample.js start provider", provider);
  console.log("consumer", consumer);

  const registerFlights = async (event) => {
    event.preventDefault();
    setSubmitting(true);
   
    let _flightAddress = sample.address;

    console.log("sample.js reg sample", sample.address);
    console.log("sample.js reg sample provider", provider.address);

    console.log("sample.js reg consumer NU ", consumer.address);

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



    console.log("sample.js reg sample", sample.address);
    console.log("sample.js reg sample provider", provider.address);

    console.log("sample.js reg consumer NU ", consumer.address);

    console.log("sample.js  fetch flightid  ",_flightId , ' flightAddress  ' , _flightAddress);

    let response1 = await queryData(sample, provider, 'flights', [_flightId, _flightAddress]);
    log("submitClaim", "hash", response1)
    setSubmitting(false);
  }


  async function fetchInvoiceFromFile(invoiceString){

    const response = await fetch(invoiceString);
    // waits until the request completes...

    const invJsonFromFile = await response.json();
    console.log(response);
    console.log(" invJsonFromFile  .." , invJsonFromFile );

    return invJsonFromFile;
  }

  const tokenizeInvoice = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let _invoiceAddress = sample.address;
    let _invoiceNumber = "INV101-1010-0456";
    //let _invoiceDemostring = "Invoice101";
   
    let invoiceString = "./tradedocuments-carrier-original/Invoice101.json";
    let storageInvoiceContentStringFromFile = await fetchInvoiceFromFile(invoiceString);
    let _invoiceDemostring = JSON.stringify(storageInvoiceContentStringFromFile);

    console.log("sample.js  invoicedemopluginAddress", _invoiceAddress);
    console.log("sample.js  invoicedemoplugin no", _invoiceNumber);
    console.log("sample.js  invoicedemo string", _invoiceDemostring);

    let response1 = await executeTransaction(sample, provider, 'tokenizeInvoices', [_invoiceAddress,_invoiceNumber,_invoiceDemostring], 0);
  
    log("tokenizeInvoice", "hash", response1.txHash)
    setSubmitting(false);
  }

  const fetchInvoice = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _invoiceId = "1";

    let _invoiceAddress = sample.address;
    let response1 = await queryData(sample, provider, 'invoices', [_invoiceId, _invoiceAddress]);

    log("fetchInvoiceFromXDC", "hash", response1);
    console.log(" fetched inv ", response1);
    setSubmitting(false);
  }

  const tokenizeBL= async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _blpluginAddress = "0xEb0b82401D23640ADc0dACB6c45e8c491E677cA5";
    let _blpluginnumber = "BL101";
    let _blstring = "BLdoc10001";

    console.log("sample.js  blAddress", _blpluginAddress);
    console.log("sample.js  blplugin no", _blpluginnumber);
        
    console.log("sample.js blString", _blstring);

    let response1 = await executeTransaction(sample, provider, 'tokenizeInvoice', [_blpluginAddress, _blpluginnumber,_blstring]);
    log("tokenizeBL", "hash", response1.txHash)
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

  const addBook = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    
    let bookName ="book-AB-C-1012-0708";

    console.log("sample.js add book sample  NU ", sample.address);
    console.log("sample.js add book provider", provider.address);
    console.log("sample.js add book consumer UUU ", consumer.address);
    console.log("sample.js add book bookName " , bookName);

    let response = await executeTransaction(consumer, provider, 'addBooks', [bookName], 0);

    //let invoiceString = "./tradedocuments-carrier-original/Invoice101.json";
    //let storageInvoiceContentStringFromFile = await fetchInvoiceFromFile(invoiceString);
    //console.log("sample.js  storageInvoiceContentStringFromFile  ", storageInvoiceContentStringFromFile);
    //let response = await executeTransaction(consumer, provider, 'addBooks', [JSON.stringify(storageInvoiceContentStringFromFile)], 0);
      
    console.log(" book . response .. " , bookName , response);
    log("addBook", "hash", response)
    setSubmitting(false);
  }

  const addInvoice = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let invoiceNumber = "INV-1011-1727";

    let invoiceString = "./tradedocuments-carrier-original/Invoice101.json";
    let storageInvoiceContentStringFromFile = await fetchInvoiceFromFile(invoiceString);
    console.log("sample.js   invoiceNumber storageInvoiceContentStringFromFile  ", invoiceNumber ,JSON.stringify(storageInvoiceContentStringFromFile));
    let response = await executeTransaction(invoiceconsumer, provider, 'addInvoices', [invoiceNumber,JSON.stringify(storageInvoiceContentStringFromFile)], 0);
  
    log("addInvoice", "hash", response);
    setSubmitting(false);
  }

  const retrieveBook = async (event) => {
    
    event.preventDefault();
    setSubmitting(true);

   let bookid = 1;
   //let retBookName ="book-1011-0627";

   console.log("sample.js ret book  sample NU ", sample.address);
   console.log("sample.js ret book  sample provider", provider.address);
   console.log("sample.js ret book  consumer UUU ", consumer.address);
   console.log("sample.js ret bbok bookName " , bookid);

   let response = await queryData(consumer, provider, 'books', [bookid]);
    //let response = await queryData(consumer, provider, 'books', [retBookname]);

    console.log(response);
    //var resJson = JSON.parse(response[1]);

    //console.log( "resJson  " + resJson.doc_type );

    setSubmitting(false);
  }

  const retrieveInvoice = async (event) =>{
    
    event.preventDefault();
    setSubmitting(true);

    let invoiceId = 1;
    console.log( " retrieve invoiceId  " + invoiceId);
    let response = await queryData(invoiceconsumer, provider, 'invoices', [invoiceId]);

    //let invoiceNumber = "INV-1011-1727";
    //let response = await queryData(invoiceconsumer, provider, 'invoices', [invoiceNumber]);

    //let retBookname = "My Second Book";
    //let response = await queryData(consumer, provider, 'books', [retBookname]);

    log("retrieveInvoice", "hash", response)
    setSubmitting(false);
  }
  
  return <div className="Container">

    <div>
      <h1>Register</h1><br></br>
      <form onSubmit={registerFlights}>
        <button type="submit" disabled={submitting}>{submitting ? 'Registering..' : 'Register Flights'}</button>
      </form>
    </div>

    <div>
      <h1>Fetch</h1><br></br>
      <form onSubmit={fetchFlight}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Fetch Flights '}</button>
      </form>
    </div>

    <div>
      <h1>Get Price Info</h1><br></br>
      <form onSubmit={getPriceInfo}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Get Price '}</button>
      </form>
    </div>

    <div>
      <h1>Tokenize Invoice</h1><br></br>
      <form onSubmit={tokenizeInvoice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Tokenizing.' : 'Invoice '}</button>
      </form>
    </div>

    <div>
      <h1>Fetch Invoice from XDC</h1><br></br>
      <form onSubmit={fetchInvoice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Fetch Invoice From XDC '}</button>
      </form>
    </div>


    <div>
     <h1>Show Price</h1><br></br>
      <form onSubmit={showPrice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Show Price '}</button>
     </form>
      </div>

  

     <div>
     <h1>Add Book </h1><br></br>
      <form onSubmit={addBook}>
      <button type="submit" disabled={submitting}>{submitting ? 'Adding Book..' : 'Add Book '}</button>
     </form>
    </div>


    <div>
     <h1>Retrieve Book </h1><br></br>
     <form onSubmit={retrieveBook}>
       <button type="submit" disabled={submitting}>{submitting ? 'Retrieving Book..' : 'Show My Book '}</button>
      </form>
    </div>


     <div>
     <h1>Add Invoice </h1><br></br>
      <form onSubmit={addInvoice}>
      <button type="submit" disabled={submitting}>{submitting ? 'Adding Invoice..' : 'Add Invoice '}</button>
     </form>
    </div>

    <div>
     <h1>Retrieve Invoice </h1><br></br>
     <form onSubmit={retrieveInvoice}>
       <button type="submit" disabled={submitting}>{submitting ? 'Retrieving Invoice..' : 'Show My Invoice '}</button>
      </form>
    </div>


    <div>
      <h1>Tokenize BL </h1><br></br>
      <form onSubmit={tokenizeBL}>
        <button type="submit" disabled={submitting}>{submitting ? 'Tokenizng..' : 'BL '}</button>
      </form>
    </div>


  </div>
}

export default Sample;
