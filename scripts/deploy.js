const { ethers } = require('hardhat');
const { writeFileSync } = require('fs');

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed())
}

async function main() {
  const sample = await deploy('SampleContract', "0xb3db178db835b4dfcb4149b2161644058393267d");
  console.log("sample deployed to:", sample.address);
  const consumer = await deploy('CustomerContract');
  console.log("consumer deployed to:", consumer.address);
  const flights = await deploy('FlightsContract', "0xb3db178db835b4dfcb4149b2161644058393267d");
  console.log("flights deployed to:", flights.address);
  const bl = await deploy('BLContract');
  console.log("BL deployed to:", bl.address);
  const invoice = await deploy('InvoiceContract');
  console.log("Invoice deployed to:", invoice.address);

  const invoiceplugin = await deploy('InvoicePluginContract',"0xb3db178db835b4dfcb4149b2161644058393267d");
  console.log("InvoicePlugin deployed to:", invoiceplugin.address);

  const invoiceconsumer = await deploy('InvoiceCustomerContract');
  console.log("InvoiceCustomer deployed to:", invoiceconsumer.address);

  writeFileSync('output.json', JSON.stringify({
    SampleContract: sample.address,
    CustomerContract: consumer.address,
    FlightsContract: flights.address,
    BLContract: bl.address, 
    InvoiceContract: invoice.address,
    InvoicePluginContract: invoiceplugin.address,
    InvoiceCustomerContract: invoiceconsumer.address,
  }, null, 2));

}
if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}