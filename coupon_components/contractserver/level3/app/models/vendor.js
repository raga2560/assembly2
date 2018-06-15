var mongoose = require('mongoose');

var VendorSchema = new mongoose.Schema({

	vendorid: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	vendordata: {
		type: Schema.Types.Mixed,
		required: true
	},
	contract: {
		type: Schema.Types.Mixed,
		required: true
	},
	clientdata: {
		type: String,
		lowercase: true,
		required: true
	},
	activate: {
		type: Boolean,
		required: true,
		default: false
	},
	paused: {
		type: Boolean,
		required: true,
		default: false
	},
	pin: {
		type: String,
		required: true
	},
	vendortype: {
		type: String,
		default: 'vendor101',
		required: true
	},
	contractorincomeaddress: {
		type: String,
		default: ''
	},
	contractorspendingaddress: {
		type: String,
		default: ''
	},
	validationhash: {
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

VendorSchema.pre('save', function(next){

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

VendorSchema.methods.getPIN = function(passwordAttempt, cb){

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

module.exports = mongoose.model('Vendor', VendorSchema);
