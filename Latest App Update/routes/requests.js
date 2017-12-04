var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost/aptrentalcrm';

var Request = require('../models/request');


//Get servicerequest page
router.get('/servicerequest', ensureAuthenticated, function(req,res) {
	var apt = req.user.aptno;
	var resultArray = [];
	mongo.connect(url, function(err, db) {
    var cursor = db.collection('requests').find().sort({date:-1});
    cursor.forEach(function(doc, err) {
    	if(doc.aptno === apt){
    		resultArray.push(doc);
    		console.log(JSON.stringify(doc.servicetype));
    	}
    }, function() {
      db.close();
      res.render('servicerequest', {requests: resultArray,username: req.user.username, aptno: req.user.aptno});
    });
  });
});

//request add page
router.get('/addRequest', ensureAuthenticated, function(req,res) {
	res.render('addRequest', {username: req.user.username, aptno: req.user.aptno});
});

//add request post
router.post('/addRequest', function(req, res){
	var aptno = req.user.aptno;
	var servicetype = req.body.servicetype;
	var message = req.body.message;

	//validation
	req.checkBody('servicetype', 'Servicetype is required').notEmpty();
	req.checkBody('message', 'Message is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('addRequest', {
			errors:errors
		});
	} else {
		var newRequest = new Request({
			aptno: aptno,
			servicetype: servicetype,
			message: message
		});

		Request.createRequest(newRequest, function(err, request){
			if(err) throw err;
			console.log(request);
		});

		req.flash('success_msg', 'Save Success!');

		res.redirect('/requests/servicerequest');
	}
});

//update request page
router.get('/updateRequest', ensureAuthenticated, function(req,res) {
	Request.find({aptno: req.user.aptno}).sort({date:-1})
		.then(function(doc) {
			res.render('updateRequest', {requests: doc,username: req.user.username});
	});
});

//update request post
router.post('/updateRequest', function(req,res) {
	Request.getRequestById(req.body.id, function(err,request) {
		if(err) throw err;
		else {
				request.servicetype = req.body.servicetype || request.servicetype;
				request.message =  req.body.message || request.message;
				request.status = req.body.status || request.status;
				request.date = new Date();

				Request.createRequest(request, function(err, updaterequest){
				if(err) throw err;
				console.log(updaterequest);
			});
		req.flash('success_msg', 'Update Success!');

		res.redirect('/requests/servicerequest');
		}
	});
});

//delete request page
router.get('/deleteRequest', ensureAuthenticated, function(req,res) {
	Request.find({aptno: req.user.aptno}).sort({date:-1})
		.then(function(doc) {
			res.render('deleteRequest', {requests: doc,username: req.user.username});
	});
});

//delete request post
router.post('/deleteRequest', function(req, res) {
	Request.getRequestById(req.body.id, function(err,request) {
		if(err) throw err;
		else {
				request.id = req.body.id;

				Request.getRequestByIdAndRemove(request, function(err, deletenotice){
				if(err) throw err;
			});
		req.flash('success_msg', 'Delete Success!');

		res.redirect('/requests/servicerequest');
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