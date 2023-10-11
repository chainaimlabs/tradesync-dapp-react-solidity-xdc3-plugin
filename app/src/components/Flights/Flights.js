import { useState, useContext } from 'react';

/*import './Flights.css';*/

const { executeTransaction, EthereumContext, log, queryData } = require('react-solidity-xdc3');

function Flights() {
  const [submitting, setSubmitting] = useState(false);

  const { provider, sample, consumer, flights } = useContext(EthereumContext);
  console.log("provider", provider);
  console.log("sample", sample);

  console.log("consumer", consumer);
  console.log("flights", flights);

  const registerFlights = async (event) => {
    log("register Flights 1");
    event.preventDefault();
    log("register Flights 2");
    setSubmitting(true);
    log("register Flights 3");
    let _flightAddress = "0x3A4E3ae71600879DE615F2B870F742552c4Aed5e";
    let _careerFlightNo = "ING695";
    let _serviceProviderName = "Indigo Airlines";
    log("register Flights 4");
    let response1 = await executeTransaction(flights, provider, 'registerFlights', [_flightAddress, _careerFlightNo, _serviceProviderName]);
    log("registerFlights", "hash", response1.txHash);
    log("register Flights 5");
    setSubmitting(false);
  }

  const fetchFlight = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let _flightId = "1";
    let _flightAddress = "0x3A4E3ae71600879DE615F2B870F742552c4Aed5e";
    let response1 = await queryData(sample, provider, 'flights', [_flightId, _flightAddress]);
    log("submitClaim", "hash", response1)
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
    let bookname = "My Second Book";
    let response = await executeTransaction(consumer, provider, 'addBooks', [bookname], 0);
    log("addBook", "hash", response)
    setSubmitting(false);
  }
  const retriveBook = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let bookid = 1;
    let response = await queryData(consumer, provider, 'books', [bookid]);
    log("retriveBook", "hash", response)
    setSubmitting(false);
  }

  return <div className="Container">
    <div>
      <h1>Register</h1><br></br>
      <form onSubmit={registerFlights}>

        alert({submitting});
        debugger;

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
      <h1>Show Price</h1><br></br>
      <form onSubmit={showPrice}>
        <button type="submit" disabled={submitting}>{submitting ? 'Fetching..' : 'Show Price '}</button>
      </form>
    </div>
    <div>
      <h1>Add Book </h1><br></br>
      <form onSubmit={addBook}>
        <button type="submit" disabled={submitting}>{submitting ? 'Adding Books..' : 'Add Book '}</button>
      </form>
    </div>
    <div>
      <h1>Retrieve Book </h1><br></br>
      <form onSubmit={retriveBook}>
        <button type="submit" disabled={submitting}>{submitting ? 'Retrieving Books..' : 'Show My Book '}</button>
      </form>
    </div>
  </div>
}

export default Flights;
