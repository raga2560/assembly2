var mongoose = require('mongoose');

var ManagerSchema = new mongoose.Schema({

	planid: {
		type: String,
		lowercase: true,
		unique: true,
                required: true
	},
	serverdata: {
		type: String,
		lowercase: true,
                required: true
	},
	clientdata: {
		type: String,
		lowercase: true,
                required: true
	},
	activate: {
		type: Boolean,
		default: false
	},
	deactivated: {
		type: Boolean,
		default: false
	},
	pinhash: {
		type: String,
                required: true
	},
	plantype: {
		type: String,
		default: 'couponplan101',
	},
	vendorid: {
		type: String,
                required: true
	},
	contractorid: {
		type: String,
		default: '',
	},
	validatorhash: {
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

/*
ManagerSchema.pre('save', function(next){

	var manager = this;
	var SALT_FACTOR = 5;
        return next();
// Check coupon is proper;
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

  */
ManagerSchema.methods.getPIN = function(passwordAttempt, cb){

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

module.exports = mongoose.model('Manager', ManagerSchema);
