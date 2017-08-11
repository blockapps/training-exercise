const api = require('blockapps-api')("config.yaml");
const fs = require('fs');
const nodepath = require('path');
/**
 * Upload a simple smart contract from the file-system and call one of the
 * contract's methods. We then get the state of the contract to witness the
 * effect of calling the method.
 */


/**
 * Load simple storage contract from the file-system
 */
 var sourceCode = fs.readFileSync('./contracts/SimpleStorage.sol').toString();
 var contractName = 'SimpleStorage';
 var password = 'secretPassword';

/**
 * Get the address of user already created in the bloc-server
 */
var userName = 'blockapps-api';
api.bloc.getUserAddresses(userName).then(function(addresses) {
  console.log('Addresses of ' + userName + ' is:', addresses);


  /**
   * Using this address, we can upload our contract.
   */
  var contractPayload = {
    password: password,  // password used to create address with
    src: sourceCode,  // the solidity source code of the contract
    args:{},   // constructor arguments
    contract: contractName,  //name of the contract to be uploaded. Solidity source code can have multiple contracts in it.
  };
  if(addresses.length < 1){
    console.log('No addresses created for user');
    return;
  }
  api.bloc.contract(contractPayload, userName, addresses[0]).then(function(contractAddress){
    console.log('Address of newly created contract is: ', contractAddress);
  });

}).catch(function(err){
  console.log('an error occurred: ', err);
});
