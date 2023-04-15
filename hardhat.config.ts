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
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
    },
    mantle_testnet: {
      url: process.env.MANTLE_TESTNET_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
    },
    scroll_testnet: {
      url: process.env.SCROLL_TESTNET_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
    },
    polygon_zkevm_testnet: {
      url: process.env.POLYGON_ZKEVM_TESTNET_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
    },
    linea_testnet: {
      url: process.env.LINEA_TESTNET_RPC_URL,
      accounts: [`${PRIVATE_KEY_1}`, `${PRIVATE_KEY_2}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "mantle_testnet",
        chainId: 5001,
        urls: {
          apiURL: `https://explorer.testnet.mantle.xyz/api`,
          browserURL: "https://explorer.testnet.mantle.xyz/"
        }
      },
      {
        network: "scroll_testnet",
        chainId: 534353,
        urls: {
          apiURL: `https://blockscout.scroll.io/api`,
          browserURL: "https://blockscout.scroll.io/"
        }
      },
      {
        network: "polygon_zkevm_testnet",
        chainId: 1442,
        urls: {
          apiURL: `https://testnet-zkevm.polygonscan.com/api`,
          browserURL: "https://testnet-zkevm.polygonscan.com"
        }
      },
      {
        network: "linea_testnet",
        chainId: 59140,
        urls: {
          apiURL: `https://explorer.goerli.linea.build/api`,
          browserURL: "https://explorer.goerli.linea.build/"
        }
      },
    ]
  },
};

export default config;

// BOB - Goerli - https://docs.zkbob.com/implementation/deployed-contracts#goerli-testnet
// APE - Goerli - https://goerli.etherscan.io/address/0x328507DC29C95c170B56a1b3A758eB7a9E73455c