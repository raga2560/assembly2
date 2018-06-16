var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var CouponSchema = new mongoose.Schema({

	couponid: {
		type: String,
		unique: true,
		required: true
	},
	coupondata: {
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
	pin: {
		type: String,
		required: true
	},
	coupontype: {
		type: String,
		default: 'coupon101',
	},
	vendor: {
		type: String,
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

CouponSchema.pre('save', function(next){

	var coupon = this;
	var SALT_FACTOR = 5;

                return next();

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
