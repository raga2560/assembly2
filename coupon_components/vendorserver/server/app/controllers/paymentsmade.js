var Paymentmade = require('../models/paymentmade');
var paymentmade_scheme = require('../paymentmade_scheme.json');
var contract = require('../../config/contract.json');

var BitcoinPaymentmade = require('../paymentmade/bitcoinpaymentmade');

exports.getPaymentmades = function(req, res, next){

    Paymentmade.find({},
        {'paymentmadedata': 1, 'paymentmadeid':1, 'paymentmadeaddress':1, 'paymentmadepin': 1, 'paymentmadevalue': 1},
        function(err, paymentmades) {

        if (err){
        	res.send(err);
        }

        res.json(paymentmades);

    });

}

function get_scheme(scheme)
{
  for(i=0; i< paymentmade_scheme.schemes.length; i++)  
  {
     if(paymentmade_scheme.schemes[i].paymentmadescheme == scheme)
     {
        return paymentmade_scheme.schemes[i];
     }
  }
}

exports.createPaymentmade = function(req, res ){
    var paymentmadedata = req.body;


    var createdpaymentmade = '';

    
    createdpaymentmade = BitcoinPaymentmade.getPaymentmade(paymentmadedata);
    

    console.log(createdpaymentmade);

    Paymentmade.create({
        paymentmadeid : paymentmadedata.paymentmadeid,
        paymentmadekey : paymentmadedata.paymentmadekey,
        vendorid : paymentmadedata.vendorid,
        paymentmadeaddress : createdpaymentmade.paymentmadeaddress,
        paymentmadevalue : createdpaymentmade.paymentmadevalue,
        paymentmadepin : paymentmadedata.paymentmadepin,
        paymentmadedata: JSON.stringify(createdpaymentmade),
        done : false
    }, function(err, paymentmade) {

        console.log("err="+err);
        if (err){
        	res.send(err);
        }
        else { 
        Paymentmade.find( {_id: paymentmade._id}, function(err, paymentmades) {

            if (err){
            	res.send(err);
            }
            else {
            res.json(paymentmades);
            }
            

        });
       }

    });

}

exports.deletePaymentmade = function(req, res, next){

    Paymentmade.remove({
        _id : req.params.paymentmade_id
    }, function(err, paymentmade) {
        res.json(paymentmade);
    });

}

exports.activatePaymentmade = function(req, res, next){

    Paymentmade.update({
        paymentmadeid : req.params.paymentmadeid
    }, function(err, paymentmade) {
        res.json(paymentmade);
    });

}
exports.redeemPaymentmade = function(req, res, next){
    if(validatePaymentmade(req.body) == false)
    {
       var err = {
	  error: "Invalid paymentmade"
       };

       res.status(1002).json(err);
    }

    Paymentmade.update({
        paymentmadeid : req.params.paymentmadeid
    }, function(err, paymentmade) {
        res.json(paymentmade);
    });
    

}


exports.validatePaymentmade = function(req, res, next){
  
    var res = paymentmadeCheck(req.body); 
   
    res.json(res);

}

exports.getPaymentmadeBalance = function(req, res, next){
 
    var address = req.body.paymentmadeaddress;
 
    BitcoinPaymentmade.getPaymentmadeBalance(address,  function (bal) {

    res.json (bal);

    });

}

exports.getPaymentmade = function(req, res, next){

    Paymentmade.find({
        paymentmadeid : req.params.paymentmade_id}, {'paymentmadedata': 1,
			 'paymentmadeaddress': 1},
     function(err, paymentmade) {
        if (err){
                res.send(err);
        }
        else {
        req.paymentmade = paymentmade[0]; // useful when we need to process paymentmade in next call
        res.json(paymentmade[0]);
        }
    });
}

exports.getChargingBalance = function(req, res, next){

   var address = contract.chargingaddress;

    BitcoinPaymentmade.getPaymentmadeBalance(address,  function (bal) {

    res.json (bal);

    });
}

exports.getFeesBalance = function(req, res, next){

   var address = contract.feesaddress;

    BitcoinPaymentmade.getPaymentmadeBalance(address,  function (bal) {

    res.json (bal);
   });
}


exports.downloadPaymentmade = function(req, res, next){

    Paymentmade.find({
        _id : req.params.paymentmade_id
    }, function(err, paymentmade) {
        if (err){
                res.send(err);
        }
        res.json(paymentmade);
    });
}
