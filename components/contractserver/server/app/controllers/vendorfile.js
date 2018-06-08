var contractorconfig = require('../../config/contractor.json');


var vendorfiledir = contractorconfig.vendorfiledir;

function writedata(file, output)
{
var content = JSON.stringify(output);

fs.writeFile(file, content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
}



exports.createFile = function(vendorfilename, vendor){


   // vendor publickey. private-key used for only communication. Not not for money transfer 
   // contractor address is given when creating plans. So not seen here

   writedata( vendorfilename, vendor.vendorsecret);

}


