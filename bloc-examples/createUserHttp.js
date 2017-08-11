const rp = require('request-promise');
/**
 * Create a new user on the bloc-server and print the address of the newly
 * created account for that user. If a user with this name already exists it
 * will create another account for the user and print this address.
 */

var blocUrl = '$SERVER_URL$'; //same url of our bloc-server used in config.yaml
var stratoUrl = '$SERVER_URL$'; //url of the strato instance that is running the blockchain, same as in config.yaml

var userName = 'http-call';
var createUserPayload = {
  password: 'httpPass',
  faucet:'1'
};

var options = {
    method: 'POST',
    uri: blocUrl + '/users/' +  userName,
    body: createUserPayload,
    json: true // Automatically stringifies the body to JSON
};
rp(options).then(function(address){
  console.log('New address of ' + userName + ' is:', address);

  /**
   * Now we will log the details of the newly created account on the blockchain.
   * We simply pass in the address of the account we would like.
   */
  rp(stratoUrl + '/eth/v1.2/account?address=' + address).then(console.log);
}).catch(function(err){
  console.log('an error occurred: ', err);
});
