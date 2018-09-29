//Expose a REST API for spawning new process
//on POST: Fetch a certain animal based on its ID
//TODO: this will be depracated in the future in favor of the Kafka messages 
const fs = require('fs')
const process = require('child_process')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.post('/api/v1/mint', function(req, res) {
  //get animal_id req
  let _animal_id = req.body.animal_id
  let _recipient = req.body.recipient 
  let _id = req.body.id
  //fork minter process
  let minterProcess = process.fork('./lib/minterProcess.js');
  //send minter process an animal id
  minterProcess.send({ 
    animal_id: _animal_id,
    recipient: _recipient, 
    id: _id
  })
  //once minter returns message, output it back to the API req
  minterProcess.on('message', (message) => {
    res.send(message);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3001!')
})

//Spawns new Minting Process

//Minter: 1. Get Data from LAST-server. 2. Update LAST-server. 3. Add JSON file to IPFS 4. call Minting Smart Contract END

