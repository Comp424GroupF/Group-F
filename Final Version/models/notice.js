var mongoose = require('mongoose');


//Notice Schema
var NoticeSchema = mongoose.Schema({
	subject: {
		type: String
	},
	details: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

var Notice = module.exports = mongoose.model('Notice',NoticeSchema);

module.exports.createNotice = function(newNotice, callback){
	newNotice.save(callback);
}
module.exports.getNoticeById = function(id, callback){
	Notice.findById(id, callback);
}
module.exports.getNoticeByIdAndRemove = function(id, callback){
	Notice.findByIdAndRemove(id, callback);
}


