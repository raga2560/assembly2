var Planmanager = require('../models/planmanager');
var Contractor = require('./contractor');
var contract = require('../../config/contract.json')
bitcoin = require('bitcoinjs-lib');

exports.availablePlans = function(req, res, next){

    Planmanager.find(function(err, plans) {

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
	planscheme: vend.planscheme,
	vendoraddress: vendoraddress,
	vendorfixedfees: vend.vendorfixedfees,
	vendorpercentagefees: vend.vendorpercentagefees
        
    };
   /*
      Above data will be used by contractor to approve plan
    */
}

exports.availablePlans1 = function(req, res, next){

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

 
    Contractor.getSchemes(vendorid, function(err, schemedatasent) {
 

    console.log("err="+err);
        if (err){
        	res.send(err);
        }
       	res.send(schemedatasent);
   })
}

exports.createPlan = function(req, res, next){
   
    // 7PENDING
  console.log(JSON.stringify(req.vend));

  var vendorwif = req.vend.vendorwif;
  var vendoraddress = req.vend.vendoraddress;

    var vendor_data = vendordata(req.body, vendoraddress );
   
    // (5PENDING) 

    var datatosend = {
        vendor_data: vendor_data,
	vendor_sign: ''
    };
    
    
    Contractor.getPlan(datatosend, function(err, plandatasent) {
 

    console.log("err="+err);
        if (err){
        	res.send(err);
// 		next;
        }
       else {
    console.log("plandatasent="+ JSON.stringify(plandatasent));
    //var datareceived = JSON.parse(plandatasent);
    var datareceived = plandatasent;
    // 5PENDING, verify received data 
    var plandata = datareceived.plan;
      
    var planmanager = new Planmanager ( 
        {
        planid : plandata.planid,
        planname : plandata.planname,
        serverdata : JSON.stringify(plandata) ,  // Check with coupon what is needed
        clientdata: JSON.stringify(plandata),   // 7PENDING
        vendorid: plandata.vendorid,
//        vendorwif: vendorwif,
        contractorid: plandata.contractorid,
        contractorsignature: datareceived.contractorsignature,
        done : false
    });

     planmanager.save(function(err, plan) {

        if (err){
                console.log("Planmanager create error: "+ err);
        	res.send(err);
        }
        else { 
        Planmanager.find( {planid:plan.planid}, function(err, plan) {

            if (err){
                console.log("Planmanager find error: "+ err);
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

    Planmanager.remove({
        _id : req.params.plan_id
    }, function(err, plan) {
        res.json(plan);
    });

}

exports.getPlan = function(req, res, next){

    Planmanager.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.serverInitialise = function(req, res, next){

    Planmanager.update({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}


exports.clientInitialise = function(req, res, next){

    Planmanager.update({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.downloadPlan = function(req, res, next){

    Planmanager.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.downloadServerPlan = function(req, res, next){

    Planmanager.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.downloadClientPlan = function(req, res, next){

    Planmanager.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

