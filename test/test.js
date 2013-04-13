var profmk = require("../profmk");
var expect = require("chai").expect;
var assert = require("chai").assert;

describe("profmk", function() {

  it("future: progress & done", function(done) {
    var future = profmk.future();
    var progress = 0;
    future.then(function(obj) {
      expect(obj).to.equal("done");
      expect(progress).to.equal(3);
      done();
    }, function(obj) {
      assert(false, "must be called!");
    }, function(obj) {
      expect(obj).to.equal("progress");
      progress++;
    });

    future.notifyProgress("progress");
    future.notifyProgress("progress");
    future.notifyProgress("progress");
    future.notifyDone("done");
  });
  
  it("future: progress & fail", function(done) {
    var future = profmk.future();
    var progress = 0;
    future.then(function(obj) {
      assert(false, "must be called!");
    }, function(obj) {
      expect(obj).to.equal("fail");
      expect(progress).to.equal(3);
      done();
    }, function(obj) {
      expect(obj).to.equal("progress");
      progress++;
    });

    future.notifyProgress("progress");
    future.notifyProgress("progress");
    future.notifyProgress("progress");
    future.notifyFail("fail");
  });

  it("future -> promise: progress & done", function(done) {
    var future = profmk.future();
    var promise = future.promise();
    var progress = 0;
    promise.then(function(obj) {
      expect(obj).to.equal("done");
      expect(progress).to.equal(3);
      done();
    }, function(obj) {
      assert(false, "must be called!");
    }, function(obj) {
      expect(obj).to.equal("progress");
      progress++;
    });

    future.notifyProgress("progress");
    future.notifyProgress("progress");
    future.notifyProgress("progress");
    future.notifyDone("done");
  });
  
  it("future -> promise: progress & fail", function(done) {
    var future = profmk.future();
    var promise = future.promise();
    var progress = 0;
    promise.then(function(obj) {
      assert(false, "must be called!");
    }, function(obj) {
      expect(obj).to.equal("fail");
      expect(progress).to.equal(3);
      done();
    }, function(obj) {
      expect(obj).to.equal("progress");
      progress++;
    });

    future.notifyProgress("progress");
    future.notifyProgress("progress");
    future.notifyProgress("progress");
    future.notifyFail("fail");
  });
  
  it("future: done & !progress & !fail", function(done) {
    var future = profmk.future();
    var promise = future.promise();
    promise.then(function(obj) {
      setTimeout(done, 100);
    }, function(obj) {
      assert(false, "must be called!");
    }, function(obj) {
      assert(false, "must be called!");
    });

    future.notifyDone("done");
    future.notifyProgress("progress");
    future.notifyFail("fail");
  });
  
  it("future: fail & !progress & !done", function(done) {
    var future = profmk.future();
    var promise = future.promise();
    promise.then(function(obj) {
      assert(false, "must be called!");
    }, function(obj) {
      setTimeout(done, 100);
    }, function(obj) {
      assert(false, "must be called!");
    });

    future.notifyFail("fail");
    future.notifyProgress("progress");
    future.notifyDone("done");
  });
});
