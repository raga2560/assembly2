bitcoin = require('bitcoinjs-lib');
compositekeylib = require('./compositekeylib');

request = require('request');
var payment_scheme = require('../payment_scheme.json');
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

exports.getPayment = function(paymentdata){

  var payment = {
    paymentmadeid: '',
    paymentmadeaddress: '',
    paymentmadekey: '',
    paymentmadevalue: '',
    paymentmadeplan: '',
    paymentmadehash: ''
  };

  payment.paymentmadeid = paymentdata.paymentid;
  payment.paymentmadevalue = paymentdata.paymentvalue;
  payment.paymentmadekey = paymentdata.paymentkey;
  payment.paymentmadeplan = paymentdata.paymentplan;
  payment.paymentmadehash = getPaymentHash(paymentdata).toString('hex');
  
  payment.paymentmadeaddress = getPaymentAddress(paymentdata);

  return payment; 
   
}

function getPaymentAddress(paymentdata   )
{
  var paymentstub = {
   paymenthash: paymentdata.paymenthash, 
   paymentpin: paymentdata.paymentpin 
  };

  var Pin = JSON.stringify(paymentstub);
  var Pinkey = Buffer.from(Pin);
  var uidkey = Buffer.from(paymentdata.paymentkey);

   var docaddr = compositekeylib.getBufControlCodeAddress(Pinkey,
                uidkey,
                globalnetwork);
   console.log("docaddr = "+docaddr);

   return docaddr;
}


exports.paymentCheck = function (paymentdata)
{
   var arr = [];

   var plan = getPlan(paymentdata.paymentplan);   
   arr.push(plan);
   var vendorhash = getHash(vendorcontract.vendorsecret);
   arr.push(vendorhash);
  
   var str = JSON.stringify(arr); 
   var hash = getHash(str);

   if(hash == paymentdata.hash) return true;
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


function getPaymentHash(paymentdata)
{
   var arr = [];
   
   var plan = getPlan(paymentdata.paymentplan);   
   arr.push(plan); 
   var vendorhash = getHash(vendorcontract.vendorsecret);
   arr.push(vendorhash);
  
   var str = JSON.stringify(arr); 
   var hash = getHash(str);

   return hash; 
}



exports.getPaymentBalance = function (paymentaddress, callback)
{

   var url = vendorcontract.bitcoinserverurl +"/addrs/"+paymentaddress;

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
