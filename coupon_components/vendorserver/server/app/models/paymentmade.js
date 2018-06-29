var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var PaymentmadeSchema = new mongoose.Schema({

	paymentmadeid: {
		type: String,
		unique: true,
		required: true
	},
	paymentmadedata: {
		type: String,
		required: true
	},
	paymentmadekey: {
		type: String,
		required: true
	},
	paymentmadeaddress: {
		type: String,
		required: true
	},
	paymentmadevalue: {
		type: String,
		required: true
	},
	vendorid: {
		type: String,
		required: true
	},
	activate: {
		type: Boolean,
		default: false
	},
	redeemed: {
		type: Boolean,
		default: false
	},
	paymentmadepin: {
		type: String,
		required: true
	},
	paymentmadetype: {
		type: String,
		default: 'paymentmade101',
	},
	redeemer: {
		type: String,
		default: '',
	},
	role: {
		type: String,
		enum: ['reader', 'creator', 'editor'],
		default: 'reader'
	}

}, {
	timestamps: true
});

PaymentmadeSchema.pre('save', function(next){

	var paymentmade = this;
	var SALT_FACTOR = 5;

                return next();

// Check paymentmade is proper;
/*
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
  */

});

PaymentmadeSchema.methods.getPIN = function(passwordAttempt, cb){

/*
	bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){

		if(err){
			return cb(err);
		} else {
			cb(null, isMatch);
		}
	});
 */

}

module.exports = mongoose.model('Paymentmade', PaymentmadeSchema);
