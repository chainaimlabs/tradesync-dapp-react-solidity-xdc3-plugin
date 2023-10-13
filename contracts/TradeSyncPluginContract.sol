//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@goplugin/contracts/src/v0.8/PluginClient.sol";
import "./interface/IStatus.sol";

contract TradeSyncPluginContract is PluginClient, IStatus {

    using Counters for Counters.Counter;
    Counters.Counter private _invoiceIds;
    Counters.Counter private _blIds;

    using Plugin for Plugin.Request;

    uint256 private constant ORACLE_PAYMENT = 0.001 * 10**18;

    // address
    address public owner;

    mapping(uint256 => mapping(address => InvoiceMaster)) public invoices;
    mapping(uint256 => mapping(address => BLMaster)) public bls;

    constructor(address _pli) {
        setPluginToken(_pli);
        owner = msg.sender;
        _invoiceIds.increment();
        _blIds.increment();
    }

    modifier only_owner() {
        require(owner == msg.sender);
        _;
    }

    event InvoiceEvents(
        uint256 invoiceId,
        string eventType,
        address invoice,
        address performedBy,
        uint256 performedOn
    );

    event BLEvents(
        uint256 blId,
        string eventType,
        address invoice,
        address performedBy,
        uint256 performedOn
    );

    //Initialize event requestCreated
    event requestCreated(
        address indexed requester,
        bytes32 indexed jobId,
        bytes32 indexed requestId
    );

    //Initialize event RequestPermissionFulfilled
    event RequestPermissionFulfilled(
        bytes32 indexed requestId,
        uint256 indexed otp
    );

   // Tokenize Invoices
    function tokenizeInvoices(
        address _invoiceAddress,
        string memory _invoiceNumber,
        string memory _invoiceContent,
        string memory _invoiceContentHash
    ) public returns (uint256) {
        uint256 _invoiceId = _invoiceIds.current();
        _invoiceIds.increment();

        invoices[_invoiceId][_invoiceAddress] = InvoiceMaster(
            _invoiceId,
            _invoiceNumber,
            _invoiceContent,
            _invoiceContentHash,
            _invoiceAddress,
            block.timestamp,
            msg.sender
        );

        emit InvoiceEvents(
            _invoiceId,
            "Invoice Tokenized",
            msg.sender,
            msg.sender,
            block.timestamp
        );

        return _invoiceId;
    }



 // Tokenize BLs
    function tokenizeBLs(
        address _blAddress,
        string memory _blNumber,
        string memory _blContent,
        string memory _blContentHash
    ) public returns (uint256) {
        uint256 _blId = _blIds.current();
        _blIds.increment();

        bls[_blId][_blAddress] = BLMaster(
            _blId,
            _blNumber,
            _blContent,
            _blContentHash,
            _blAddress,
            block.timestamp,
            msg.sender
        );
        
        emit BLEvents(
            _blId,
            "BL Tokenized",
            msg.sender,
            msg.sender,
            block.timestamp
        );

        return _blId;
    }


    //String to bytes to convert jobid to bytest32
    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
