import { useState, useContext } from 'react';
import { EthereumContext } from 'react-solidity-xdc3';
import './TradeSyncDemo.css';

const { executeTransaction, log, queryData } = require('react-solidity-xdc3');

function TradeSyncDemo() {

  const [submitting, setSubmitting] = useState(false);
  const { provider, sample, consumer, tradesyncplugin, invoiceconsumer, invoice721, bl721, account } = useContext(EthereumContext);
  
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

  function validateTradeContentComposition(innerDocContent, innerDocStandard, outerDocContent, outerDocStandard, _integrity)
  {
 
// Sathya Krishnasamy.  Oct 11, 2023 .

    // As an example, I have loaded in the content from some representative integral and 
    // non-integral documents based on 
    // the DCSA standard for the Bill of Lading which is the title document. 
    // and the Consumer Invoice the key document to be tokenized for Account Receivable Financing 

    // The implmentation shows the how the strucutral integrity of the underlying content in the 
    // documents can be used for actual reconciliations and better yet consistently avoid them in the
    // first place. These will typically be the combination of document extracts, and the data and metadata
    // that produced those trade documents in the first place. 

    // These requests are fielded from the engagements ChainAim experts are having with various governments
    //and trade entities globally, and the implementation is also based on the interpretation of the law
    // as to how the eBL integrity can be maintained and also use it for driving high productivity. 
    // currently the paper process actually needs the trade documents to be courier'd. , which the importer bank
    // and the importer will eventually use to clear the cargo. 
  
    // TO DO .. to support multiple composition schemes to be plugged in through oracles
    // for evolving standards and physical / digital guidelines.

    // The document content and their hash will also be stored, and with the ownership change the verifier
    // can check for the current owner and the integrity of the tokenized document when procuced looking 
    // in to the underlying contecxtual integrity 

    // The actual Implementattion will be configuratble based on which element from the 
    // invoice should be matched with which element in the BL. 
    // This could differ between corridors, and we will have to evolve the standards. 

    // Finally these structures along with the right oracles and the configurations wil be 
    // ported to our main platform as NFTs which are currently in another financial cross border-native chain
    // that needs more flexbility in modeling these integrity constructs. 

  console.log( " Bl standard " + outerDocStandard + " invoice standard " + innerDocStandard);
  console.log( " Inner Doc Content ( INVOICE ) " + innerDocContent);
  console.log( " Outer Doc Content ( BL )  " + outerDocContent);

  var integrity = _integrity;

  var isCompositionValid = true;
    if(integrity == 'y' ){
       isCompositionValid = true;
    }
    else{
      isCompositionValid = false;
    }

     return isCompositionValid;

  }


  const tokenizeInvoice = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let _tradesyncpluginAddress = tradesyncplugin.address;
    let _invoiceNumber = "INVG10001-1013-0629";
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

  const fetchInvoice = async (event) =>  {

    event.preventDefault();
    setSubmitting(true);
    let _invoiceId = "1";
    let _tradesyncpluginAddress = tradesyncplugin.address;

    log("TSD.js _tradesyncpluginAddress  ", _tradesyncpluginAddress);

    let response1 = await queryData(tradesyncplugin, provider, 'invoices', [_invoiceId, _tradesyncpluginAddress]);

    log("TSD.js fetchInvoiceFromXDC", "hash", response1);

    console.log(" fetched inv ", response1);
    //return response1;
    setSubmitting(false);

  }

const tokenizeBLG = async (event) => {

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
    //console.log("TSD.js  blDemo content  ", _blDemoContent);
    
    //let invoiceContent =  await fetchInvoice();
    let invoiceStandard = "namm";
    let blStandard = "dcsa";
    let invoiceFileString = "./tradedocuments-carrier-original/INVG10001NAMM.json";


    let storageInvoiceContentStringFromFile = await readInvoiceFromFile(invoiceFileString);
    // let invoiceContentJSON = JSON.parse(invoiceContentResponse);
      let blContentJSON = _blDemoContent;
      let invoiceContentJSON = JSON.stringify(storageInvoiceContentStringFromFile);
      //console.log( "invoiceContentJson  " , invoiceContentJSON );

    let validIntegrity = validateTradeContentComposition(invoiceContentJSON, invoiceStandard,blContentJSON,blStandard,'y');

    console.log("TSD.js VALID ", validIntegrity, " blDemo content Hash  ", _blDemoContentHash);

    
    if( validIntegrity === true  ){

      console.log("TSD.js  blDemo content Hash  ", _blDemoContentHash);

           let response1 = await executeTransaction(tradesyncplugin, provider, 'tokenizeBLs', [_tradesyncpluginAddress,_blNumber,_blDemoContent,_blDemoContentHash], 0);
           log("tokenizeBL", "hash", response1.txHash)

           console.log(" BL CREATED. Integral and composable with related documents - AR Invoice ");

    }
    setSubmitting(false);
  }

  const tokenizeBLB = async (event) => {

    event.preventDefault();
    setSubmitting(true);

    let _tradesyncpluginAddress = tradesyncplugin.address;
    let _blNumber = "BLG10001-1012-2045";

    console.log (" tok bl 1 ", );
    //let blFileString = "./tradedocuments-carrier-original/BLdoc10001.json";
    let blFileString = "./tradedocuments-carrier-original/BLB10001.json";
    
    console.log (" tok bl 2 ", );
    let storageBLContentStringFromFile = await readBLFromFile(blFileString);
    console.log (" tok bl 3 .. ",  );
    let _blDemoContent = JSON.stringify(storageBLContentStringFromFile);
    console.log (" tok bl 4 .. ", _blDemoContent );

    let _blDemoContentHash = await digestMessage(_blDemoContent);

    console.log("TSD.js  bldemopluginAddress", _tradesyncpluginAddress);
    console.log("TSD.js  bldemoplugin no", _blNumber);
   // console.log("TSD.js  blDemo content  ", _blDemoContent);
    
    //let invoiceContent =  await fetchInvoice();
    let invoiceStandard = "namm";
    let blStandard = "dcsa";
    let invoiceFileString = "./tradedocuments-carrier-original/INVG10001NAMM.json";


    let storageInvoiceContentStringFromFile = await readInvoiceFromFile(invoiceFileString);
    // let invoiceContentJSON = JSON.parse(invoiceContentResponse);
      let blContentJSON = _blDemoContent;
      let invoiceContentJSON = JSON.stringify(storageInvoiceContentStringFromFile);
     // console.log( "invoiceContentJson  " , invoiceContentJSON );

    let validIntegrity = validateTradeContentComposition(invoiceContentJSON, invoiceStandard,blContentJSON,blStandard,'n');

    console.log("TSD.js VALID ", validIntegrity, " blDemo content Hash  ", _blDemoContentHash);

    console.log(" DISCREPENCY WITH THE INVOICE. PER CONFIGURATION BL IS NOT CREATED..  ");

    
    if( validIntegrity === true  ){

      console.log("TSD.js  blDemo content Hash  ", _blDemoContentHash);

           let response1 = await executeTransaction(tradesyncplugin, provider, 'tokenizeBLs', [_tradesyncpluginAddress,_blNumber,_blDemoContent,_blDemoContentHash], 0);
           log("tokenizeBL", "hash", response1.txHash)

    }
    
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
    return response1;
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

    log("retrieveInvoice", "hash", response)
    setSubmitting(false);
  }


  const addBook = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    
    let bookName ="book-1011-0627";
    let response = await executeTransaction(consumer, provider, 'addBooks', [bookName], 0);

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
      <h5>Tokenize Invoice</h5>
      <form onSubmit={tokenizeInvoice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Tokenizing.' : 'Invoice '}</button>
      </form>
    </div>
    <br></br>
    <div>
      <h5>Fetch Invoice XDC</h5><br></br>
      <form onSubmit={fetchInvoice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Fetch Invoice '}</button>
      </form>
    </div>
    <br></br>
    <div>
      <h5>Tokenize BL-GOOD </h5>
      <form onSubmit={tokenizeBLG}>
        <button type="submit" disabled={submitting}>{submitting ? 'Tokenizng..' : 'BL-G '}</button>
      </form>
    </div>
    <br></br>
    <div>
      <h5>Tokenize BL-BAD</h5>
      <form onSubmit={tokenizeBLB}>
        <button type="submit" disabled={submitting}>{submitting ? 'Tokenizng..' : 'BL-B '}</button>
      </form>
    </div>
    <br></br>
    <div>
      <h5>Fetch BL</h5>
      <form onSubmit={fetchBL}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Fetch BL '}</button>
      </form>
    </div>
    <br></br>
     <div>
     <h5> Add Invoice </h5>
      <form onSubmit={addInvoice}>
      <button type="submit" disabled={submitting}>{submitting ? 'Adding Invoice..' : 'Add Invoice '}</button>
     </form>
    </div>
    <br></br>
    <div>
     <h5>Retrieve Invoice </h5>
     <form onSubmit={retrieveInvoice}>
       <button type="submit" disabled={submitting}>{submitting ? 'Retrieving Invoice..' : 'Show Invoice '}</button>
      </form>
    </div>
    <br></br>
    <div>
      <h5>Get Price Info</h5>
      <form onSubmit={getPriceInfo}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Get Price '}</button>
      </form>
    </div>
    <br></br>
    <div>
     <h5>Show Price</h5>
      <form onSubmit={showPrice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Show Price '}</button>
     </form>
      </div>


  </div>
}
export default TradeSyncDemo;
