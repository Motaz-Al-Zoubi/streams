var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'HarmonicaDB'
});
 
console.log('before trying to connect');
connection.connect(function(err, data) {
    if(err)
     console.log('err in making the connection', err);
    else {
        console.log('connection succeed: ', data);
        console.log("after trying to connect");

        connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
            if (error) {
              console.log("error in exec the query", error);
              throw error;
            }
            console.log("The solution is: ", results[0].solution);
          }
        );

        console.log("before closing connection");
        connection.end(function (err) {
          if (err) {
            console.log("error in closing the connection: ", err);
          } else {
            console.log("connection closed successfully: ");
          }
        });
    }
});
