var request = require('request-promise')
var contract = require('../../config/contract.json')

// get address info
var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
//var url = 'https://live.blockcypher.com/btc-testnet/address/';
var url = contract.contractorurl;

function getApi(api_endpoint, vendordata, callback) {
    console.log(url);    


const options = {
  method: 'POST',
  uri: url + '/api/relation/createRelation',
  body: vendordata,
  json: true 
    // JSON stringifies the body automatically
}
request(options)
  .then(function (response) {
    // Handle the response
        console.log("response:"+response); 
        var abc = {
		a:1
        }; 
        return callback(null, response)
  })
  .catch(function (err) {
    // Deal with the error
        console.log("err:"+ JSON.stringify(err)); 
         var err1 = {
		error: "Some error "
         };
       return callback(err);
  })

/*

    request.post(url + '/api/relation/createRelation', config , function (error, response, body) {
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
  */
}

exports.getPlan = function (vendordata, callback) {

        getApi("getplan", vendordata, function(err, body) {

        if (err) {

		console.log('error: ', err)
                callback(err, null);
         }
         else {


               callback(null, body)
         }
        });
}

exports.getSchemes = function (vendorid, callback) {

    request.get(url + '/api/relation/getSchemes/'+ vendorid , function (error, response, body) {
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

