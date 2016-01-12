var express = require('express');
var app = express();
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')


app.use(methodOverride('_method'));

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = "mongodb://localhost:27017/bikes";
var db;


MongoClient.connect(mongoUrl, function(err, database){
  if (err) {
    console.log(err);
  }
  console.log("connected!");
  db = database;
  process.on('exit', db.close);
})


app.use(function(req, res, next){
  console.log("body:", req.body, "params:", req.params, "query:", req.query);
  next();
});




app.listen(process.env.PORT || 3000);

