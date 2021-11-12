// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract bnbBridge {

  mapping(uint => RentalProperty) public rentalProperties;
  uint public numRentalProperties; 

  // Expect StartDate and EndDate to change in the future in order to fit the real world better
  struct RentalProperty {
    uint id;
    string location;
    // Ethereum block when the availability period starts
    uint startDate;
    // Ethereum block when the availability period ends
    uint endDate;
    uint pricePerBlock;
    uint oneOffFee;
    address owner;
  }

  function addRentalProperty(
    string calldata location,
    uint startDate,
    uint endDate,
    uint pricePerBlock,
    uint oneOffFee
  ) public returns (bool success) {
    require(bytes(location).length != 0, "Location must be specified");
    require(startDate != 0, "Start date must be specified");
    require(endDate != 0, "End date must be specified");

    rentalProperties[numRentalProperties] = RentalProperty(
      numRentalProperties,
      location,
      startDate,
      endDate,
      pricePerBlock,
      oneOffFee,
      msg.sender
    );
    numRentalProperties++ ;

    return true;
  }
}
