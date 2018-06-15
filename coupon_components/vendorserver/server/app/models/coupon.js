var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var CouponSchema = new mongoose.Schema({

	couponid: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	coupondata: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	activate: {
		type: Boolean,
		required: true,
		default: false
	},
	redeemed: {
		type: Boolean,
		required: true,
		default: false
	},
	pin: {
		type: String,
		required: true
	},
	coupontype: {
		type: String,
		default: 'coupon101',
		required: true
	},
	vendor: {
		type: String,
		required: true
	},
	redeemer: {
		type: String,
		default: '',
		required: true
	},
	role: {
		type: String,
		enum: ['reader', 'creator', 'editor'],
		default: 'reader'
	}

}, {
	timestamps: true
});

CouponSchema.pre('save', function(next){

	var coupon = this;
	var SALT_FACTOR = 5;
// Check coupon is proper;
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

CouponSchema.methods.getPIN = function(passwordAttempt, cb){

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

module.exports = mongoose.model('Coupon', CouponSchema);
