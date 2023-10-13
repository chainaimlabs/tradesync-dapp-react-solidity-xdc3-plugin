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

  const tradesyncplugin = await deploy('TradeSyncPluginContract',"0xb3db178db835b4dfcb4149b2161644058393267d");
  console.log("tradetyncplugin deployed to:", tradesyncplugin.address);

  const invoiceconsumer = await deploy('InvoiceCustomerContract');
  console.log("invoiceconsumer deployed to:", invoiceconsumer.address);

  const bl721 = await deploy('BL721Contract');
  console.log("bl721 deployed to:", bl721.address);
  
  const invoice721 = await deploy('Invoice721Contract');
  console.log("invoice721 deployed to:", invoice721.address);

  writeFileSync('output.json', JSON.stringify({
    SampleContract: sample.address,
    CustomerContract: consumer.address,
    FlightsContract: flights.address,
    BL721Contract: bl721.address, 
    Invoice721Contract: invoice721.address,
    TradeSyncPluginContract: tradesyncplugin.address,
    InvoiceCustomerContract: invoiceconsumer.address,
  }, null, 2));

}
if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}