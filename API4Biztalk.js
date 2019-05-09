#!/usr/bin/env node

const express = require('express');
const API4Biztalk = express();

API4Biztalk.use(express.json());        // to support JSON-encoded bodies

// Server GET requests
API4Biztalk.get('/pos/addQuota', (req, res) => addQuota(req, res));
API4Biztalk.get('/ext/addQuota', (req, res) => addQuotaExt(req, res));
API4Biztalk.get('/addCardInfos', (req, res) => addCardInfos(req, res));

API4Biztalk.listen(6546, function () {
    console.log("API4Biztalk is running on port " + 6546)
});

function getCurrentTimestampForLogs(){
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function addQuota(req, res){
    printUrl(req, res);
}

function addQuotaExt(req, res){
    printUrl(req, res);
}

function addCardInfos(req, res){
    printUrl(req, res);
}

function printUrl(req, res){
    console.log(getCurrentTimestampForLogs() + " : GET " + req.url + " success");
    res.end();
}