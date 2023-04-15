require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");
require('hardhat-abi-exporter');

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1;
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    bsc_testnet: {
      url: process.env.BSC_TESTNET_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
      gas : 10000000,
      gasPrice : 20000000000,
    },
    mantle_testnet: {
      url: process.env.MANTLE_TESTNET_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
    },
    scroll_testnet: {
      url: process.env.SCROLL_TESTNET_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
    },
    polygon_zkEVM_testnet: {
      url: process.env.POLYGON_ZKEVM_TESTNET_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
