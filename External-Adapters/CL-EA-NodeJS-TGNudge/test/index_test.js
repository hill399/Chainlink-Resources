const assert = require('chai').assert;
const createRequest = require('../index.js').createRequest;

describe('createRequest', () => {

  let bot_chat_id = "YOUR BOT CHAT ID";

  context('Requests data', () => {
    // The value here doesn't matter, we just want to be sure that the adapter returns the same
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    // Update the parameters in the data to match actual requests for the target API

    const reqsendMessage = {
      id: jobID,
      data: {
        endpoint: "sendMessage",
        chat_id: bot_chat_id,
        text_input: "Oracle Message Response"
      }
    };

    const reqsendPhoto = {
      id: jobID,
      data: {
        endpoint: "sendPhoto",
        chat_id: bot_chat_id,
        photo: "https://sample-videos.com/img/Sample-jpg-image-100kb.jpg"
      }
    };

    const reqsendVideo = {
      id: jobID,
      data: {
        endpoint: "sendVideo",
        chat_id: bot_chat_id,
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
      }
    };

    const reqsendAudio = {
      id: jobID,
      data: {
        endpoint: "sendAudio",
        chat_id: bot_chat_id,
        audio: "https://sample-videos.com/audio/mp3/wave.mp3"
      }
    };

    const reqsendDocument = {
      id: jobID,
      data: {
        endpoint: "sendDocument",
        chat_id: bot_chat_id,
        document: "https://sample-videos.com/pdf/Sample-pdf-5mb.pdf"
      }
    };

    const reqsendLocation = {
      id: jobID,
      data: {
        endpoint: "sendLocation",
        chat_id: bot_chat_id,
        longitude: -0.127571,
        latitude: 51.509580
      }
    };

    it('Valid sendMessage data', (done) => {
      createRequest(reqsendMessage, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });

    it('Valid sendPhoto data', (done) => {
      createRequest(reqsendPhoto, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });

    it('Valid sendVideo data', (done) => {
      createRequest(reqsendVideo, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });

    it('Valid sendAudio data', (done) => {
      createRequest(reqsendAudio, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });

    it('Valid sendDocument data', (done) => {
      createRequest(reqsendDocument, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });

    it('Valid sendLocation data', (done) => {
      createRequest(reqsendLocation, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });
  });
});
