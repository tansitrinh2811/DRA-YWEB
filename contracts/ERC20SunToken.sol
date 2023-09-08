// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >= 0.7.0 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SunToken is ERC20{

    constructor() ERC20("SUN", "Sun"){
        _mint(msg.sender, 100000*10**decimals());
    }
}