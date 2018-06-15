var Relation = require('../models/relation');
/*

  Relation between vendor and his clients
  Each relation is a plan, (called pair)

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
   var validation = {
       enabled: true,
       secret: 'valid',
       history: 'fine'
   };
    
   return validation;

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

  // plan validation can be done later

  var length = 10;
  var pairdata = {
       vendorid: req.body.vendor_id,
        serverdata: 'has addresses of conractor and vendor ',
        pairid:  'rel_'+Math.random().toString(36).substr(2, length),
        clientdata: 'has addresses of conractor and vendor ',
        pinhash: 'contract.pinhash',
        contractorid: 'contract.contractorid',
        validatorhash: 'contract.validatorhash',
        done: false
    };

//        res.json(c1);

    Relation.create( pairdata
    , function(err, pair) {

        if (err){
        	res.send(err);
        }
       
        Relation.find( {_id: pair._id}, function(err, relation) {

            if (err){
            	res.send(err);
            }
                
            res.json(relation);

        });

    });

}

exports.deleteRelation = function(req, res, next){

    Relation.remove({
        _id : req.params.pair_id
    }, function(err, pair) {
        res.json(pair);
    });

}

exports.getRelation = function(req, res, next){

    Relation.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

exports.relationPauseActivate = function(req, res, next){

    Relation.update({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}


exports.relationInitialise = function(req, res, next){

    Relation.update({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

exports.downloadRelation = function(req, res, next){

    Relation.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}

