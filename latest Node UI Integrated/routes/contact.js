var express = require('express');
var router = express.Router();

	
//Get contact page
router.get('/', function(req,res) {
	res.render('contact');
});

module.exports = router;