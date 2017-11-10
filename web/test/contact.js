var config = require('./config.js');
var assert = require("assert");
var request = require("request");

describe("Contact API", function() {
    it("GET", function(done) {
        request(`${config.baseUrl}/contact`, function(err, response, body) {
            if (err) done(err);
            var payload = JSON.parse(body);
            assert.equal(payload.status, true);
            assert.equal(payload.msg, "It works");
            done();
        });
    });
    it("POST", function(done) {
        request.post({
                url: `${config.baseUrl}/contact`,
                form: {
                    name: 'test name',
                    phone: 'test',
                    email: 'test@gmail.com',
                    message: 'test message'
                }
            },
            function(err, httpResponse, body) {
                if (err) done(err);
                var payload = JSON.parse(body);
                assert.equal(payload.status, true);
                assert.equal(payload.msg, "Handle Contact Form Submitted");
                done();
            });
    });
});