var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');
var tools = require('../js/tools');
var dbquery = require('../js/dbq');
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
                res.render('caps',{'num':caps.length,caps:caps,'page':page,'pages':pages,'link':'/'});
            });
        }else{
            dbquery("SELECT COUNT(*) FROM caps",function(err, ress, fields) {
                if (err) throw err;
                if (ress.length==0) return next();
                var len=ress[0]['COUNT(*)'];
                dbquery("SELECT * FROM caps WHERE id = " + Math.floor(Math.random() *len),function(err, ress, fields) {
                    if (err) throw err;
                    if (ress.length==0) return next();
                    res.render('index',{'num':len,'cap':{id:ress[0].id,text:ress[0].text,path:tools.pathMaker(ress[0].id,4),'title':'Случайная пробка @@@'},'perpage':config.get('perpage')});
                });
            });
        };

    })
    .post(function(req, res, next) {
        if(req.body.all){
            reque='SELECT * FROM caps';
        }else if(req.body.ids){
            reque = req.body.text;
            if(reque=='') return next();
            reque=reque.toString();
            var resin='';
           var arofd= reque.split(',');
            for(var i=0;i<arofd.length;i++){
                if(arofd[i].indexOf('-')>0){
                   var innerarofid= arofd[i].split('-');
                    for(var j=innerarofid[0];j<=innerarofid[1];j++){
                        resin+=j+',';
                    }
                }else{
                   resin+=arofd[i]+',';
                }
            }
            if(resin.length>1){
                resin=resin.substring(0,resin.length-1);
            }
            reque='SELECT * FROM caps WHERE id IN('+resin+')';
        }else if(req.body.last){
           reque='(SELECT * FROM caps ORDER BY id DESC LIMIT ' +config.get('perpage')+') ORDER BY id ASC';
        }
        dbquery(reque,function(err, ress, fields) {
            if (err) throw err;
            if (ress.length==0) return next();
            if (ress.length>config.get('perpage')){
                res.redirect('/?page=1');
                pages=Math.ceil(ress.length/config.get('perpage'));
            }else{
                var caps=[];
                for(var i=0;i<ress.length;i++){
                    caps.push({id:ress[i].id,text:ress[i].text,path:tools.pathMaker(ress[i].id,4)});
                }
                res.render('caps',{'num':caps.length,caps:caps,'page':1,'pages':1,'link':'/'});
            }
        });
    });

module.exports = router;
