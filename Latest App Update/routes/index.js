var express = require('express');
var router = express.Router();

var Notice = require('../models/notice');


//Get Homepage
router.get('/', ensureAuthenticated, function(req,res) {
	//sorting the data by date
	Notice.findOne().sort({date:-1})
		.then(function(doc){
			res.render('welcome', {notices: doc, username: req.user.username, aptno: req.user.aptno});
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