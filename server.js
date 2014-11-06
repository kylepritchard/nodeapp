// Get required packages
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    exphbs = require('express-handlebars');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog');

// Create Express Application
var app = express();

// Use packages in app
app.use(bodyParser.urlencoded({
    extended: true
}));

// Manage uploads & image resizing
var uploads = require('./controllers/upload');
app.use(uploads);

//Use passport for authentication
app.use(passport.initialize());

// Setup cors for cross domain posting
var cors = require('./server/cors');
app.use(cors);

// Set directory for views
app.set('views', __dirname + '/views');

// Set location of static elements
app.use(express.static(__dirname + '/public'));

// Set view engine to handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: "views/partials/"
}));
app.set('view engine', 'handlebars');

// Use defined port or 3000
var port = process.env.PORT || 3000;

// Register all our routes with /
// app.use('/', routes);

//Load Routing
var routes = require('./routes/index')(app);

// Start server
app.listen(port);