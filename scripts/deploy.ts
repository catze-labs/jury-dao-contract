const { deploy } = require("@openzeppelin/hardhat-upgrades/dist/utils");
const Web3 = require('web3');
const hre = require("hardhat");

async function main() {
    // ToDo
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}
);

// npx hardhat compile 
// npx hardhat clear-abi
// npx hardhat export-abi
// npx hardhat run --network mantle_testnet scripts/deploy.ts 

// Token Address
//
// APE - Goerli - 0x328507DC29C95c170B56a1b3A758eB7a9E73455c
// BOB - Goerli - 0x97a4ab97028466FE67F18A6cd67559BAABE391b8
// BIT - MANTLE - 0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000
// ETH - MANTLE - 0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0001
// ETH - SCROLL - 
// ETH - POLYGON_ZKEVM - 
// ETH - LINEA - 

// Explorer
//
// MANTLE - https://explorer.testnet.mantle.xyz/
// SCROLL - https://blockscout.scroll.io/
// POLYGON_ZKEVM - https://testnet-zkevm.polygonscan.com
// LINEA - https://explorer.goerli.linea.build/