var Manager = require('../models/manager');
var Contractor = require('./contractor');
var contract = require('../../config/contract.json')

exports.getPlans = function(req, res, next){

    Manager.find(function(err, plans) {

        if (err){
        	res.send(err);
        }

        res.json(plans);

    });

}

function vendordata(vend, vendoraddress)
{
  // get address newwif
    return {
	vendorid: contract.vendorid,
	planname: vend.planname,
	vendoraddress: vendoraddress,
	vendorfixedfees: vend.vendorfixedfees,
	vendorpercentagefees: vend.vendorpercentagefees
        
    };
   /*
      Above data will be used by contractor to approve plan
    */
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
   
    var vendorwif = 'kkk';  // 7PENDING
    var vendor_data = vendordata(req.body, vendorwif.getAddress());
   
    // (5PENDING) 

    var datatosend = {
        vendor_date: vendor_data,
	vendor_sign: ''
    };
 
    
    Contractor.getPlan(datatosend, function(err, plandatasent) {
 
    console.log("plandata="+plandata);
    var datareceived = JSON.parse(plandatasent);

    // 5PENDING, verify received data 

    var plandata = datareceived.plan;

    console.log("err="+err);
        if (err){
        	res.send(err);
// 		next;
        }
       else {
      
    var manager = new Manager ( 
        {
        planid : plandata.planid,
        serverdata : 'plandata.serverdata',  // Check with coupon what is needed
        clientdata: 'plandata.clientdata',  // 7PENDING
        vendorid: plandata.vendorid,
        vendorwif: vendorwif,
        contractorid: plandata.contractorid,
        contractorsignature: datareceived.contractorsignature,
        done : false
    });

     manager.save(function(err, plan) {

        if (err){
                console.log("Manager create error: "+ err);
        	res.send(err);
        }
        else { 
        Manager.find( {_id:plan._id}, function(err, plan) {

            if (err){
                console.log("Manager find error: "+ err);
            	res.send(err);
            }
            else {
                
            res.json(plan);
            }

        });
        }

    });
    }
    });

}

exports.deletePlan = function(req, res, next){

    Manager.remove({
        _id : req.params.plan_id
    }, function(err, plan) {
        res.json(plan);
    });

}

exports.getPlan = function(req, res, next){

    Manager.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.serverInitialise = function(req, res, next){

    Manager.update({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}


exports.clientInitialise = function(req, res, next){

    Manager.update({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.downloadPlan = function(req, res, next){

    Manager.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.downloadServerPlan = function(req, res, next){

    Manager.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.downloadClientPlan = function(req, res, next){

    Manager.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

