var mysql      = require('mysql');
var config = require('../config');
function dbquery(qtext,callback){
   var connection = mysql.createConnection(config.get('dbconf'));
   connection.connect();
   connection.query(qtext,function(err, ress, fields){
      callback(err, ress, fields);
   });
   connection.end();
}
module.exports=dbquery;