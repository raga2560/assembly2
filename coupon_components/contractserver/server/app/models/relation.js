var mongoose = require('mongoose');

var RelationSchema = new mongoose.Schema({

	planid: {
		type: String,
		unique: true,
		required: true
	},
	planname: {
		type: String,
		required: true
        },
	vendorid: {
		type: String,
		lowercase: true,
		required: true
	},
	vendorfixedfees: {
		type: String,
		required: true
	},
	vendorpercentagefees: {
		type: String,
		required: true
	},
        vendoraddress: {
                type: String,
		required: true
        },
        vendorsignature: {
                type: String,
		required: true
        },

	contractorid: {
		type: String,
		required: true
	},
	contractorfixedfees: {
		type: String,
		required: true
	},
	contractorpercentagefees: {
		type: String,
		required: true
	},
        contractoraddress: {
                type: String,
		required: true
        },
        vendorsignature: {
                type: String,
		required: true
        },
	activate: {
		type: Boolean,
		default: false
	},
	paused: {
		type: Boolean,
		default: false
	},
	relationtype: {
		type: String,
		default: 'relation101',
	},
	validationhash: {
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

RelationSchema.pre('save', function(next){

	var coupon = this;
	var SALT_FACTOR = 5;
        next();
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

RelationSchema.methods.getPIN = function(passwordAttempt, cb){

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

module.exports = mongoose.model('Relation', RelationSchema);
