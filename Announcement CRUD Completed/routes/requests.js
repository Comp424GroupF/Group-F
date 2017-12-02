var express = require('express');
var router = express.Router();

var Request = require('../models/request');

//Get servicerequest page
router.get('/servicerequest', ensureAuthenticated, function(req,res) {
	res.render('servicerequest', {username: req.user.username});
});

//update request page
router.get('/updateRequest', ensureAuthenticated, function(req,res) {
	res.render('updateRequest', {username: req.user.username});
});
//delete request page
router.get('/deleteRequest', ensureAuthenticated, function(req,res) {
	res.render('deleteRequest', {username: req.user.username});
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