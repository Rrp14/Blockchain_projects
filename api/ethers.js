const { ethers } = require("ethers");
const contractABI = require("../backend/artifacts/contracts/Certificate.sol/Certificate.json").abi;

// ✅ Setup local JSON-RPC provider (Hardhat or Ganache)
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// ✅ Use the first available private key from your local node
const privateKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";  // Replace with an actual one from Hardhat or Ganache
const wallet = new ethers.Wallet(privateKey, provider);

// ✅ Attach contract to wallet signer
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
