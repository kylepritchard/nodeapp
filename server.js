// Get required packages
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    passport = require('passport'),
    exphbs = require('express-handlebars');

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

//Use multer for multipart forms
app.use(multer({
    dest: './uploads/',
    rename: function(fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
}));

//Use passport for authentication
app.use(passport.initialize());

// Setup cors for cross domain posting
var cors = require('./controllers/cors');
app.use(cors);

// Set directory for views
app.set('views', __dirname + '/views');

// Set location of static elements
app.use(express.static(__dirname + '/public'));

// Set view engine to handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Use defined port or 3000
var port = process.env.PORT || 3000;

// Register all our routes with /
app.use('/', routes);

app.get('/', function(req, res) {
    res.send('hello world');
});

// STart server
app.listen(port);