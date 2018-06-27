var Contractaddr = require('../models/contractaddr');
bitcoin = require('bitcoinjs-lib');
var randomBytes = require('randombytes')

exports.availableAddresses = function(req, res, next){

    Contractaddr.find(function(err, addresss) {

        if (err){
        	res.send(err);
        }

        res.json(addresss);

    });

}

exports.createWif = function(req, res, next){
   
    // 7PENDING

    var contractkeypair = bitcoin.ECPair.makeRandom({network: bitcoin.networks.testnet, rng: randomBytes});

   var contractwif = contractkeypair.toWIF();
   var contractaddress = contractkeypair.getAddress();
   var contractnetwork = 'testnet';
      
    var contractaddrl = new Contractaddr ( 
        {
        contractwif : contractwif,
        network : contractnetwork,
        contractaddress : contractaddress,
        cryptotype : 'bitcoin',
        done : false
    });

     contractaddrl.save(function(err, cont) {

        if (err){
                console.log("Contractaddr create error: "+ err);
        	return next(err);
        }
        else { 
        Contractaddr.find( {_id:cont._id}, function(err, cont) {

            if (err){
                console.log("Contractaddr find error: "+ err);
            	return next(err);
            }
            else {
            req.contract = cont[0];        
	    return next();
            }

        });
        }

    });

}

exports.deleteAddress = function(req, res, next){

    Contractaddr.remove({
        _id : req.params.address_id
    }, function(err, address) {
        res.json(address);
    });

}

exports.getAddress = function(req, res, next){

    Contractaddr.find({
        _id : req.params.address_id
    }, function(err, address) {
        if (err){
                res.send(err);
        }
        res.json(address);
    });
}


