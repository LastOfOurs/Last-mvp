process.env.NODE_ENV = 'test';
const loopbackApiTesting = require('loopback-api-testing')
const tests = require('./lastTestConfig.json')
const server = require('../server/server.js')
const url = 'http://0.0.0.0:3000/api'

loopbackApiTesting.run(tests, server, url, function(err) {
  if (err) {
    console.log(err);
  } 
})