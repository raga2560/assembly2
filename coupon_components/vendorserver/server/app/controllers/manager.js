var Manager = require('../models/manager');
var Contractor = require('./contractor');
var contract = require('../../config/contract.json')

exports.getPairs = function(req, res, next){

    Manager.find(function(err, pairs) {

        if (err){
        	res.send(err);
        }

        res.json(pairs);

    });

}

function vendordata(vend)
{
    return {
	vendorid: contract.vendorid,
	planname: vend.planname,
	planid: vend.planid,
	vendorincomeaddress: vend.vendorincomeaddress,
	vendorspendingaddress: vend.vendorspendingaddress,
        checksum: contract.PIN
        
    };
}

exports.availablePlans = function(req, res, next){

  var vendorid = req.params.vendor_id;

 // These to be migrated to contractorside
 var availableplans= [
	{name: "plan4p200f", desc: "4% commission 200 unit fees "},
	{name: "plan6p100f", desc: "6% commission 100 unit fees "},
	{name: "plan10p50f", desc: "10% commission 50 unit fees "}

  ];
 
       	res.send(availableplans);
}

exports.availableSchemes = function(req, res, next){

  var vendorid = req.params.vendor_id;

 // These to be migrated to contractorside
 var availableschemes= [
	{name: "bitcoin_30", desc: "30% plan with bitcoin "},
	{name: "bitcoin_50", desc: "50% plan with bitcoin "}

  ];
 
       	res.send(availableschemes);
}
exports.createPair = function(req, res, next){
   
   
    var vendor_data = vendordata(req.body);
    
    Contractor.getPair(vendor_data, function(err, pairdatasent) {
 
    console.log("pairdata="+pairdata);
    var pairdata = JSON.parse(pairdatasent);

    console.log("err="+err);
        if (err){
        	res.send(err);
// 		next;
        }
       else {
      
    var manager = new Manager ( 
        {
        pairid : pairdata.pairid,
        serverdata : pairdata.serverdata,
        clientdata: pairdata.clientdata,
        vendorid: pairdata.vendorid,
        pinhash: pairdata.pinhash,
        contractorid: pairdata.contractorid,
        validatorhash: pairdata.validatorhash,
        done : false
    });

     manager.save(function(err, pair) {

        if (err){
                console.log("Manager create error: "+ err);
        	res.send(err);
        }
        else { 
        Manager.find( {_id:pair._id}, function(err, pair) {

            if (err){
                console.log("Manager find error: "+ err);
            	res.send(err);
            }
            else {
                
            res.json(pair);
            }

        });
        }

    });
    }
    });

}

exports.deletePair = function(req, res, next){

    Manager.remove({
        _id : req.params.pair_id
    }, function(err, pair) {
        res.json(pair);
    });

}

exports.getPair = function(req, res, next){

    Manager.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

exports.serverInitialise = function(req, res, next){

    Manager.update({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}


exports.clientInitialise = function(req, res, next){

    Manager.update({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

exports.downloadPair = function(req, res, next){

    Manager.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

exports.downloadServerPair = function(req, res, next){

    Manager.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

exports.downloadClientPair = function(req, res, next){

    Manager.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

