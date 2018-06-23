bitcoin = require('bitcoinjs-lib');
var coupon_scheme = require('../coupon_scheme.json');
var vendorcontract = require('../../config/contract.json');


exports.getAddress = function(){

  return "abcd";

}

exports.getHash = function(str){

  var buf = Buffer.from(str); 
  return bitcoin.crypto.sha256(buf);  

}

exports.getCoupon = function(coupondata){

  var coupon = {
    couponid: '',
    couponaddress: '',
    couponvalue: '',
    couponplan: '',
    couponhash: ''
  };

  coupon.couponid = coupondata.couponid;
  coupon.couponvalue = coupondata.couponvalue;
  coupon.couponplan = coupondata.couponplan;
  coupon.couponaddress = 'will be craeted 0x6262g';
  coupon.couponhash = getCouponHash(coupondata);

  return coupon; 
   
}


exports.couponCheck = function (coupondata)
{
   var arr = [];

   var plan = getPlan(coupondata.couponplan);   
   arr.push(plan);
   var vendorhash = getHash(vendorcontract.vendorsecret);
   arr.push(vendorhash);
  
   var str = JSON.stringify(arr); 
   var hash = getHash(str);

   if(hash == coupondata.hash) return true;
   else return false;
 
}

function getPlan(planname)
{
// this can be got from vendordb or json file

   var plan =  {name: "plan4p200f", desc: "4% commission 200 unit fees ",
        vendoraddress: "vendoraddress", contractoraddress: "contractoraddress",
        percent: "4", fixed:"200"};
}

function getScheme(schemename)
{

 var scheme = {name: "bitcoin_30", desc: "30% plan with bitcoin ", vendor: "70", contractor:"30"};

}


function getCouponHash(coupondata)
{
   var arr = [];
   
   var plan = getPlan(coupondata.couponplan);   
   arr.push(plan); 
   var vendorhash = getHash(vendorcontract.vendorsecret);
   arr.push(vendorhash);
  
   var str = JSON.stringify(arr); 
   var hash = BitcoinCoupon.getHash(str);

   return hash; 
}

