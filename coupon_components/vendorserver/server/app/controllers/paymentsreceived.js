var Paymentreceived = require('../models/paymentreceived');
var paymentreceived_scheme = require('../paymentreceived_scheme.json');
var contract = require('../../config/contract.json');

var BitcoinPaymentreceived = require('../paymentreceived/bitcoinpaymentreceived');

exports.getPaymentreceiveds = function(req, res, next){

    Paymentreceived.find({},
        {'paymentreceiveddata': 1, 'paymentreceivedid':1, 'paymentreceivedaddress':1, 'paymentreceivedpin': 1, 'paymentreceivedvalue': 1},
        function(err, paymentreceiveds) {

        if (err){
        	res.send(err);
        }

        res.json(paymentreceiveds);

    });

}

function get_scheme(scheme)
{
  for(i=0; i< paymentreceived_scheme.schemes.length; i++)  
  {
     if(paymentreceived_scheme.schemes[i].paymentreceivedscheme == scheme)
     {
        return paymentreceived_scheme.schemes[i];
     }
  }
}

exports.createPaymentreceived = function(req, res ){
    var paymentreceiveddata = req.body;


    var createdpaymentreceived = '';

    
    createdpaymentreceived = BitcoinPaymentreceived.getPaymentreceived(paymentreceiveddata);
    

    console.log(createdpaymentreceived);

    Paymentreceived.create({
        paymentreceivedid : paymentreceiveddata.paymentreceivedid,
        paymentreceivedkey : paymentreceiveddata.paymentreceivedkey,
        vendorid : paymentreceiveddata.vendorid,
        paymentreceivedaddress : createdpaymentreceived.paymentreceivedaddress,
        paymentreceivedvalue : createdpaymentreceived.paymentreceivedvalue,
        paymentreceivedpin : paymentreceiveddata.paymentreceivedpin,
        paymentreceiveddata: JSON.stringify(createdpaymentreceived),
        done : false
    }, function(err, paymentreceived) {

        console.log("err="+err);
        if (err){
        	res.send(err);
        }
        else { 
        Paymentreceived.find( {_id: paymentreceived._id}, function(err, paymentreceiveds) {

            if (err){
            	res.send(err);
            }
            else {
            res.json(paymentreceiveds);
            }
            

        });
       }

    });

}

exports.deletePaymentreceived = function(req, res, next){

    Paymentreceived.remove({
        _id : req.params.paymentreceived_id
    }, function(err, paymentreceived) {
        res.json(paymentreceived);
    });

}

exports.activatePaymentreceived = function(req, res, next){

    Paymentreceived.update({
        paymentreceivedid : req.params.paymentreceivedid
    }, function(err, paymentreceived) {
        res.json(paymentreceived);
    });

}
exports.redeemPaymentreceived = function(req, res, next){
    if(validatePaymentreceived(req.body) == false)
    {
       var err = {
	  error: "Invalid paymentreceived"
       };

       res.status(1002).json(err);
    }

    Paymentreceived.update({
        paymentreceivedid : req.params.paymentreceivedid
    }, function(err, paymentreceived) {
        res.json(paymentreceived);
    });
    

}


exports.validatePaymentreceived = function(req, res, next){
  
    var res = paymentreceivedCheck(req.body); 
   
    res.json(res);

}

exports.getPaymentreceivedBalance = function(req, res, next){
 
    var address = req.body.paymentreceivedaddress;
 
    BitcoinPaymentreceived.getPaymentreceivedBalance(address,  function (bal) {

    res.json (bal);

    });

}

exports.getPaymentreceived = function(req, res, next){

    Paymentreceived.find({
        paymentreceivedid : req.params.paymentreceived_id}, {'paymentreceiveddata': 1,
			 'paymentreceivedaddress': 1},
     function(err, paymentreceived) {
        if (err){
                res.send(err);
        }
        else {
        req.paymentreceived = paymentreceived[0]; // useful when we need to process paymentreceived in next call
        res.json(paymentreceived[0]);
        }
    });
}

exports.getChargingBalance = function(req, res, next){

   var address = contract.chargingaddress;

    BitcoinPaymentreceived.getPaymentreceivedBalance(address,  function (bal) {

    res.json (bal);

    });
}

exports.getFeesBalance = function(req, res, next){

   var address = contract.feesaddress;

    BitcoinPaymentreceived.getPaymentreceivedBalance(address,  function (bal) {

    res.json (bal);
   });
}


exports.downloadPaymentreceived = function(req, res, next){

    Paymentreceived.find({
        _id : req.params.paymentreceived_id
    }, function(err, paymentreceived) {
        if (err){
                res.send(err);
        }
        res.json(paymentreceived);
    });
}
