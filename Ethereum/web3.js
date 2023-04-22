const Web3 = require("web3");
const web3 = new Web3(process.env.PROVIDER_ADDRESS);

module.exports.web3 = web3;
