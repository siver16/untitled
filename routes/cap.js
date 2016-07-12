var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var config = require('../config');

router.get('/search', function(req, res, next) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'ghbyn',
        database : 'caps'
    });
    connection.connect();
    console.log(req.query.que);
     connection.query('SELECT * FROM caps WHERE text like "'+req.query.que+'"', function(err, ress, fields) {
       if (err) throw err;
       if (ress.length==0) return next();
         var caps=[];
         console.log(ress,ress.length);
         for(var i=0;i<ress.length;i++){
             console.log(i,ress[i]);
             console.log({id:ress[i].id,text:ress[i].text,path:pathMaker(ress[i].id,4)});
            caps.push({id:ress[i].id,text:ress[i].text,path:pathMaker(ress[i].id,4)});
         }
         console.log(caps);
         res.render('cap',{'num':caps.length,caps:caps})
       //res.render('cap',{id:ress[0].id,text:ress[0].text,idzero:addZero(ress[0].id,4)})
     });
    connection.end();
});
 router.get('/:id', function(req, res, next) {
     var connection = mysql.createConnection({
         host     : 'localhost',
         user     : 'root',
         password : 'ghbyn',
         database : 'caps'
     });
     connection.connect();
          connection.query('SELECT * FROM caps WHERE id = '+req.params.id, function(err, ress, fields) {
            if (err) throw err;
            if (ress.length==0) return next();
            res.render('cap',{id:ress[0].id,text:ress[0].text,path:pathMaker(ress[0].id,4)})
          });
     connection.end();
});

function pathMaker(string, template){
    string=""+string;
    var ret=string;
    for(var i=0;i<template-string.length;i++){
        ret="0"+ret;
    }
    return '/images/pics/'+ret+'.jpg';
}

exports.form = function(req,res){
    res.render('search');
}

exports.submit = function(dir){
    
}
module.exports = router;
