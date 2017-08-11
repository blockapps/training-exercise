const api = require('blockapps-api')("config.yaml");

api.bloc.home().then(function(data) {
  console.log(data);
});
