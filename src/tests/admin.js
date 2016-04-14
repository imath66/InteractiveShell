var sinon = require('sinon');
var assert = require('chai').assert;
var rewire = require('rewire');

describe('Admin Module test', function() {
  var admin;
  var clients;
  var options;
  var adminModule;

  before(function() {
    clients = {
      totalUsers: 17,
      user16: {},
      user12: {}
    };
    options = {
      MATH_PROGRAM: "MyProgram"
    };
    adminModule = rewire('../lib/admin.js');
    admin = adminModule(clients, options);
  });

  describe('Admin.stats()', function() {
    it('should get the stats', function(done) {
      var spy;
      var response = {
        writeHead: function(statusCode, headers) {
          assert.equal(statusCode, 200);
          assert.deepEqual(headers, {"Content-Type": "text/html"});
        },
        write: function() {
        },
        end: function() {
          assert.equal(spy.callCount, 5);

          var firstArgument = "<head><link rel=\"stylesheet\" " +
              "href=\"mathProgram.css\" " +
              "type=\"text/css\" " +
              "media=\"screen\"></head>";
          assert.equal(spy.firstCall.args[0], firstArgument);

          var secondArgument = "<h1>MyProgram User Statistics</h1>";
          assert.equal(spy.secondCall.args[0], secondArgument);

          var thirdArgument = "There are currently 2 users " +
              "using MyProgram.<br>";
          assert.equal(spy.thirdCall.args[0], thirdArgument);

          var fourthArgument = "In total, there were 17 new " +
              "users since the server started.<br>";
          assert.equal(spy.getCall(3).args[0], fourthArgument);

          done();
        }
      };
      spy = sinon.spy(response, "write");
      admin.stats(null, response);
    });
  });
  describe('Current users', function() {
    it('should be 2', function() {
      var currentUsers = adminModule.__get__("currentUsers");
      assert.equal(currentUsers(clients), 2);
    });
  });
});