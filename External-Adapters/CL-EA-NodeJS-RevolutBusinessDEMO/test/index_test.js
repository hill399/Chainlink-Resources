const assert = require('chai').assert;
const createRequest = require('../index.js').createRequest;

describe('createRequest', () => {

  context('Requests data', () => {
    // The value here doesn't matter, we just want to be sure that the adapter returns the same
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    // Update the parameters in the data to match actual requests for the target API

    const revolutAccounts = {
      id: jobID,
      data: {
        endpoint: "accounts",
        accountid: "ACCOUNT_ID_HERE",
        bankdetails: true
      }
    };

    const revolutCounterparty = {
      id: jobID,
      data: {
        endpoint: "counterparty",
        /* Change profile type for business/personal - if null
           then account is non-revolut, use full details at bottom*/
//        profiletype: "business",
        name: "John Smith",

        /* Input shared across Revolut/Non-Revolut */
        phone: "+4412345678909",
        email: "test@sandboxcorp.com",

        /* Non-revolut customer details */
        company_name: "John Smith Co.",
        bank_country: "GB",
        currency: "GBP",
        account_no: "12345678",
        sort_code: "223344",
        email: "john@smith.co",
        phone: "+447771234455",
        street_line1: "1 Canada Square",
        street_line2: "Canary Wharf",
        region: "East End",
        postcode: "E115AB",
        city: "London",
        country: "GB",

        id: "b3d608b0-4290-44fa-a179-5673ddb0e5fc"
      }
    };

    const revolutCounterparties = {
      id: jobID,
      data: {
        endpoint: "counterparties"
      }
    };

    const revolutTransfer = {
      id: jobID,
      data: {
      	/* Ensure request_id is different for each test */
        endpoint: "transfer",
        request_id: "linktransfertest001",
        source_account_id: "ACCOUNT_ID_HERE",
        target_account_id: "ACCOUNT_ID_HERE",
        amount: 123.45,
        currency: "GBP",
        description: "TAX"
      }
    };

/*
    const revolutPay = {
      id: jobID,
      data: {
        endpoint: "pay",
        request_id: "linkpaytest002",
        source_account_id: "ACCOUNT_ID_HERE",
        target_counterparty_id: "COUNTERPARTY_ID_HERE",
        target_account_id: "ACCOUNT_ID_HERE",
        amount: 21.31,
        currency: "EUR",
        reference: "Invoice payment #123"
      }
    };
*/

    const revolutPaymentDraft = {
      id: jobID,
      data: {
      	/* Make sure title and reference are different for each test */
        endpoint: "payment-drafts",
        title : "Link Payment 123",
        schedule_for : "2019-06-06",
        currency: "GBP",
        amount: 123,
        source_account_id: "ACCOUNT_ID_HERE",
        counterparty_id: "COUNTERPARTY_ID_HERE",
        target_account_id: "ACCOUNT_ID_HERE",
        reference: "LINKPAYMENT123"
      }
    };

    const revolutTransactions = {
      id: jobID,
      data: {
        endpoint: "transactions",
        counterparty: "COUNTERPARTY_ID_HERE",
        from: "2019-04-10",
        to: "2019-04-17",
        count: "10",
//        type: "ATM"
      }
    };

    const revolutTransaction = {
      id: jobID,
      data: {
        endpoint: "transaction",
        id: "TRANSCATION ID HERE"
      }
    };

    const revolutRate = {
      id: jobID,
      data: {
        endpoint: "rate",
        from: "GBP",
        to: "EUR",
        amount: "100"
      }
    };


    it('Valid accounts data', (done) => {
      createRequest(revolutAccounts, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        console.log(data.data);
        done();
      });
    });


    it('Valid counterparty data', (done) => {
      createRequest(revolutCounterparty, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        console.log(data.data);
        done();
      });
    });


    it('Valid counterparties data', (done) => {
      createRequest(revolutCounterparties, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        console.log(data.data);
        done();
      });
    });


    it('Valid transfer data', (done) => {
      createRequest(revolutTransfer, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        console.log(data.data);
        done();
      });
    });

/*  it('Valid pay data', (done) => {
    createRequest(revolutPay, (statusCode, data) => {
      assert.equal(statusCode, 200);
      assert.equal(data.jobRunID, jobID);
      assert.isNotEmpty(data.data);
      console.log(data.data);
      done();
    });
  });
*/

it('Valid payment draft data', (done) => {
  createRequest(revolutPaymentDraft, (statusCode, data) => {
    assert.equal(statusCode, 200);
    assert.equal(data.jobRunID, jobID);
    assert.isNotEmpty(data.data);
    console.log(data.data);
    done();
  });
});



it('Valid transcations data', (done) => {
  createRequest(revolutTransactions, (statusCode, data) => {
    assert.equal(statusCode, 200);
    assert.equal(data.jobRunID, jobID);
    assert.isNotEmpty(data.data);
    console.log(data.data);
    done();
  });
});



it('Valid transcation data', (done) => {
  createRequest(revolutTransaction, (statusCode, data) => {
    assert.equal(statusCode, 200);
    assert.equal(data.jobRunID, jobID);
    assert.isNotEmpty(data.data);
    console.log(data.data);
    done();
  });
});

it('Valid exchange rate data', (done) => {
  createRequest(revolutRate, (statusCode, data) => {
    assert.equal(statusCode, 200);
    assert.equal(data.jobRunID, jobID);
    assert.isNotEmpty(data.data);
    console.log(data.data);
    done();
  });
});

  });
});
