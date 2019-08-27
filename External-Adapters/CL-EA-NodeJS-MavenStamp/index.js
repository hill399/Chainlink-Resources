const request = require('request');
require('dotenv').config()
//Debug enable
//require('request').debug = true

const createRequest = (input, callback) => {
    // Base URL stored in the .env file
    let url = process.env.URL || "";

    let endpoint = input.data.endpoint || "";
    let endpoint_method;
    let maven_body;

    /* Create POST structure for MavenNet create function */
    if (endpoint === "create"){
    	maven_body = {
        	comment: input.data.comment,
        	notifications: [{currency: input.data.currency,
        					notification_type: input.data.notification_type,
        					target: input.data.notify_target}],
        	hash: input.data.hash
        }
        url = url + endpoint;
        endpoint_method = 'POST';

    /* Create POST structure for MavenNet proof function */
    } else if (endpoint === "proof"){
    	maven_body = {
        	currency: input.data.currency,
        	proof_type: input.data.proof_type,
        	hash_string: input.data.hash_string
        }
        url = url + endpoint;
        endpoint_method = 'POST';

    /* If only hash supplied, can still be checked */
    } else {
    	endpoint = input.data.check_hash;
    	url = url + endpoint;
    	endpoint_method = 'GET';
    }

    /* Construct request options dependant on endpoint selection */
    const options = {
    	method: endpoint_method,
        url: url,
        // Change the API_KEY key name to the name specified by the API
        headers: {
        	'Content-Type': 'application/json',
            'AccessKey': process.env.API_KEY
        },	
        body: maven_body,
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

exports.gcpmaven = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

exports.mavenhandle = (event, context, callback) => {
    createRequest(event, (statusCode, data) => {
        callback(null, data);
    });
}

module.exports.createRequest = createRequest;