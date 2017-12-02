var express = require('express');
var router = express.Router();

	
//Get faq page
router.get('/', function(req,res) {
	res.render('resetPwd');
});

module.exports = router;