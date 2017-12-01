var mongoose = require('mongoose');


//Notice Schema
var NoticeSchema = mongoose.Schema({
	subject: {
		type: String
	},
	notice: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now() 
	}
});

var Notice = module.exports = mongoose.model('Notice',NoticeSchema);