#!/usr/bin/env node

const express = require('express');
const API4Biztalk = express();

API4Biztalk.use(express.json());        // to support JSON-encoded bodies

// Server GET requests
API4Biztalk.get('/pos/addQuota', (req, res) => function(req, res){
    console.log(getCurrentTimestampForLogs + " : " + req.body.name);
    res.end();
});
API4Biztalk.get('/ext/addQuota', (req, res) => function(req, res){
    console.log(getCurrentTimestampForLogs + " : " + req.body.name);
    res.end();
});
API4Biztalk.get('/addCardInfos', (req, res) => function(req, res){
    console.log(getCurrentTimestampForLogs + " : " + req.body.name);
    res.end();
});

// Server POST requests
API4Biztalk.post('/monitoring/switch', (req, res) => r.requests.switchMonitoringStatus(req, res));


API4Biztalk.listen(666, function () {
    console.log("API4Biztalk is running on port " + 666)
});

function getCurrentTimestampForLogs(){
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}