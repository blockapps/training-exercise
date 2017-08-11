const api = require('blockapps-api')("config.yaml");

/**
 * Create a new user on the bloc-server and print the address of the newly
 * created account for that user. If a user with this name already exists it
 * will create another account for the user and print this address.
 */
var createUserPayload = {
  faucet: '1',              // if faucet == '1', it will fill the new account with 1000 Ether
  password:'secretPassword' // the password that will be used to sign transaction from the newly created account
};
var userName = 'blockapps-api';  // the username of the user
api.bloc.createUser(createUserPayload, userName).then(function(address) {
  console.log('New address of ' + userName + ' is:', address);


  /**
   * Now we will log the details of the newly created account on the blockchain.
   * We simply pass in the address of the account we would like.
   */
  api.strato.account(address).then(console.log);

}).catch(function(err){
  console.log('an error occurred: ', err);
});
