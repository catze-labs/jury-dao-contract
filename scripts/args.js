require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");
require('hardhat-abi-exporter');

// const ethers = require('ethers');

module.exports = [
    [
        `${process.env.PRIVATE_KEY_1_ADDRESS}`, // 0x5FbDB2315678afecb367f032d93F642f64180aa3
        `${process.env.PRIVATE_KEY_2_ADDRESS}`, // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    ],
];