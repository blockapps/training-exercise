const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const util = common.util;

// scope is the context of the current sequence of block requests.
// This will be used to store addresses, cache passwords,
// transaction results and other information necessary to interact with
// the BLOC api.
const scope = {}

// create a unique username with the prefix 'TEST'
const username = util.uid('TEST');

// choose a secure password. :)
const password = '1234';

// use blockapps-rest to create the user
rest
  // initialize the scope / context.
  .setScope(scope)
  // call the create user method.
  .then(rest.createUser(username, password))
  .then(function(scope) {
    // scope now has the results of the user creation
    console.log('The address for ' + username + ' is ' + scope.users[username].address);

    // it also caches the user password under scope.users[username]. This username
    // can now be passed in as an argument to other blockapps-rest calls
    // to initiate transactions on the blockchain. The caches password within scope
    // will be used to decode the private keys to sign the transaction.
    // Note that scope only exists for the lifetime of this piece of code.
  });
