var request = require('request')
var contract = require('../../config/contract.json')

// get address info
var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
//var url = 'https://live.blockcypher.com/btc-testnet/address/';
var url = contract.contractorurl;

function getApi(api_endpoint, param, callback) {
    console.log('Get from:'+api_endpoint+'/'+param)
    console.log(url);    
    var vendordata = {
        vendorid: contract.vendorid
    };
    request.post(url + '/api/relation/createRelation', JSON.stringify(vendordata), function (error, response, body) {
        if (error) {
            return callback(error)
        }
        if (typeof body === 'string') {
            //body = JSON.parse(body)
        }
        console.log('Status:', response.statusCode)
        console.log('Body:', body)
        return callback(null, body)
    })
}

exports.getPair = function (vendordata, callback) {

        getApi("addr", "agag", function(err, body) {

        if (err) {

		console.log('error: ', err)
                callback(err, null);
         }
         else {


               callback(null, body)
         }
        });
}
