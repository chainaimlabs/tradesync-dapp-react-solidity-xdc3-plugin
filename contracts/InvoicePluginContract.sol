//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@goplugin/contracts/src/v0.8/PluginClient.sol";
import "./interface/IStatus.sol";

contract InvoicePluginContract is PluginClient, IStatus {
    using Counters for Counters.Counter;
    Counters.Counter private _invoiceIds;

    using Plugin for Plugin.Request;

    uint256 private constant ORACLE_PAYMENT = 0.001 * 10**18;

    // address
    address public owner;

    mapping(uint256 => mapping(address => InvoiceMaster)) public invoices;

    constructor(address _pli) {
        setPluginToken(_pli);
        owner = msg.sender;
        _invoiceIds.increment();
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

    // Tokenize Invoice
    function tokenizeInvoice(
        address _invoiceAddress,
        string memory _invoiceNumber,
        string memory _serviceProviderName
    ) public returns (uint256) {
        uint256 _invoiceId = _invoiceIds.current();
        _invoiceIds.increment();

        invoices[_invoiceId][_invoiceAddress] = InvoiceMaster(
            _invoiceId,
            _invoiceNumber,
            _serviceProviderName,
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
