var Coupon = require('../models/coupon');
var coupon_scheme = require('../coupon_scheme.json');

var BitcoinCoupon = require('../coupon/bitcoincoupon');

exports.getCoupons = function(req, res, next){

    Coupon.find(function(err, coupons) {

        if (err){
        	res.send(err);
        }

        res.json(coupons);

    });

}

function get_scheme(scheme)
{
  for(i=0; i< coupon_scheme.schemes.length; i++)  
  {
     if(coupon_scheme.schemes[i].couponscheme == scheme)
     {
        return coupon_scheme.schemes[i];
     }
  }
}

exports.createCoupon = function(req, res ){
    var coupondata = req.body;
    var funcfile = get_scheme(coupondata.couponscheme);


    var createdCoupon = '';

    if((coupondata.couponscheme == "bitcoin_30") || 
       (coupondata.couponscheme == "bitcoin_50") )
    {
       createdcoupon = BitcoinCoupon.getAddress(coupondata);
    }

    console.log(createdcoupon);

    Coupon.create({
        couponid : req.body.couponid,
        vendor : 'req.body.description',
        pin : req.body.couponpin,
        coupondata: JSON.stringify(req.body),
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

exports.validateCoupon = function(req, res, next){

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
