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
API4Biztalk.post('/pos/addQuota', (req, res) => addQuota(req, res));
API4Biztalk.post('/ext/addQuota', (req, res) => addQuotaExt(req, res));
API4Biztalk.post('/addCardInfos', (req, res) => addCardInfos(req, res));
API4Biztalk.post('/ps/addQuota', (req, res) => addQuotaToPrintSys(req, res));

API4Biztalk.get('/me/want/da/logs/boay', (req, res) => {
    readLastLines.read('logs/access.log', 15)
    .then((logs) => {
        let lines = logs.split('\n');
        logger.warn("GET " + req.url + " success from " + req.ip);


        

        let output = '{ "logs": [{';
        lines.forEach(line => {
            if (line != '' && typeof line !== 'undefined') {
                let l = line.split("{");
                if (l[1] != '' && typeof l[1] !== 'undefined') {
                    let objects = l[1].split("}"); 
                    output += '"' + l[0] + '" : {' + objects[0] + '}';
                
                    output += ',';
                }
            }
        });

        output.substring(0, output.length-1);

        output += '}]}';


        res.setHeader('Content-Type', 'application/json');
        res.end(output);
    });    
});

API4Biztalk.listen(6546, function () {
    console.log("API4Biztalk is running on port " + 6546)
});

function addQuota(req, res){
    printUrl(req, res, {'uid' : req.body.uid, 'quota' : req.body.quota});
}

function addQuotaExt(req, res){
    printUrl(req, res, {'username' : req.body.username, 'quota' : req.body.quota});
}

function addCardInfos(req, res){
    printUrl(req, res, {'cardId' : req.body.cardId, 'uid' : req.body.uid, 'username' : req.body.username});
}

function addQuotaToPrintSys(req, res){
    printUrl(req, res, {'username' : req.body.username, 'quota' : req.body.quota});
}

function printUrl(req, res, json){
    logger.info("GET " + req.url + " success from " + req.ip + " " + JSON.stringify(json));
    res.end();
}