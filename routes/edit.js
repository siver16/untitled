var express = require('express');
var router = express.Router();
var path =require('path');
var fs = require('fs');
var tools = require('../js/tools');
var dbquery = require('../js/dbq');

router.route('/')
    .get(function(req, res, next) {
        var curid=req.query.id;
        dbquery("SELECT * FROM caps WHERE id = "+curid,function(err, ress, fields) {
            if (err) throw err;
            if (ress.length==0) return next();            
            res.render('edit',{id:ress[0].id,text:ress[0].text,path:tools.pathMaker(ress[0].id,4)});
        });
    })
    .post(function(req, res, next) {
        var name;
        var text;
        req.pipe(req.busboy);
        req.busboy.on('field', function(fieldname, val) {
            if(fieldname=='id') name = val;
            if(fieldname=='text'){
                text = val;
                dbquery("UPDATE caps SET text='"+text+"' WHERE caps.id="+name, function(err, ress, fields) {
                    if (err) throw err;
                    if (ress.length==0) return next();
                    res.render('caps',{'caps':[{id:name,text:text,path:tools.pathMaker(name,4)}],'page':1,'pages':1,'link':'/'})
                });
            }
        });
        req.busboy.on('file',function(fieldname,file,filename){
            var pat=path.dirname(__dirname)+'/public/images/pics/' + name+".jpg";
            fstream = fs.createWriteStream(pat);
            file.pipe(fstream);
        })
    })
module.exports = router;
