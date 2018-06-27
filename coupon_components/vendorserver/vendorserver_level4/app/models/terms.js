var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var TermsSchema = new mongoose.Schema({

	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	aggrementcode: {
		type: String,
		required: true
	},
	recordid: {
		type: String,
		required: true
	},
	aggrementtime: {
		type: { type:Date }
	},

	role: {
		type: String,
		enum: ['reader', 'creator', 'editor'],
		default: 'reader'
	}

}, {
	timestamps: true
});

TermsSchema.pre('save', function(next){

	var user = this;
	var SALT_FACTOR = 5;

	if(!user.isModified('password')){
		return next();
	} 

	bcrypt.genSalt(SALT_FACTOR, function(err, salt){

		if(err){
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, function(err, hash){

			if(err){
				return next(err);
			}

			user.password = hash;
			next();

		});

	});

});

TermsSchema.methods.comparePassword = function(passwordAttempt, cb){

	bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){

		if(err){
			return cb(err);
		} else {
			cb(null, isMatch);
		}
	});

}

module.exports = mongoose.model('Terms', TermsSchema);
