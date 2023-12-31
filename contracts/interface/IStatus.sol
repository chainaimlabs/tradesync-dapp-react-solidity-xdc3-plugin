//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IStatus {
    enum FlightStatus {
        DELAYED,
        UPCOMING,
        DEPARTURED,
        TRANSIT,
        CANCELLED,
        ONTIME
    }

    struct FlightMaster {
        uint256 flightId;
        string carrierFlightNumber;
        string serviceProviderName;
        address serviceProvider; //Should be metadata hash about the patients
        uint256 registeredOn;
        address registeredBy;
    }

    struct InvoiceMaster {
        uint256 invoiceId;
        string  invoiceNumber;
        string  invoiceContent;        
        string invoiceContentHash; //Should be metadata hash about the content
        address serviceProvider;
        uint256 registeredOn;
        address registeredBy;
    }

      struct BLMaster {
        uint256 blId;
        string  blNumber;
        string  blContent;
        string blContentHash; //Should be metadata hash about the content
        address serviceProvider;
        uint256 registeredOn;
        address registeredBy;
    }

    struct FlightInsurance {
        uint256 polictyid;
        address passenger;
        string carrierFlightNumber;
        uint256 departureOn;
        uint256 arrivalOn;
        uint256 bookedOn;
        FlightStatus flightStatus;
        uint256 yearmonthdate;
        bool processed;
    }


}
