var express = require('express');
var router = express.Router();

var User = require('../models/user');

//Get profile page
router.get('/profile', ensureAuthenticated, function(req,res) {
	User.findOne({username: req.user.username})
		.then(function(doc) {
			res.render('profile', {profiles: doc,username: req.user.username});
	});
});

router.get('/updateProfile', ensureAuthenticated, function(req,res) {
	User.findOne({username: req.user.username})
		.then(function(doc) {
			res.render('updateProfile', {profiles: doc,username: req.user.username});
	});
});

//update profile page
router.post('/updateProfile', ensureAuthenticated, function(req,res) {
	User.getUserById(req.body.id, function(err, user) {
		if(err) throw err;
		else {
				user.name = req.body.name || user.name;
				user.aptno = req.body.aptno || user.aptno;
				user.apttype =  req.body.apttype || user.apttype;
				user.email = req.body.email || user.email;
				user.date = new Date();

				User.createUser(user, function(err, updateuser){
				if(err) throw err;
				console.log(updateuser);
			});
		req.flash('success_msg', 'Update Success!');

		res.redirect('/profiles/profile');
		}
	});
});
//delete profile page
router.get('/deleteProfile', ensureAuthenticated, function(req,res) {
		User.findOne({username: req.user.username})
		.then(function(doc) {
			res.render('deleteProfile', {profiles: doc,username: req.user.username});
	});
});
//delete profile post
//delete request post
router.post('/deleteProfile', function(req, res) {
	User.getUserById(req.body.id, function(err,user) {
		if(err) throw err;
		else {
				user.id = req.body.id;

				User.getUserByIdAndRemove(user, function(err, updatenotice){
				if(err) throw err;
			});
		req.flash('success_msg', 'Delete Success!');

		res.redirect('/users/login');
		}
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