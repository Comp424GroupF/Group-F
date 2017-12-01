var express = require('express');
var router = express.Router();

var Notice = require('../models/notice');

//Get announcement page
router.get('/announcement', ensureAuthenticated, function(req,res) {
	res.render('announcement',{username: req.user.username});
});

//announcement add page
router.get('/addNotice', ensureAuthenticated, function(req,res) {
	res.render('addNotice', {username: req.user.username});
});
//announcement update page
router.get('/updateNotice', ensureAuthenticated, function(req,res) {
	res.render('updateNotice', {username: req.user.username});
});
//announcement delete page
router.get('/deleteNotice', ensureAuthenticated, function(req,res) {
	res.render('deleteNotice', {username: req.user.username});
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