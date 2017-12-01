var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/aptrentalcrm';
mongoose.connect(uristring, function(err,res) {
	if (err) {
		console.log('ERROR');
	} else {
		console.log('Success');
	}
});
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var notices = require('./routes/notices');
var requests = require('./routes/requests');
var profiles = require('./routes/profiles');
var contact = require('./routes/contact');
var faq = require('./routes/faq');
var paynow = require('./routes/paynow');
var reset = require('./routes/reset');
//Init app
var app = express();
//View Engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'Public')));
//Middleware for express session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true,
	store: new MongoStore({mongooseConnection: db})
}));

//passport inint
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

//Connect flash
app.use(flash());

//Global Vars
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

app.use('/',routes);
app.use('/users', users);
app.use('/notices', notices);
app.use('/requests', requests);
app.use('/profiles',profiles);
app.use('/contact', contact);
app.use('/faq', faq);
app.use('/paynow', paynow);
app.use('/reset', reset);

//Set port
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),function(){
	console.log('Server started on port ' + app.get('port'));
});


