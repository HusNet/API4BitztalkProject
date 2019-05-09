#!/usr/bin/env node

const express = require('express');
const API4Biztalk = express();
const myLoggers = require('log4js');
const readLastLines = require('read-last-lines');

myLoggers.configure({
    appenders: { mylogger: { type:"file", filename: "logs/access.log" } },
    categories: { default: { appenders:["mylogger"], level:"ALL" } }
});
const logger = myLoggers.getLogger("default");

API4Biztalk.use(express.json());        // to support JSON-encoded bodies

// Server GET requests
API4Biztalk.get('/pos/addQuota', (req, res) => addQuota(req, res));
API4Biztalk.get('/ext/addQuota', (req, res) => addQuotaExt(req, res));
API4Biztalk.get('/addCardInfos', (req, res) => addCardInfos(req, res));

API4Biztalk.get('/me/want/da/logs/boay', (req, res) => {
    readLastLines.read('logs/access.log', 15)
    .then((logs) => {
        let lines = logs.split('\n');
        logger.warn("GET " + req.url + " success from " + req.ip);
        res.end(JSON.stringify({'logs' : lines}));
    });    
});

API4Biztalk.listen(6546, function () {
    console.log("API4Biztalk is running on port " + 6546)
});

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
    logger.info("GET " + req.url + " success from " + req.ip);
    res.end();
}