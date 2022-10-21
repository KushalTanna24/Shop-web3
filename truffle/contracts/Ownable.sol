// SPDX-License-Identifier: MIT

pragma solidity ^0.8;
 

contract Ownable{

    address owner;
    modifier onlyOwner(){
        require (isOwner(), "Only owner allowed." );
        _;
    }

    function isOwner() public view returns(bool){
        return(msg.sender == owner);
    }

}