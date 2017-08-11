# Bloc Examples

This directory contains examples on how to consume the `Bloc API`. There are examples using the `request-promise` library that demonstrate the various `GET` and `POST` routes available on the REST API. There are also examples using the `blockapps-api` library that acts as wrapper around the REST endpoints. We also have included examples using the `blockapps-rest` node library, which implements promise chaining to handle more complicated workflows.

### Documentation
* `bloc-server` endpoints: http://blockapps.net/bloc-server/1.2/docs
* `blockapps-api` docs: https://github.com/blockapps/blockapps-api
* `blockapps-rest` docs: https://github.com/blockapps/blockapps-rest#bloch

### Examples included:

  1. Create users and send transactions
    * Creating new users
    * Accessing users and checking user account balances
    * Sending ether between user accounts

  2. Upload
    * Upload a contract from a user
    * Call a method on a contract
    * Query contract state

### Instructions
  1. Run `npm install`
  2. Open `config.yaml` and put in the appropriate `stratoUrl` and `blocUrl`
  3. Execute `node <name-of-js-file>.js --config config.yaml` to run any of the examples.
