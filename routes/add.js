var express = require('express');
var router = express.Router();
var path =require('path');
var fs = require('fs');
var dbquery = require('../js/dbq');

router.route('/')
    .get(function(req, res, next) {
        dbquery('SELECT MAX(id) AS id FROM caps', function(err, ress, fields) {
            if (err) throw err;
            if (ress.length==0) return next();
            var curid=ress[0].id+1;
            var picExists=false;
            if(fs.existsSync(path.dirname(__dirname)+'/public/images/pics/' + curid + '.jpg')) picExists=true;
            res.render('add',{'id':curid,'picExists':picExists} );
        });
    })
    .post(function(req, res, next) {

        var name;
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('field', function(fieldname, val) {
            if(fieldname=='id') name = val;
        });
        req.busboy.on('file',function(fieldname,file,filename){
            var pat=path.dirname(__dirname)+'/public/images/pics/' + name+".jpg";
            fstream = fs.createWriteStream(pat);
            file.pipe(fstream);
            fstream.on('close', function () {
                dbquery("INSERT INTO caps (id,text) VALUES ("+name+",'')", function(err, ress, fields) {
                    if (err) throw err;
                    if (ress.length==0) return next
                    res.redirect('/add2?id='+name);
                });
            });
        })
    })
module.exports = router;
