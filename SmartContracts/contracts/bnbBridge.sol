// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract bnbBridge {

  mapping(uint => RentalProperty) public rentalProperties;
  uint public numRentalProperties; 

  // Expect StartDate and EndDate to change in the future in order to fit the real world better
  struct RentalProperty {
    Location location;
    // Ethereum block when the availability period starts
    uint startDate;
    // Ethereum block when the availability period ends
    uint endDate;
    uint pricePerBlock;
    uint oneOffFee;
  }

  struct Location {
    string Country;
  }

  function addRentalProperty(
    string calldata country,
    uint startDate,
    uint endDate,
    uint pricePerBlock,
    uint oneOffFee
  ) public returns (bool success) {
    require(bytes(country).length != 0, "Country must be specified");
    require(startDate != 0, "Start date must be specified");
    require(endDate != 0, "End date must be specified");

    rentalProperties[numRentalProperties] = RentalProperty(
      Location(country),
      startDate,
      endDate,
      pricePerBlock,
      oneOffFee
    );
    numRentalProperties++ ;

    return true;
  }
}
