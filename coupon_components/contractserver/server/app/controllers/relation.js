var Relation = require('../models/relation');
var vendor_template = require('../vendor_template.json');
var contractor = require('../../config/contractor.json');
/*

  Relation between vendor and his clients
  Each relation is a plan, (called plan)

*/

exports.getRelations = function(req, res, next){

    Relation.find(function(err, relations) {

        if (err){
        	res.send(err);
        }

        res.json(relations);

    });

}

function validatevendor(vendor)
{

   // signature to be checked of data sent from vendor (5PENDING)
   var validation = {
       enabled: true,
       secret: 'valid',
       history: 'fine'
   };
    
   return validation;

}

function plancreate(vendorpopulated, vendorplan)
{
   // based on 50% fees scheme, calculate share of contract  (6PENDING)
   // recalculate vendor fees as part of scheme

   var plan = {
       vendorfixedfees: '67',
       contractorfixedfees: '0',
       vendorpercentagefees: '78',
       contractorpercentagefees: '77',
       contractoraddress: '2728282',
       contractorwif: 'shshsh'
   };


    
   return plan;

}



function validateplan(vendor, storedvendor)
{
  // check if this vendor is allowe for this plan

  // 1monthplan
  // 5monthplan
  // 1kplan
  // 10kplan

  // check in database, if vendorplan matches, the creation request
  // to be done nater
  // no need to check also, because it is taken from secret file of vendor

   var validation = {
       allow: true
   };

   // 5PENDING
   // Check if signature of vendor matches the vendorcompublickey in vendor record
    
   return validation;
}

exports.createRelation = function(req, res, next){

  var validation =   validatevendor(req.body);
  if(validation.allow == false)
  {
     var err = {
        error: "vendor not allowed"
     }; 
     return res.status(1000).send(err);
  }

  var planvalidation =  validateplan(vendor, req.populatatedvendor)
  if(planvalidation.allow == false)
  {
     var err = {
        error: "vendor plan not matching "
     }; 
     return res.status(1001).send(err);
  }
  

  var plancreated =  plancreate(req.populatatedvendor)
  if(plancreate.allow == false)
  {
     var err = {
        error: "vendor plan create failed "
     }; 
     return res.status(1001).send(err);
  }
   
  // plan validation can be done later

  var length = 10;
  var plandata = {
        vendorid: req.body.vendor_data.vendorid,
        vendorfixedfees: plancreated.vendorfixedfees,
        vendorpercentagefees: plancreated.vendorpercentagefees,
        vendoraddress: req.body.vendor_data.vendoraddress,
        planid:  'rel_'+Math.random().toString(36).substr(2, length),
        vendorsignature: req.body.vendorsignature,
        contractorid: contractor.contractorid,
        contractorwif:  plancreated.contractorwif,
        contractorfixedfees:  plancreated.contractorfixedfees,
        contractorpercentagefees: plancreated.contractorpercentagefees,
        done: false
    };

//        res.json(c1);

    Relation.create( plandata
    , function(err, plan) {

        if (err){
        	res.send(err);
        }
       
        Relation.find( {_id: plan._id}, { "contractorwif":0, "vendorsignature":0}, function(err, relation) {

            if (err){
            	res.send(err);
            }
                
            var plandata = {
                plan: relation,
                contractorsignature: ''
            };
            res.json(relation);

        });

    });

}

exports.deleteRelation = function(req, res, next){

    Relation.remove({
        _id : req.params.plan_id
    }, function(err, plan) {
        res.json(plan);
    });

}

exports.getRelation = function(req, res, next){

    Relation.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.relationPauseActivate = function(req, res, next){

    Relation.update({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}


exports.relationInitialise = function(req, res, next){

    Relation.update({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

exports.downloadRelation = function(req, res, next){

    Relation.find({
        _id : req.params.plan_id
    }, function(err, plan) {
        if (err){
                res.send(err);
        }
        res.json(plan);
    });
}

