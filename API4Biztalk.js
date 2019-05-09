#!/usr/bin/env node

const express = require('express');
const API4Biztalk = express();

API4Biztalk.use(express.json());        // to support JSON-encoded bodies

// Server GET requests
API4Biztalk.get('/pos/addQuota', (req, res) => function(req, res){
    res.end(JSON.stringify({'responde': 'ok'}));
});
API4Biztalk.get('/ext/addQuota', (req, res) => function(req, res){
    res.end(JSON.stringify({'responde': 'ok'}));
});
API4Biztalk.get('/addCardInfos', (req, res) => function(req, res){
    res.end(JSON.stringify({'responde': 'ok'}));
});


API4Biztalk.listen(6546, function () {
    console.log("API4Biztalk is running on port " + 6546)
});

function getCurrentTimestampForLogs(){
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
