var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://root:Ipodgenius21@cluster0-m6l65.mongodb.net";


var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  if (q.type == "signup") {
    //check if given user already exists, then insert user and pass into db
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { user: q.user };
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result[0] == null) {
                var obj = { user: q.user, pass: q.pass };
                dbo.collection("users").insertOne(obj, function(err, res) {
                    if (err) throw err;
                    res.end("Signed up");
                    db.close();
                });
            }
            else {
                res.end('Username is taken');
            }
            db.close();
        });
    });
  }
  else if (q.type == "signin") {
    //find user with given user and check password
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { user: q.user }
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result[0] == null) {
                res.end("User does not exist");
            }
            else {
                var realPass = result[0].pass;
                if (q.pass == realPass) {
                    console.log(q.user + " has signed in.");
                    res.end("Signed in");
                }
                else {
                    res.end("Password is incorrect");
                }
            }
            db.close();
        });
        db.close();
    });
  }
  else {
    res.end("error");
  }
}).listen(8080);