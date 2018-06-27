var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var ContractaddrSchema = new mongoose.Schema({

	contractwif: {
		type: String,
		unique: true,
		required: true
	},
	network: {
		type: String,  // mainnet or testnet
		default: 'testnet'
	},
	contractaddress: {
		type: String,
		required: true
	},
	cryptotype: {
		type: String, // bitcoin or ethereum
		default: 'bitcoin'
	},
	role: {
		type: String,
		enum: ['reader', 'creator', 'editor'],
		default: 'reader'
	}

}, {
	timestamps: true
});

ContractaddrSchema.pre('save', function(next){

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

ContractaddrSchema.methods.getPIN = function(passwordAttempt, cb){

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

module.exports = mongoose.model('Contractaddr', ContractaddrSchema);
