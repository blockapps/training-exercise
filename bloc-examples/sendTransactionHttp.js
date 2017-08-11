const rp = require('request-promise');

/**
 * Send ether to a user and print transaction as well as account details.
 */

//$SERVER_URL$
var blocUrl = '$SERVER_URL$'; //same url of our bloc-server used in config.yaml
var stratoUrl = '$SERVER_URL$'; //url of the strato instance that is running the blockchain, same as in config.yaml

var userName = 'http-call'; //sender username
var userAddress = '$SENDER_ADDRESS$'         ; //sender address

var sendTransactionPayload = {
  // Password of the user sending the ether. 
  // Required to retrieve private key which is stored using symmetric encryption.
  password: 'httpPass',
  // Address of the account that will receive the ether 
  toAddress: '$RECEIVER_ADDRESS$',
  // Amount of ether to send.
  value: 10
};

var options = {
    method: 'POST',
    uri: blocUrl + '/users/' +  userName + '/' + userAddress + '/send',
    body: sendTransactionPayload,
    json: true // Automatically stringifies the body to JSON
};
rp(options).then(function(tx){
  console.log('Transaction details: ');
  console.log(tx);

  console.log();

  /**
   * Get account details.
   */
  rp(stratoUrl + '/eth/v1.2/account?address=' + userAddress).then(console.log);
}).catch(function(err){
  console.log('an error occurred: ', err);
});
