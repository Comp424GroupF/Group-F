var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var Request = require('../models/request');


//Get Homepage
router.get('/', ensureAuthenticated, function(req,res) {
	//sorting the data by date
	Request.findOne({aptno: req.user.aptno})
		.then(function(doc){
			res.render('notification', {requests: doc, username: req.user.username, aptno: req.user.aptno});
		});
});

 function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	}
}  

module.exports = router;