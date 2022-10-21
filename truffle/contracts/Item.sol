// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

import "./ItemManager.sol";

contract Item{  //item specific contraact so user can buy specific item.
    
    uint public price;  
    uint public pricePaid;
    uint public index;
    string public name;

    ItemManager parentContract;

    constructor( ItemManager _parentContract, uint _price, uint _index, string memory _name){
        price = _price;
        index = _index;
        parentContract = _parentContract;
        name = _name;
    }

    receive() external payable{
        require(pricePaid == 0, "item is paid already");
        require(price == msg.value, "Only full payment allowed");
        pricePaid += msg.value;
        (bool success, ) = address(parentContract).call{value:msg.value}(abi.encodeWithSignature("buy(uint256)", index));
        require (success, "Transaction failed");
    }
}
