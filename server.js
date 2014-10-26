// Get required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var exphbs  = require('express-handlebars');

//Load Routing
var routes = require('./routes/index');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog');

// Create Express Application
var app = express();

// Use packages in app
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(multer({ 
	dest: './uploads/',
	rename: function (fieldname, filename) {
	    return filename.replace(/\W+/g, '-').toLowerCase();
  }}));

app.use(passport.initialize());

// Set directory for views
app.set('views', __dirname + '/views');

// Set location of static elements
app.use(express.static(__dirname + '/public'));

// Set view engine to handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use defined port or 3000
var port = process.env.PORT || 3000;

// Register all our routes with /
app.use('/', routes);

app.get('/', function(req, res){
  res.send('hello world');
});

// STart server
app.listen(port);