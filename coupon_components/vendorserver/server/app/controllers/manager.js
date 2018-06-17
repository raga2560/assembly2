var Manager = require('../models/manager');
var Contractor = require('./contractor');
var contract = require('../../config/contract.json')

exports.getPlans = function(req, res, next){

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
	{name: "plan4p200f", desc: "4% commission 200 unit fees ", 
        vendoraddress: "vendoraddress", contractoraddress: "contractoraddress",
        percent: "4", fixed:"200"},
	{name: "plan6p100f", desc: "6% commission 100 unit fees ", 
        vendoraddress: "vendoraddress", contractoraddress: "contractoraddress",
        percent: "6", fixed:"100"},
	{name: "plan10p50f", desc: "10% commission 50 unit fees ", 
        vendoraddress: "vendoraddress", contractoraddress: "contractoraddress",
        percent: "10", fixed:"50"}

  ];
 
       	res.send(availableplans);
}

exports.availableSchemes = function(req, res, next){

  var vendorid = req.params.vendor_id;

 // These to be migrated to contractorside
 var availableschemes= [
	{name: "bitcoin_30", desc: "30% plan with bitcoin ", vendor: "70", contractor:"30"},
	{name: "bitcoin_50", desc: "50% plan with bitcoin ", vendor:"50", contractor: "50"}

  ];
 
       	res.send(availableschemes);
}
exports.createPlan = function(req, res, next){
   
   
    var vendor_data = vendordata(req.body);
    
    Contractor.getPlan(vendor_data, function(err, pairdatasent) {
 
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

exports.deletePlan = function(req, res, next){

    Manager.remove({
        _id : req.params.pair_id
    }, function(err, pair) {
        res.json(pair);
    });

}

exports.getPlan = function(req, res, next){

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

exports.downloadPlan = function(req, res, next){

    Manager.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

exports.downloadServerPlan = function(req, res, next){

    Manager.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

exports.downloadClientPlan = function(req, res, next){

    Manager.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

