var express = require('express');
var router = express.Router();
var dbquery = require('../js/dbq');
var tools = require('../js/tools');
var config = require('../config');
var reque;
var page;
var pages;
router.route('/')
    .get(function(req, res, next) {
        page=req.query.page;
        if(page){
            dbquery(reque +' LIMIT '+(page-1)*config.get('perpage')+','+config.get('perpage'),function(err, ress) {
                if (err) throw err;
                if (ress.length == 0) return next();
                var caps=[];
                for(var i=0;i<ress.length;i++){
                    caps.push({id:ress[i].id,text:ress[i].text,path:tools.pathMaker(ress[i].id,4)});
                }
                res.render('caps',{'num':caps.length,caps:caps,'page':page,'pages':pages,'link':'/search'});
            });
        }else{
            res.render('search');
        };

    })
    .post(function(req, res, next) {
        reque = req.body.text;
        if(reque=='') return next();
        if(req.body.lp) reque="%"+reque;
        if(req.body.rp) reque=reque+"%";
        reque='SELECT * FROM caps WHERE caps.text LIKE "'+reque+'"';
        dbquery(reque,function(err, ress, fields) {
                if (err) throw err;
                if (ress.length==0) return next();
                if (ress.length>config.get('perpage')){
                    res.redirect('/search?page=1');
                    pages=Math.ceil(ress.length/config.get('perpage'));
                }else{
                    var caps=[];
                    for(var i=0;i<ress.length;i++){
                        caps.push({id:ress[i].id,text:ress[i].text,path:tools.pathMaker(ress[i].id,4)});
                    }
                    res.render('caps',{'num':caps.length,caps:caps,'page':1,'pages':1,'link':'/search'});
                }
            });
    });
module.exports = router;
