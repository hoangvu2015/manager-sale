var config = require('./config.js');
var assert = require("assert");
var request = require("request");

describe("User API", function() {
    it("Login", function(done) {
        request.post({
                url: `${config.baseUrl}/user/login`,
                form: {
                    email: 'admin@gmail.com',
                    password: 'iii3studi1',
                    scope: 'admin'
                }
            },
            function(err, res, body) {
                if (err) done(err);
                var payload = JSON.parse(body);
                assert.notEqual(payload.statusCode, 400);
                done();
            });
    });

    it("Register", function(done) {
        request.post({
                url: `${config.baseUrl}/user/register`,
                form: {
                    name: 'test',
                    email: 'test3@gmail.com',
                    password: '123456',
                    cfpassword: '123456'
                }
            },
            function(err, res, body) {
                if (err) done(err);
                var payload = JSON.parse(body);
                assert.notEqual(payload.statusCode, 400);
                done();
            });
    });
});