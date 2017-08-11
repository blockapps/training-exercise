const api = require('blockapps-api')("config.yaml");

/**
 * Send ether to a user and print transaction as well as account details.
 */
var sendTransactionPayload = {
  // Password of the user sending the ether. 
  // Required to retrieve private key which is stored using symmetric encryption.
  password: 'secretPassword',
  // Address of the account that will receive the ether 
  toAddress: '$RECEIVER_ADDRESS$',
  // Amount of ether to send.
  value: 10
};
var userName = 'blockapps-api';  // the username of the user sending the ether
var userAddress = '$SENDER_ADDRESS$'; // sender's address
//

api.bloc.send(sendTransactionPayload, userName, userAddress).then(function(data){
	console.log('Transaction details: ');
	console.log(data);
	console.log();

	console.log('Account details for user ' + userName + ':');
	api.strato.account(userAddress).then(console.log);

}).catch(function(err){
  console.log('an error occurred: ', err);
});

