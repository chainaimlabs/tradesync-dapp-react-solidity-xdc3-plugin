//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IInvokeOracle {
    function requestData(address _caller) external returns (bytes32 requestId);

    function showPrice() external view returns (uint256);
}

contract InvoiceCustomerContract {
    //address CONTRACTADDR = 0x4C50a698F8148b2560eAdb50a8397b614DcfF6A0;
    address CONTRACTADDR   = 0xaeDe699b9a8Ed8bA43F8983A0b2F0728acbD6816;

    bytes32 public requestId;

    uint256 public _counter;

    struct Temp{
        uint256 id;
        string invoiceNumber;
        string invoiceContent; 
    }

    mapping(uint256 => Temp) public invoices;

    constructor(){
        _counter =1;
    }

    function addInvoices(string memory _invoiceNumber, string memory _invoiceContent) public {
        invoices[_counter] = Temp(
            _counter,
            _invoiceNumber,
            _invoiceContent
        );
        _counter+=1;
    }

    function requestData(address _caller) external returns (bytes32 requestId){

           (requestId) = IInvokeOracle(CONTRACTADDR).requestData({
            _caller: msg.sender
        });

        return requestId;

    }

    function showPrice() external view returns (uint256){
         return IInvokeOracle(CONTRACTADDR).showPrice();
    }


    //Fund this contract with sufficient PLI, before you trigger below function.
    //Note, below function will not trigger if you do not put PLI in above contract address
    function getPriceInfo() external returns (bytes32) {
        (requestId) = IInvokeOracle(CONTRACTADDR).requestData({
            _caller: msg.sender
        });
        return requestId;
    }

    //TODO - you can customize below function as you want, but below function will give you the pricing value
    //This function will give you last stored value in the contract
    function show() external view returns (uint256) {
        return IInvokeOracle(CONTRACTADDR).showPrice();
    }
}
