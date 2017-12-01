var mongoose = require('mongoose');


//Notice Schema
var RequestSchema = mongoose.Schema({
	aptno: {
		type: String
	},
	servicetype: {
		type: String
	},
	message: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now() 
	}
});

var Request = module.exports = mongoose.model('Request',RequestSchema);