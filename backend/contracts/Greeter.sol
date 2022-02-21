//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Greeter {
    string[] arr;
    uint count = 0;
    
    function setValue(string memory _value) public {
        arr.push(_value);
        count++;
    }
    function getValue(uint _index) public view returns(string memory){
        string memory val = arr[_index];
        return val;
    }
    function getCount() public view returns(uint){
        return count;
    }
}
