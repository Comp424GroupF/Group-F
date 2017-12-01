var express = require('express');
var router = express.Router();

var Request = require('../models/profile');

//Get profile page
router.get('/profile', ensureAuthenticated, function(req,res) {
	res.render('profile', {username: req.user.username});
});

//update profile page
router.get('/updateProfile', ensureAuthenticated, function(req,res) {
	res.render('updateProfile', {username: req.user.username});
});
//delete profile page
router.get('/deleteProfile', ensureAuthenticated, function(req,res) {
	res.render('deleteProfile', {username: req.user.username});
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