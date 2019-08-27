const assert = require('chai').assert;
const createRequest = require('../index.js').createRequest;

describe('createRequest', () => {
  
  context('Requests data', () => {
    // The value here doesn't matter, we just want to be sure that the adapter returns the same
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    // Update the parameters in the data to match actual requests for the target API
/*    
    const reqCreate = {
      id: jobID,
      data: {
        endpoint: "create",
        comment: "ADD A COMMENT",
        hash: "ADD A SHA-256 HASH HERE",
        currency: 0,
        notification_type: 0,
        notify_target: "TEST EMAIL HERE"
      }
    };

    const reqProof = {
      id: jobID,
      data: {
        endpoint: "proof",
        currency: 0,
        proof_type: 0,
        hash_string: "7e8ab922fd332ee183af0d7ad79d9e6ea4a5a6ebef012e618518e330d9ee3180"
      }
    };
*/
    const reqCheck = {
      id: jobID,
      data: {
        check_hash: "7e8ab922fd332ee183af0d7ad79d9e6ea4a5a6ebef012e618518e330d9ee3180"
      }
    };

    it('Valid hash check', (done) => {
      createRequest(reqCheck, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        console.log(data.data);
        done();
      });
    });

/*
    it('Valid proof data', (done) => {
      createRequest(reqProof, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        console.log(data.data);
        done();
      });
    });

    it('Valid proof data', (done) => {
      createRequest(reqCreate, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        console.log(data.data);
        done();
      });
    });
*/
  });
});
