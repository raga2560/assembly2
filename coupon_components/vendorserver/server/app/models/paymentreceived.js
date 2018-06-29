var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var PaymentreceivedSchema = new mongoose.Schema({

	paymentreceivedid: {
		type: String,
		unique: true,
		required: true
	},
	paymentreceiveddata: {
		type: String,
		required: true
	},
	paymentreceivedkey: {
		type: String,
		required: true
	},
	paymentreceivedaddress: {
		type: String,
		required: true
	},
	paymentreceivedvalue: {
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
	paymentreceivedpin: {
		type: String,
		required: true
	},
	paymentreceivedtype: {
		type: String,
		default: 'paymentreceived101',
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

PaymentreceivedSchema.pre('save', function(next){

	var paymentreceived = this;
	var SALT_FACTOR = 5;

                return next();

// Check paymentreceived is proper;
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

PaymentreceivedSchema.methods.getPIN = function(passwordAttempt, cb){

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

module.exports = mongoose.model('Paymentreceived', PaymentreceivedSchema);
