var mongoose = require('mongoose');


//Notice Schema
var ProfileSchema = mongoose.Schema({
	name: {
		type: String
	},
	aptno: {
		type: String
	},
	address: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zipcode: {
		type: String
	},
	creditscore: {
		type: String
	},
	apttype: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now() 
	}
});

var Profile = module.exports = mongoose.model('Profile',ProfileSchema);