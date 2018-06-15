var Coupon = require('../models/coupon');

exports.getCoupons = function(req, res, next){

    Coupon.find(function(err, coupons) {

        if (err){
        	res.send(err);
        }

        res.json(coupons);

    });

}

exports.createCoupon = function(req, res, next){

    Coupon.create({
        couponid : 'req.body.title',
        vendor : 'req.body.description',
        coupondata: 'req.body.rating',
        done : false
    }, function(err, coupon) {

        if (err){
        	res.send(err);
        }
       
        Coupon.find(function(err, coupons) {

            if (err){
            	res.send(err);
            }
                
            res.json(coupons);

        });

    });

}

exports.deleteCoupon = function(req, res, next){

    Coupon.remove({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        res.json(coupon);
    });

}

exports.activateCoupon = function(req, res, next){

    Coupon.update({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        res.json(coupon);
    });

}
exports.redeemCoupon = function(req, res, next){

    Coupon.update({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        res.json(coupon);
    });

}

exports.vaidateCoupon = function(req, res, next){

    Coupon.update({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        res.json(coupon);
    });
}

exports.getCoupon = function(req, res, next){

    Coupon.find({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        if (err){
                res.send(err);
        }
        res.json(coupon);
    });
}

exports.downloadCoupon = function(req, res, next){

    Coupon.find({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        if (err){
                res.send(err);
        }
        res.json(coupon);
    });
}
