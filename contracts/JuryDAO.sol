// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//    __                      ___  _      ___ 
//    \ \ _   _ _ __ _   _   /   \/_\    /___\
//     \ \ | | | '__| | | | / /\ //_\\  //  //
//  /\_/ / |_| | |  | |_| |/ /_//  _  \/ \_// 
//  \___/ \__,_|_|   \__, /___,'\_/ \_/\___/  
//                   |___/                    

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JuryDAO is Ownable {
    using ECDSA for bytes32;
    using SafeERC20 for IERC20;

    event OwnerAdded(address indexed owner);
    event OwnerDeleted(address indexed owner);
    event Transfer(address indexed to, uint256 amount);

    address[] public owners;
    mapping(address => bool) public isOwner;
    mapping(address => uint256) public signedSignatures;

    constructor(address[] memory _owners) {
        require(_owners.length > 0, "JuryDAO: No owners provided");
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "JuryDAO: Invalid owner address");
            require(!isOwner[owner], "JuryDAO: Duplicate owner address");
            owners.push(owner);
            isOwner[owner] = true;
            signedSignatures[owner] = 100000000000;
            emit OwnerAdded(owner);
        }
    }

    function addOwner(address _owner) public {
        require(isOwner[msg.sender], "JuryDAO: Only owners can add new owners");
        require(!isOwner[_owner], "JuryDAO: Owner already exists");
        decrementSignedSignatures();
        owners.push(_owner);
        isOwner[_owner] = true;
        emit OwnerAdded(_owner);
    }

    function deleteOwner(address _owner) public {
        require(isOwner[msg.sender], "JuryDAO: Only owners can delete owners");
        require(isOwner[_owner], "JuryDAO: Owner does not exist");
        decrementSignedSignatures();
        isOwner[_owner] = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == _owner) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }
        emit OwnerDeleted(_owner);
    }

    function deposit(address tokenAddress, uint256 amountIn) public {
        require(amountIn > 0, "JuryDAO: amountIn should be positive");
        IERC20 token = IERC20(tokenAddress);

        token.approve(address(this), amountIn);

        require(token.transferFrom(msg.sender, address(this), amountIn), "JuryDAO: Failed to transfer tokens");
    }

    function withdraw(address[] calldata tokenAddresses, address[] calldata recipients, uint256[] calldata amounts) onlyOwner public {
        require(tokenAddresses.length == recipients.length && tokenAddresses.length == amounts.length, "JuryDAO: Invalid number of parameters");
        
        // Ensure all amounts are greater than zero
        // Transfer tokens to recipients
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            require(amounts[i] > 0, "JuryDAO: Amount must be greater than 0");
            IERC20 token = IERC20(tokenAddresses[i]);
            token.approve(recipients[i], amounts[i]);
            token.safeTransfer(recipients[i], amounts[i]);
            emit Transfer(recipients[i], amounts[i]);
        }

        // Decrement the signed signatures
        decrementSignedSignatures();
    }

    function signSignatures(bytes memory message, uint8 v, bytes32 r, bytes32 s, uint256 signCount) public {
        require(isOwner[msg.sender], "JuryDAO: Only owners can sign signatures");
        require(signCount > 0, "JuryDAO: Sign count must be greater than 0");

        bytes32 hash = keccak256(message);
        address signer = ecrecover(hash, v, r, s);

        require(signer != address(0), "YooloStation: Invalid signature");
        require(isOwner[signer], "YooloStation: Signer is not an owner");

        signedSignatures[signer] += signCount;
    }

    function decrementSignedSignatures() internal {
        uint256 numZeros = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (signedSignatures[owners[i]] == 0) {
                numZeros++;
            } else {
                signedSignatures[owners[i]] -= 1;
            }
        }
        if (numZeros < owners.length / 2) {
            // If there are more than 50% zeros, do not revert
            return;
        } else {
            revert("There aren't zeros more than 50%.");
        }
    }
}
