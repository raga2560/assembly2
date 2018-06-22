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

exports.getSchemes = function(req, res, next){

 console.log("test"+JSON.stringify(req.body));
 var availableschemes=  [
        {name: "bitcoin_30", desc: "30% plan with bitcoin ", vendor: "70", contractor:"30"},
        {name: "bitcoin_50", desc: "50% plan with bitcoin ", vendor:"50", contractor: "50"}

  ];


   res.json(availableschemes);


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
       contractoraddress: contractor.contractoraddress
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

  if(req.populatatedvendor == null)
  {
     var err = {
        error: "vendor does note exist "
     }; 
     return res.status(500).send(err);

  }

  var validation =   validatevendor(req.body);
  if(validation.allow == false)
  {
     var err = {
        error: "vendor not allowed"
     }; 
     return res.status(500).send(err);
  }

  var planvalidation =  validateplan(req.body, req.populatatedvendor)
  if(planvalidation.allow == false)
  {
     var err = {
        error: "vendor plan not matching "
     }; 
     return res.status(500).send(err);
  }
  
  console.log("level-20");

  var plancreated =  plancreate(req.populatatedvendor)
  if(plancreate.allow == false)
  {
     var err = {
        error: "vendor plan create failed "
     }; 
     return res.status(500).send(err);
  }
   
  // plan validation can be done later
  console.log("level-21");
  var length = 10;
  var plandata = {
        vendorid: req.body.vendor_data.vendorid,
        planname: req.body.vendor_data.planname,
        vendorfixedfees: plancreated.vendorfixedfees,
        vendorpercentagefees: plancreated.vendorpercentagefees,
        vendoraddress: req.body.vendor_data.vendoraddress,
        planid:  'rel_'+Math.random().toString(36).substr(2, length),
        vendorsignature: 'req.body.vendorsignature',
        contractorid: contractor.contractorid,
        contractoraddress:  plancreated.contractoraddress,
        contractorfixedfees:  plancreated.contractorfixedfees,
        contractorpercentagefees: plancreated.contractorpercentagefees,
        done: false
    };

//        res.json(c1);
  console.log("level-22");

    Relation.create( plandata , function(err, plan) {
        console.log("err: "+ err);
        console.log("plan: "+ plan);

        if (err){
           var error = {
		error: "Plan create failed:" + err
            };

      	    res.send(error);
        }
        else {
       
        Relation.find( {planid: plan.planid}, { "contractorwif":0, "vendorsignature":0}, function(err, relation) {

            if (err){
              console.log(err);
               var error = {
		error: "No plan found in record"
                };

            	res.send(error);
            }
            else {    
            var plandata = {
                plan: relation[0],
                contractorsignature: ''
            };
            res.json(plandata);

            }

        });
      }
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

