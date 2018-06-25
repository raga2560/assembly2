var Coupon = require('../models/coupon');
var coupon_scheme = require('../coupon_scheme.json');
var contract = require('../../config/contract.json');

var BitcoinCoupon = require('../coupon/bitcoincoupon');

exports.getCoupons = function(req, res, next){

    Coupon.find({},
        {'coupondata': 1, 'couponid':1, 'couponaddress':1, 'couponpin': 1, 'couponvalue': 1},
        function(err, coupons) {

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


    var createdcoupon = '';

    
    createdcoupon = BitcoinCoupon.getCoupon(coupondata);
    

    console.log(createdcoupon);

    Coupon.create({
        couponid : coupondata.couponid,
        couponkey : coupondata.couponkey,
        vendorid : coupondata.vendorid,
        couponaddress : createdcoupon.couponaddress,
        couponvalue : createdcoupon.couponvalue,
        couponpin : coupondata.couponpin,
        coupondata: JSON.stringify(createdcoupon),
        done : false
    }, function(err, coupon) {

        console.log("err="+err);
        if (err){
        	res.send(err);
        }
        else { 
        Coupon.find( {_id: coupon._id}, function(err, coupons) {

            if (err){
            	res.send(err);
            }
            else {
            res.json(coupons);
            }
            

        });
       }

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
        couponid : req.params.couponid
    }, function(err, coupon) {
        res.json(coupon);
    });

}
exports.redeemCoupon = function(req, res, next){
    if(validateCoupon(req.body) == false)
    {
       var err = {
	  error: "Invalid coupon"
       };

       res.status(1002).json(err);
    }

    Coupon.update({
        couponid : req.params.couponid
    }, function(err, coupon) {
        res.json(coupon);
    });
    

}


exports.validateCoupon = function(req, res, next){
  
    var res = couponCheck(req.body); 
   
    res.json(res);

}

exports.getCouponBalance = function(req, res, next){
 
    var address = req.body.couponaddress;
 
    BitcoinCoupon.getCouponBalance(address,  function (bal) {

    res.json (bal);

    });

}

exports.getCoupon = function(req, res, next){

    Coupon.find({
        couponid : req.params.coupon_id}, {'coupondata': 1,
			 'couponaddress': 1},
     function(err, coupon) {
        if (err){
                res.send(err);
        }
        else {
        req.coupon = coupon[0]; // useful when we need to process coupon in next call
        res.json(coupon[0]);
        }
    });
}

exports.getChargingBalance = function(req, res, next){

   var address = contract.chargingaddress;

    BitcoinCoupon.getCouponBalance(address,  function (bal) {

    res.json (bal);

    });
}

exports.getFeesBalance = function(req, res, next){

   var address = contract.feesaddress;

    BitcoinCoupon.getCouponBalance(address,  function (bal) {

    res.json (bal);
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
