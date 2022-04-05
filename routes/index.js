var express = require('express')
var request = require('request-promise')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/postToGetDraftClassHandler', async function(req, res, next) {
  const options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/getDraftClassHandler',
    body: req.body,
    json: true
  }

  let returnData

  const sendRequest = await request(options)
    .then((parsedBody) => {
      returnData = parsedBody
    })
    .catch((err) => {
      console.log(err)
    })

  res.send(returnData)

});

app.post('/postToGetRosterHandler', async function(req, res, next) {
  const data = {
    teamAbbreviation: 'CHI',
    year: 1985
  }

  const options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/getRosterHandler',
    body: data,
    json: true
  }

  let returnData

  const sendRequest = await request(options)
    .then((parsedBody) => {
      console.log(parsedBody)
      returnData = parsedBody
    })
    .catch((err) => {
      console.log(err)
    })

  res.send(returnData)

});

app.post('/postToGetTeamStatsHandler', async function(req, res, next) {
  const data = {
    teamAbbreviation: 'CHI',
    year: 1985,
    dataFormat: 'TOTAL'
  }

  const options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/getTeamStatsHandler',
    body: data,
    json: true
  }

  let returnData

  const sendRequest = await request(options)
    .then((parsedBody) => {
      console.log(parsedBody)
      returnData = parsedBody
    })
    .catch((err) => {
      console.log(err)
    })

  res.send(returnData)

});

app.post('/postToGetPlayerStatsHandler', async function(req, res, next) {
  const options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/getPlayerStatsHandler',
    body: req.body,
    json: true
  }

  let returnData

  const sendRequest = await request(options)
    .then((parsedBody) => {
      console.log(parsedBody)
      returnData = parsedBody
    })
    .catch((err) => {
      console.log(err)
    })

  res.send(returnData)

});

app.post('/postToGetPlayerHeadshotHandler', async function(req, res, next) {
  const options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/getPlayerHeadshotHandler',
    body: req.body,
    json: true
  }

  let returnData

  const sendRequest = await request(options)
    .then((parsedBody) => {
      console.log(parsedBody)
      returnData = parsedBody
    })
    .catch((err) => {
      console.log(err)
    })

  res.send(returnData)

});

app.post('/postToGetBoxScoresHandler', async function(req, res, next) {
  const options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/getBoxScoresHandler',
    body: req.body,
    json: true
  }

  let returnData

  const sendRequest = await request(options)
    .then((parsedBody) => {
      console.log(parsedBody)
      returnData = parsedBody
    })
    .catch((err) => {
      console.log(err)
    })
  res.send(returnData)

});

app.listen(3001)

module.exports = app;
