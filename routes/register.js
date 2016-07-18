var express = require('express');
var router = express.Router();
var config = require('../config');
var User = require('../lib/user');

router.route('/')
    .get(function(req, res, next) {
       res.render('register',{title:'Регистрация'});
    })
    .post(function(req, res, next) {
        var data = req.body;
        console.log(data);
        User.getByName(data.name,function (err,user) {
            console.log(data.name,"####",err,user);
            if(err) return fn(err);
            if(user.id){
                res.error("Логин занят");
                res.redirect('back');
            }else{
                user = new User({
                    name: data.name,
                    pass: data.pass
                });
                user.save(function(err){
                    if(err) return fn(err);
                    req.session.uid = user.id;
                    res.redirect('/');
                });
            }
        });
        console.log("register->post")
    });

module.exports = router;
