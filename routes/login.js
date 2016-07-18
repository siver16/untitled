var User = require('../lib/user');

exports.form = function (req,res){
    res.render('login',{title:'Вход'});
};
exports.submit=function(req, res) {
    var data = req.body;
    User.autheticate(data.name,data.pass,function (err,user) {

        if(err) return next(err);
        if(user){
            req.session.uid = user.id;
            res.redirect('/');
        }else{
            res.error("не пущу :)");
            res.redirect('back');            
        }
    });
};
exports.logout = function (req,res){
    req.session.destroy(function(err){
        if(err) throw err;
        res.redirect('/');
    });
}
