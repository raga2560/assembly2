var Vendoraddr = require('../models/vendoraddr');
var Contractor = require('./contractor');
var contract = require('../../config/contract.json')
bitcoin = require('bitcoinjs-lib');
var randomBytes = require('randombytes')

exports.availableAddresses = function(req, res, next){

    Vendoraddr.find(function(err, addresss) {

        if (err){
        	res.send(err);
        }

        res.json(addresss);

    });

}

exports.createWif = function(req, res, next){
   
    // 7PENDING

    var vendorkeypair = bitcoin.ECPair.makeRandom({network: bitcoin.networks.testnet, rng: randomBytes});

   var vendorwif = vendorkeypair.toWIF();
   var vendoraddress = vendorkeypair.getAddress();
   var vendornetwork = 'testnet';
      
    var vendoraddrl = new Vendoraddr ( 
        {
        vendorwif : vendorwif,
        network : vendornetwork,
        vendoraddress : vendoraddress,
        cryptotype : 'bitcoin',
        done : false
    });

     vendoraddrl.save(function(err, vend) {

        if (err){
                console.log("Vendoraddr create error: "+ err);
        	return next(err);
        }
        else { 
        Vendoraddr.find( {_id:vend._id}, function(err, vend) {

            if (err){
                console.log("Vendoraddr find error: "+ err);
            	return next(err);
            }
            else {
            req.vend = vend[0];        
	    return next();
            }

        });
        }

    });

}

exports.deleteAddress = function(req, res, next){

    Vendoraddr.remove({
        _id : req.params.address_id
    }, function(err, address) {
        res.json(address);
    });

}

exports.getAddress = function(req, res, next){

    Vendoraddr.find({
        _id : req.params.address_id
    }, function(err, address) {
        if (err){
                res.send(err);
        }
        res.json(address);
    });
}


