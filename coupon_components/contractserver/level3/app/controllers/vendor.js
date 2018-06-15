var Vendor = require('../models/vendor');
var contractorconfig = require('../config/contractor.json');

exports.getVendors = function(req, res, next){

    Vendor.find(function(err, vendors) {

        if (err){
        	res.send(err);
        }

        res.json(vendors);

    });

}

exports.createVendor = function(req, res, next){

    // Check vendor details, allocate a vendorid
    var length = 5;

    // assumining vendor data is validated before coming here
    // everytime we get new one, can only be modified in anothe routine
   
    // refer http://mongoosejs.com/docs/schematypes.html for mixed types

    Vendor.create({
        vendorid : 'ven_'+Math.random().toString(36).substr(2, length),
        vendordata: { any: req.body.vendor},
        contractincomeaddress :  contractorconfig.contractincomeaddress ,
        contractspendingaddress :  contractorconfig.contractincomeaddress ,
        contractorid: contractorconfig.contractorid
        done : false
    }, function(err, vendor) {

        if (err){
        	res.send(err);
        }
       
        Vendor.find(function(err, vendors) {

            if (err){
            	res.send(err);
            }
                
            res.json(vendors);

        });

    });

}

exports.deleteVendor = function(req, res, next){

    Vendor.remove({
        _id : req.params.vendor_id
    }, function(err, vendor) {
        res.json(vendor);
    });

}

exports.getVendor = function(req, res, next){

    Vendor.find({
        _id : req.params.vendor_id
    }, function(err, vendor) {
        if (err){
                res.send(err);
        }
        res.json(vendor);
    });
}

exports.vendorPauseActivate = function(req, res, next){

    Vendor.update({
        _id : req.params.vendor_id
    }, function(err, vendor) {
        if (err){
                res.send(err);
        }
        res.json(vendor);
    });
}


exports.vendorInitialise = function(req, res, next){

    Vendor.update({
        _id : req.params.vendor_id
    }, function(err, vendor) {
        if (err){
                res.send(err);
        }
        res.json(vendor);
    });
}

exports.downloadVendor = function(req, res, next){

    Vendor.find({
        _id : req.params.vendor_id
    }, function(err, vendor) {
        if (err){
                res.send(err);
        }
        res.json(vendor);
    });
}

