const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const util = common.util;

// scope is the context of the current sequence of block requests.
// This will be used to store addresses, cache passwords,
// transaction results and other information necessary to interact with
// the BLOC api.
const scope = {}

// create a unique username with the prefix 'UPLOADUSER'
const username = util.uid('UPLOADUSER');

// choose a secure password. :)
const password = '1234';

// name of the contract we want to upload
const contractName = 'SimpleStorage';

// path of the contract we want to upload
const contractPath = './contracts/SimpleStorage.sol';

// the method to call on the contract
const setMethodName = 'set';

// the arguments for the set method call
const args = { x: 10 };

// the get method for the SimpleStorage contract
const getMethodName = 'get';

rest
  // initialize the scope / context.
  .setScope(scope)
  // call the create user method.
  .then(rest.createUser(username, password))
  // load the contract source file into scope under scope.contracts[contractName]
  .then(rest.getContractString(contractName, contractPath))
  // upload the contract
  .then(rest.uploadContract(username, password, contractName))
  .then(function(scope) {
    // scope now has the results of the contract creation
    console.log('The address for ' + contractName + ' is ' + scope.contracts[contractName].address);
    return scope;
  })
  // call the get method for SimpleStorage contract
  .then(rest.callMethod(username, contractName, getMethodName, {}))
  .then(function(scope){
    // results of the call are stored in the scope
    console.log('SimpleStorage.get()');
    console.log(JSON.stringify(scope.contracts[contractName].calls[getMethodName], null, 2));
    // this statement is key. As the next call in the promise chain needs scope.
    return scope;
  })
  // call the set method for SimpleStorage contract
  .then(rest.callMethod(username, contractName, setMethodName, args))
  .then(rest.getState(contractName))
  .then(function(scope) {
    // scope now has the state of the contract
    // note that you can use getState to get the current state of the contract
    // at any time. We could have also called the contracts get function. The difference
    // is that calling the get function would require executing a transaction
    // against the block chain, whereas getState just read the current blockchain
    // and returns the current state of the contract.

    console.log('SimpleStorage State:')
    console.log(JSON.stringify(scope.states[contractName], null, 2));

  });
