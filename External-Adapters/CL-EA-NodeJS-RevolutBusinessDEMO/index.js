/* Javascript file to bridge Revolut Business API via Chainlink
   Tested against Revolut b2b sandbox API, see API documentation for
   more details. For demonstration purposes only.                  */

const request = require('request');
require('dotenv').config()
//Debug enable
require('request').debug = true

/* Construct data for API retrieval. See Revolut Business API
   for more details */

const createRequest = (input, callback) => {
    // Base URL stored in the .env file
    let url = process.env.URL || "";

    let endpoint = input.data.endpoint || "";
    let endpoint_method;
    let revolut_body;
    let queryObj;

    /* Switch statement to handle division of endpoints */
    switch(endpoint){

      /* Get personal account details */
      case("accounts"):
        if (!isEmpty(input.data.accountid)){
          if(input.data.bankdetails === true){
            endpoint += "/" + input.data.accountid + "/bank-details";
          } else {
            endpoint += "/" + input.data.accountid;
          }
        }
        url = url + endpoint;
        endpoint_method = 'GET';
        break;

      /* Create new counterparty for account. Can be
        personal or business / Revolut or non-revolut */
      case("counterparty"):
        if (!isEmpty(input.data.id)){
            url = url + endpoint + "/" + input.data.id;
            endpoint_method = 'GET';
            break;
        } else if (input.data.profiletype === "personal"){
          revolut_body = {
            profile_type: input.data.profiletype,
            name: input.data.name,
            phone: input.data.phone
          }
        } else if (input.data.profiletype === "business"){
          revolut_body = {
            profile_type: input.data.profiletype,
            email: input.data.email,
          }
        } else {
          revolut_body = {
            company_name: input.data.company_name,
            bank_country: input.data.bank_country,
            currency: input.data.currency,
            account_no: input.data.account_no,
            sort_code: input.data.sort_code,
            email: input.data.email,
            phone: input.data.phone,
            address: {
              street_line1: input.data.street_line1,
              street_line2: input.data.street_line2,
              region: input.data.region,
              postcode: input.data.postcode,
              city: input.data.city,
              country: input.data.country
            }
          }
        }

        url = url + endpoint;
        endpoint_method = 'POST';
        break;

      /* Get list of counterparties set up on account */
      case("counterparties"):
        url = url + endpoint;
        endpoint_method = 'GET';
        break;

      /* Transfer funds between owners personal accounts */
      /* API Functioning */
      case("transfer"):
        revolut_body = {
          request_id: input.data.request_id,
          source_account_id: input.data.source_account_id,
          target_account_id: input.data.target_account_id,
          amount: input.data.amount,
          currency: input.data.currency,
          description: input.data.description
        }

        url = url + endpoint;
        endpoint_method = 'POST';
        break;

      /* Send payment to account. Not functioning within API
        must use payment drafts */
/*
      case("pay"):
        revolut_body = {
          request_id: input.data.request_id,
          account_id: input.data.source_account_id,
          receiver: {
            counterparty_id: input.data.target_counterparty_id,
            account_id: input.data.target_account_id
          },
          amount: input.data.amount,
          currency: input.data.currency,
          reference: input.data.reference
        }

        url = url + endpoint;
        endpoint_method = 'POST';
        break;
*/

      /* Setup payment draft (i.e. scheduled payment with
         manual approval). Functions in draft mode, cannot see in
         browser account panel, but visible within API calls */
      case("payment-drafts"):
        revolut_body = {
          title : input.data.title,
          schedule_for : input.data.schedule_for,
          payments: [{
              currency: input.data.currency,
              amount: input.data.amount,
              account_id: input.data.source_account_id,
              receiver: {
                counterparty_id: input.data.counterparty_id,
                account_id: input.data.target_account_id
              },
              reference: input.data.reference
            }]
        }

        url = url + endpoint;
        endpoint_method = 'GET';
        break;

      /* Broad transcation search with query options */
      case("transactions"):
          url = url + endpoint;
          endpoint_method = 'GET';
          queryObj = {
            counterparty: input.data.counterparty_id,
            from: input.data.from,
            to: input.data.to,
            count: input.data.count,
            type: input.data.type
          }
          break;

      /* Get specific data on transcation - search with request ID */
      case("transaction"):
          url = url + endpoint + "/" + input.data.id + "?id_type=request_id";
          endpoint_method = 'GET';
          break;

      /* Get exchange rates */
      case("rate"):
          url = url + endpoint;
          endpoint_method = 'GET';
          queryObj = {
            from: input.data.from,
            to: input.data.to,
            counterparty: input.data.amount
          }
          break;

    }

    /* Construct request options dependant on endpoint selection */
    const options = {
    	method: endpoint_method,
        url: url,
        qs: queryObj,
        timeout: 10000,
        // Change the API_KEY key name to the name specified by the API
        headers: {
            'Authorization': 'Bearer ' + process.env.API_KEY
        },
        body: revolut_body,
		json: true
    }


    request(options, (error, response, body) => {
        // Add any API-specific failure case here to pass that error back to Chainlink
        if (error){
            callback(response.statusCode, {
                jobRunID: input.id,
                status: "errored",
                error: body,
                statusCode: response.statusCode
            });
        } else {
            callback(response.statusCode, {
                jobRunID: input.id,
                data: body,
                statusCode: response.statusCode
            });
        }
    });
};

exports.gcprevolut = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

exports.revoluthandle = (event, context, callback) => {
    createRequest(event, (statusCode, data) => {
        callback(null, data);
    });
}

module.exports.createRequest = createRequest;


/* Function to check if optional fields are empty */
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
