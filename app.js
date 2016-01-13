var express = require('express');
var app = express();
var methodOverride = require('method-override');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());


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



passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
// var events = db.collection('events').find({}).toArray( function(err, result) { return result})

app.use(function(req, res, next){
  console.log("body:", req.body, "params:", req.params, "query:", req.query);
  next();
});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/calendar', function(req, res){
	db.collection('events').find({_id: ObjectId(req.params.id)}).toArray(function(err, result) {
	console.log(result)
  	res.render('calendar', {oneEvent: result});
  });
});

app.get('/events', function(req, res) {
 // send back json that ya got from mongo
 db.collection('events').find({}).toArray( function(err, result) { 
 res.send(result) 
 })
});


app.get('/events/:name', function(req, res) {
	db.collection('events').find({name: req.params.name}).toArray(function(err, result) {
	console.log(result)
	res.json(result)
	})
});


app.get('/login', function(req, res){
  res.render('login');
});


app.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login'
  })
);

app.get('/signup', function(req, res){
  res.render('signup');
});




app.listen(process.env.PORT || 3000);

