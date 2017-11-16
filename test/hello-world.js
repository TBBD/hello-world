var HelloWorld = artifacts.require("./HelloWorld.sol");



contract('HelloWorld', function(accounts) {

  var contract;

  before(function() {
      return HelloWorld.deployed().then(function(instance){
         contract = instance;
      });
  });


  it("default initiation should not have empty string", function() {
    return HelloWorld.deployed().then(function(instance) {
      return instance.getMessage.call();
    }).then(function(message) {
      assert.notEqual(message, "", "Is not empty");
    });
  });

  it("setMessage should not have empty string", function() {
    return HelloWorld.deployed().then(function(instance) {
      return instance.setMessage("");
    }).then(function(message) {
      assert.notEqual(message, "", "is not empty");
    });
  });


  it("should assert true", function(done) {
    var helloWorld = HelloWorld.deployed();
    assert.isTrue(true);
    done();
  });
});
