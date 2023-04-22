const { ERC20 } = require("./abi.js");
const { web3 } = require("./web3.js");

/**
 *
 * @param {string} contractAddress Address of contract
 * @returns {number} number of decimal points of the token. Integer bigger than 0.
 */
async function getContractDecimals(contractAddress) {
  const contract = new web3.eth.Contract(ERC20, contractAddress);
  const decimals = await contract.methods
    .decimals()
    .call()
    .catch((err) => {
      console.log(err);
    });
  return decimals;
}

/**
 *
 * @param {string} address wallet's address
 * @returns {number} ETH balance of address. floating point number >= 0
 */
async function getEthBalance(address) {
  const balance = await new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (err, balance) => {
      if (err) {
        console.error("err = ", err);
        return resolve(null);
      }
      resolve(web3.utils.fromWei(balance));
    });
  });
  // null if an error occurs
  return balance;
}

/**
 *
 * @param {string} walletAddress wallet's address
 * @param {string} contractAddress ERC20 contract address of token of which balance should be fetched
 * @returns
 */
async function getTokensBalance(walletAddress, contractAddress) {
  const decimals = getContractDecimals(contractAddress);
  const contract = new web3.eth.Contract(ERC20, contractAddress);
  let balance = await contract.methods.balanceOf(address).call();
  balance = balance / Math.pow(10, parseInt(decimals));
  // You might need to use mathjs library in order to get more accurate results
  return balance;
}
