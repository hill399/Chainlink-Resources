const request = require('request');
require('dotenv').config()
//require('request').debug = true

const createRequest = (input, callback) => {
    let url = 'https://api.telegram.org/';
    let api = process.env.API;
    const endpoint = input.data.endpoint || "";
    url = url + 'bot' + api + '/' + endpoint;

    let queryObj = {
		// Required for all calls
        chat_id: input.data.chat_id,	
		// To send a message
        text: input.data.text_input,
		// To send an image
        photo: input.data.photo,
		// To send a video
        video: input.data.video,
		// To send an audio file
        audio: input.data.audio,
		// To send a document
        document: input.data.document,
		// To Send Location (1 of 2)
        longitude: input.data.longitude,
		// To send Location (2 of 2)
        latitude: input.data.latitude
    }

    for (let key in queryObj) {
        if (typeof queryObj[key] === "undefined") {
            delete queryObj[key];
        }
    }
    
    const options = {
        url: url,
        qs: queryObj,
        json: true
    }
    request(options, (error, response, body) => {
        // Add any API-specific failure case here to pass that error back to Chainlink
        if (error || response.statusCode >= 400) {
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

exports.gcpservice = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

exports.handler = (event, context, callback) => {
    createRequest(event, (statusCode, data) => {
        callback(null, data);
    });
}

module.exports.createRequest = createRequest;