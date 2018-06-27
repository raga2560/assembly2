bitcoin = require('bitcoinjs-lib');
compositekeylib = require('./compositekeylib');

request = require('request');
var coupon_scheme = require('../coupon_scheme.json');
var vendorcontract = require('../../config/contract.json');

var globalnetwork = bitcoin.networks.testnet;

exports.getAddress = function(){

  return "abcd";

}

exports.getHash = function(str){

  var buf = Buffer.from(str); 
  return bitcoin.crypto.sha256(buf);  

}


function getHash (str)
{
  var buf = Buffer.from(str); 
  return bitcoin.crypto.sha256(buf);  

}

exports.getCoupon = function(coupondata){

  var coupon = {
    couponid: '',
    couponaddress: '',
    couponkey: '',
    couponvalue: '',
    couponplan: '',
    couponhash: ''
  };

  coupon.couponid = coupondata.couponid;
  coupon.couponvalue = coupondata.couponvalue;
  coupon.couponkey = coupondata.couponkey;
  coupon.couponplan = coupondata.couponplan;
  coupon.couponhash = getCouponHash(coupondata).toString('hex');
  
  coupon.couponaddress = getCouponAddress(coupondata);

  return coupon; 
   
}

function getCouponAddress(coupondata   )
{
  var couponstub = {
   couponhash: coupondata.couponhash, 
   couponpin: coupondata.couponpin 
  };

  var Pin = JSON.stringify(couponstub);
  var Pinkey = Buffer.from(Pin);
  var uidkey = Buffer.from(coupondata.couponkey);

   var docaddr = compositekeylib.getBufControlCodeAddress(Pinkey,
                uidkey,
                globalnetwork);
   console.log("docaddr = "+docaddr);

   return docaddr;
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
   var hash = getHash(str);

   return hash; 
}



exports.getCouponBalance = function (couponaddress, callback)
{

   var url = vendorcontract.bitcoinserverurl +"/addrs/"+couponaddress;

   request.get(url + '/full', function (error, response, body) {
        if (error) {
            return callback(error)
        }
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        console.log('Status:', response.statusCode)
        console.log('Body:', body)
        var balance = {
          balance: body.balance,
          address: body.address,
          unconfirmed_balance: body.unconfirmed_balance

        };
        return callback(balance)
    })


}
