var express = require('express');
var router = express.Router();

var Notice = require('../models/notice');

//Get announcement page
router.get('/announcement', ensureAuthenticated, function(req,res,next) {
	//sorting the data by date
	Notice.find().sort({date:-1})
		.then(function(doc){
			res.render('announcement', {notices: doc,username: req.user.username});
		});
});

//announcement add page
router.get('/addNotice', ensureAuthenticated, function(req,res) {
	res.render('addNotice', {username: req.user.username});
});

router.post('/addNotice', function(req, res){
	var subject = req.body.subject;
	var details = req.body.details;

	//validation
	req.checkBody('subject','Subject is required').notEmpty();
	req.checkBody('details', 'Details is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('addNotice', {
			errors:errors
		});
	} else {
		var newNotice = new Notice({
			subject: subject,
			details: details
		});

		Notice.createNotice(newNotice, function(err, notice){
			if(err) throw err;
			console.log(notice);
		});

		req.flash('success_msg', 'Save Success!');

		res.redirect('/notices/announcement');
	}
});

//announcement update page
router.get('/updateNotice', ensureAuthenticated, function(req,res) {
	//sorting the data by date
	Notice.find().sort({date:-1})
		.then(function(doc){
			res.render('updateNotice', {notices: doc,username: req.user.username});
	});
});
router.post('/updateNotice', function(req,res) {
	Notice.getNoticeById(req.body.id, function(err,notice) {
		if(err) throw err;
		else {
				notice.subject = req.body.subject || notice.subject;
				notice.details = req.body.details || notice.details;

				Notice.createNotice(notice, function(err, updatenotice){
				if(err) throw err;
				console.log(updatenotice);
			});
		req.flash('success_msg', 'Update Success!');

		res.redirect('/notices/announcement');
		}
	})
});
//announcement delete page
router.get('/deleteNotice', ensureAuthenticated, function(req,res) {
	//sorting the data by date
	Notice.find().sort({date:-1})
		.then(function(doc){
			res.render('deleteNotice', {notices: doc, username: req.user.username});
	});
});

router.post('/deleteNotice', function(req, res) {
	Notice.getNoticeById(req.body.id, function(err,notice) {
		if(err) throw err;
		else {
				notice.id = req.body.id;

				Notice.getNoticeByIdAndRemove(notice, function(err, updatenotice){
				if(err) throw err;
			});
		req.flash('success_msg', 'Delete Success!');

		res.redirect('/notices/announcement');
		}
	})
})

 function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	}
} 

module.exports = router;