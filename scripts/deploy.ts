const { deploy } = require("@openzeppelin/hardhat-upgrades/dist/utils");
const Web3 = require('web3');
const hre = require("hardhat");

const MockERC20ABI = require('../abi/MockERC20.json');
const BOBABI = require('../abi/BOB.json');

async function main() {
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    const accounts = await hre.ethers.getSigners();
    const deployer = accounts[0];
    // console.log(`Deploy from account: ${deployer.address}`);
  
    const latestBlock = await hre.ethers.provider.getBlock("latest");
    const nonce = await hre.ethers.provider.getTransactionCount(deployer.address, "latest");
    const gasPrice = await hre.ethers.provider.getGasPrice();
    // const gasLimit = Math.round(latestBlock.gasLimit / latestBlock.transactions.length);
    const gasLimit = 600000;
    console.log(`Latest Block: ${latestBlock.number} / Nonce: ${nonce}`);
    console.log(`Gas Price: ${gasPrice / 1e9} Gwei / Gas Limit: ${gasLimit}`);
  
    // constructor() for BlockchainIncentivizedToken.sol
    const BIT = await hre.ethers.getContractFactory('BlockchainIncentivizedToken');
    const bit = await BIT.deploy();
    console.log(`  -> Deploying BIT contract`);
    console.log(`     - hash: ${bit.deployTransaction.hash}`);
    console.log(`     - gasPrice: ${bit.deployTransaction.gasPrice / 1e9}`);
    console.log(`     - nonce: ${bit.deployTransaction.nonce}`);
    await bit.deployed();
    console.log(bit.address," ", hre.network.name , " bit token address");

    // constructor() for JuryDAO.sol
    const JuryDAO = await hre.ethers.getContractFactory('JuryDAO');
    const juryDAO = await JuryDAO.deploy([accounts[0].address, accounts[1].address]);
    console.log(`  -> Deploying JuryDAO contract`);
    console.log(`     - hash: ${juryDAO.deployTransaction.hash}`);
    console.log(`     - gasPrice: ${juryDAO.deployTransaction.gasPrice / 1e9}`);
    console.log(`     - nonce: ${juryDAO.deployTransaction.nonce}`);
    await juryDAO.deployed();
    console.log(juryDAO.address," ", hre.network.name , " juryDAO address");

  
    console.log(`
        npx hardhat verify --network ${hre.network.name} ${bit.address} --contract contracts/BlockchainIncentivizedToken.sol:BlockchainIncentivizedToken
        npx hardhat verify --network ${hre.network.name} ${juryDAO.address} --constructor-args scripts/args.js --contract contracts/JuryDAO.sol:JuryDAO
    `);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}
);

//npx hardhat verify --network mantle_testnet 0x7Bd16c2dbB4aD21b400F519307fF27C50e96A3dF --constructor-args scripts/args.js --contract contracts/JuryDAO.sol:JuryDAO 

// npx hardhat compile 
// npx hardhat clear-abi
// npx hardhat export-abi
// npx hardhat run --network goerli scripts/deploy.ts
// npx hardhat run --network mantle_testnet scripts/deploy.ts 
// npx hardhat run --network scroll_testnet scripts/deploy.ts
// npx hardhat run --network polygon_zkevm_testnet scripts/deploy.ts
// npx hardhat run --network linea_testnet scripts/deploy.ts

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
// Goerli - https://goerli.etherscan.io/
// MANTLE - https://explorer.testnet.mantle.xyz/
// SCROLL - https://blockscout.scroll.io/
// POLYGON_ZKEVM - https://testnet-zkevm.polygonscan.com
// LINEA - https://explorer.goerli.linea.build/