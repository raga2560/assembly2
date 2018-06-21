var Vendor = require('../models/vendor');
var Vendorfile = require('./vendorfile');
var contractorconfig = require('../../config/contractor.json');
bitcoin = require('bitcoinjs-lib');

exports.getVendors = function(req, res, next){

    Vendor.find(function(err, vendors) {

        if (err){
        	res.send(err);
        }

        res.json(vendors);

    });

}

function getvendorsecret(vendorid, vendor)
{
   var vendorsecret = {
    contractorurl:"http://localhost:8090",
    vendorpublickey: "2ab262627",
    vendorprivatekey: "2ab262627",
    vendorsecret: "22727277ab262627",
    vendorid: vendorid,
    vendorplan: vendor.vendorplan,
    checksum: "727272"

    };

   return  vendorsecret;
}

function getcontract(vendor)
{

  // 10PENDING (get proper contract in place
//   if(vendor.contracttype == 'trial') {
   var contract = {
    feesmin: 20,
    feesunit: 'USD',
    percentagemin: 2,
    contractterms: "http://terms.com",
    contractaggrement: "hash of aggrement",
    contracttype: vendor.contracttype
   }
     return contract;
//   }
}


function getvendorfilename(vendorid)
{

var vendorfiledir = contractorconfig.vendorfiledir;


 return vendorfiledir + "/"+ vendorid+".json";
}

function getvendordata(datain)
{
   var vendor = {
	name: datain.name,
	address: datain.address,
	phone: datain.phone,
	email: datain.email,
	contracttype: datain.contracttype
   };
   return vendor;
}

exports.createVendor = function(req, res){

    // Check vendor details, allocate a vendorid
    var length = 5;

    // assumining vendor data is validated before coming here
    // everytime we get new one, can only be modified in anothe routine
   
    // refer http://mongoosejs.com/docs/schematypes.html for mixed types
   var vendor = req.body;
   var  vendorid  =  'ven_'+Math.random().toString(36).substr(2, length);
   var vendorsecret = getvendorsecret(vendorid, req.body);
   var contract = getcontract(req.body);
   var vendorfilename = getvendorfilename(vendorid);
   var vendordata = getvendordata(vendor);
   var vendorcomwif = bitcoin.ECPair.makeRandom().toWIF();

    Vendor.create({
        vendorid : vendorid,
        vendordata: vendordata,
        vendorcomwif: vendorcomwif,
        contractorcompubkey: contractorconfig.contractorcompubkey,
        contract :  contract,
        vendorfilename :  vendorfilename,
        done : false
    }, function(err, vendor) {

        if (err){
               
        	res.send(err);
        } else{
       
        Vendor.find({_id:vendor._id}, function(err, vendor) {

            if (err){
            	res.send(err);
            }
            else {
            Vendorfile.createFile(vendorfilename, vendor);
                
            res.json(vendor);
            }

           });
      }
    });

}

exports.deleteVendor = function(req, res, next){

    Vendor.remove({
        _id : req.params.vendor_id
    }, function(err, vendor) {
        res.json(vendor);
    });

}

exports.populateVendor = function(req, res, next){
   
    console.log("message received="+ JSON.stringify(req.body)); 

    Vendor.find({
        vendorid : req.body.vendor_data.vendorid
    }, function(err, vendor) {
        if (err){
           var err1 = {

		error: "Cannot find vendor"
           };
           res.send(err1);
        }
        else {
        req.populatatedvendor = vendor;
        next();
        }
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

