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
	status: {
		type: String,
		default: "?"
	},
	date: {
		type: Date,
		default: Date.now() 
	}
});

var Request = module.exports = mongoose.model('Request',RequestSchema);

module.exports.createRequest = function(newRequest, callback){
	newRequest.save(callback);
}
module.exports.getRequestById = function(id, callback){
	Request.findById(id, callback);
}
module.exports.getRequestByIdAndRemove = function(id, callback){
	Request.findByIdAndRemove(id, callback);
}
module.exports.getRequestByAptno = function(aptno, callback) {
	var query = {aptno: aptno};
	Request.find(query, callback);
}