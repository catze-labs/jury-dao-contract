// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

//    __                      ___  _      ___ 
//    \ \ _   _ _ __ _   _   /   \/_\    /___\
//     \ \ | | | '__| | | | / /\ //_\\  //  //
//  /\_/ / |_| | |  | |_| |/ /_//  _  \/ \_// 
//  \___/ \__,_|_|   \__, /___,'\_/ \_/\___/  
//                   |___/                    

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockchainIncentivizedToken is ERC20Burnable, ERC20Votes, Ownable {
    /**
     * @dev Constructor.
     */
    constructor() ERC20("BlockchainIncentivizedToken", "BIT") ERC20Permit("BlockchainIncentivizedToken") {}

    function mint(address _account, uint256 _amount) public onlyOwner {
        _mint(_account, _amount);
    }

    // The following functions are overrides required by Solidity.
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}