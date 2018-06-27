var mongoose = require('mongoose');

var PlanmanagerSchema = new mongoose.Schema({

	planid: {
		type: String,
		unique: true,
                required: true
	},
	planname: {
		type: String,
                required: true
	},
	serverdata: {
		type: String,
                required: true
	},
	clientdata: {
		type: String,
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
	contractorsignature: {
		type: String
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
		default: ''
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
PlanmanagerSchema.pre('save', function(next){

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
PlanmanagerSchema.methods.getPIN = function(passwordAttempt, cb){

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

module.exports = mongoose.model('Planmanager', PlanmanagerSchema);
