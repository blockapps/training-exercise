const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const util = common.util;

// scope is the context of the current sequence of block requests.
// This will be used to store addresses, cache passwords,
// transaction results and other information necessary to interact with
// the BLOC api.
const scope = {}

// create a unique username with the prefix 'Alice'
const alice = util.uid('Alice');

// create a unique username with the prefix 'Bob'
const bob = util.uid('Bob');

// choose a secure password. :)
const password = '1234';

function printBalance(scope) {
  console.log('Balance for Alice is ' + scope.accounts[scope.users[alice].address][0].balance);
  console.log('Balance for Bob is ' + scope.accounts[scope.users[bob].address][0].balance)
}

// use blockapps-rest to create our two users and send money from Alice to Bob
rest
  // initialize the scope / context.
  .setScope(scope)
  // call the create user methods.
  .then(rest.createUser(alice, password))
  .then(rest.createUser(bob, password))
  // get Alice and Bob's balances and add them to the scope
  .then(function(scope) {
    return rest.getAccount(scope.users[alice].address)(scope);
  })
  .then(function(scope) {
    return rest.getAccount(scope.users[bob].address)(scope);
  })
  .then(function(scope) {
    // balance is stored in scope.balances using address as key, in wei
    printBalance(scope);
    return scope;
  })
  // send 13 ether from alice to bob
  .then(rest.send(alice, bob, 13))
  // refresh Alice and Bob's balances and add them to the scope
  .then(function(scope) {
    return rest.getAccount(scope.users[alice].address)(scope);
  })
  .then(function(scope) {
    return rest.getAccount(scope.users[bob].address)(scope);
  })
  .then(function(scope) {
    printBalance(scope);
    return scope;
  })
