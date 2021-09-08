const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = [
  'http://localhost:8090',
  'http://localhost:8080',
  'http://localhost:4200',
  'http://localhost',
  'http://unik59.synology.me:8090',
  'http://unik59.synology.me:8080',
  'http://unik59.synology.me'
];

var corsOptionDelegate = (req,callback) =>{
    var corsOptions;
     if(whitelist.indexOf(req.header('Origin'))!== -1){
         corsOptions = {origin:false};
     }
     else{
         corsOptions = {origin:false};
     }
     callback(null,corsOptions);
}

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);
