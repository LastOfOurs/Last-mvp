// Expose a REST API for spawning new process
// on POST: Fetch a certain animal based on its ID
// IMPORTANT: this will be depracated in the future in favor of Event Sourcing
const process = require('child_process')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

/**
 * POST req for new animal
 * 
 * @param {string} animal_id - ID number of the last token
 * @param {string} recipient - address of wallet to mint the token to
 */
app.post('/api/v1/mint', function (req, res) {
  let inputAnimalId = req.body.animal_id
  let inputRecipient = req.body.recipient
  // fork minter process
  let minterProcess = process.fork('./lib/minterProcess.js')
  // send data to minter process
  minterProcess.send({
    animal_id: inputAnimalId,
    recipient: inputRecipient
  })
  // once minter returns message, output it back to the API req
  minterProcess.on('message', (message) => {
    res.send(message)
  })
})

app.listen(3001, function () {
  console.log('Running Minter listener on port 3001')
})
