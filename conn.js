const { json } = require('body-parser');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host:"bbhqztcimydzlqvfjgfa-mysql.services.clever-cloud.com",
    user:'uzdckiy8r0ouwavn',
    password:"9eKil3OSvcNBWBW9ufry",
    database:"bbhqztcimydzlqvfjgfa",
});

conn.connect(function(err){
    if(err){
        console.log("Error in DB connection: "+json.stringify(err, undefined, 2));
    }
    else{
        console.log("Connection Successful.");
    }
});

module.exports=conn;