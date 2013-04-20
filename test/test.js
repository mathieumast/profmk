var profmk = require("../profmk");
var expect = require("chai").expect;
var assert = require("chai").assert;

describe("inherit with extend", function() {

    var Parent = function() {
        this.num = 6;
        this.str = "string";
    };
    Parent.prototype.info = function() {
        return this.num + " " + this.str;
    };

    var Child = function() {
        profmk.extend(this, new Parent());
    };
    profmk.extend(Child.prototype, Parent.prototype);

    it("inherit 1", function() {
        var parent = new Parent();
        expect(parent.info()).to.equal("6 string");
        parent.num = 7;
        parent.str = "toto";
        expect(parent.info()).to.equal("7 toto");

        var child = new Child();
        expect(child.info()).to.equal("6 string");
        parent.num = 9;
        parent.str = "titi";
        expect(parent.info()).to.equal("9 titi");
    });

});

describe("future", function() {

    it("progress & done", function(done) {
        var future = profmk.future();
        var progress = 0;
        future.then(function(obj) {
            expect(obj).to.equal("done");
            expect(progress).to.equal(3);
            done();
        }, function(obj) {
            assert(false, "must not be called!");
        }, function(obj) {
            expect(obj).to.equal("progress");
            progress++;
        });

        future.notifyProgress("progress");
        future.notifyProgress("progress");
        future.notifyProgress("progress");
        future.notifyDone("done");
    });

    it("progress & fail", function(done) {
        var future = profmk.future();
        var progress = 0;
        future.then(function(obj) {
            assert(false, "must not be called!");
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

    it("done & !progress & !fail", function(done) {
        var future = profmk.future();
        var promise = future.promise();
        promise.then(function(obj) {
            setTimeout(done, 100);
        }, function(obj) {
            assert(false, "must not be called!");
        }, function(obj) {
            assert(false, "must not be called!");
        });

        future.notifyDone("done");
        future.notifyProgress("progress");
        future.notifyFail("fail");
    });

    it("fail & !progress & !done", function(done) {
        var future = profmk.future();
        var promise = future.promise();
        promise.then(function(obj) {
            assert(false, "must not be called!");
        }, function(obj) {
            setTimeout(done, 100);
        }, function(obj) {
            assert(false, "must not be called!");
        });

        future.notifyFail("fail");
        future.notifyProgress("progress");
        future.notifyDone("done");
    });
});

describe("promise", function() {

    it("progress & done", function(done) {
        var future = profmk.future();
        var promise = future.promise();
        var progress = 0;
        promise.then(function(obj) {
            expect(obj).to.equal("done");
            expect(progress).to.equal(3);
            done();
        }, function(obj) {
            assert(false, "must not be called!");
        }, function(obj) {
            expect(obj).to.equal("progress");
            progress++;
        });

        future.notifyProgress("progress");
        future.notifyProgress("progress");
        future.notifyProgress("progress");
        future.notifyDone("done");
    });

    it("progress & fail", function(done) {
        var future = profmk.future();
        var promise = future.promise();
        var progress = 0;
        promise.then(function(obj) {
            assert(false, "must not be called!");
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

});

describe("when", function() {

    it("progress & done", function(done) {
        var future1 = profmk.future();
        var future2 = profmk.future();
        var future3 = profmk.future();
        var when = profmk.when(future1, future2, future3, "string", 3, null, [ 1, 2, 3 ], {
            a : 1,
            b : 2
        });
        var progress = 0;
        when.then(function() {
            expect(profmk.slice(arguments)).to.deep.equal([ "done1", "done2", "done3", "string", 3, null, [ 1, 2, 3 ], {
                a : 1,
                b : 2
            } ]);
            expect(progress).to.equal(7);
            done();
        }, function(obj) {
            assert(false, "must not be called!");
        }, function(obj) {
            progress++;
        });

        future1.notifyDone("done1");
        future2.notifyDone("done2");
        future3.notifyDone("done3");
    });

});

describe("wait", function() {

    it("done", function(done) {
        var when = profmk.wait(200);
        when.then(function(obj) {
            expect(obj).to.equal(200);
            done();
        }, function(obj) {
            assert(false, "must not be called!");
        }, function(obj) {
            assert(false, "must not be called!");
        });
    });

    it("progress & done", function(done) {
        var when = profmk.wait(200, "string", 3);
        var progress = 0;
        when.then(function() {
            expect(profmk.slice(arguments)).to.deep.equal([ 200, "string", 3 ]);
            expect(progress).to.equal(2);
            done();
        }, function(obj) {
            assert(false, "failed must be called!");
        }, function(obj) {
            progress++;
        });
    });

});

describe("timeout", function() {

    it("progress & done", function(done) {
        var when = profmk.timeout(200, "string", 3, profmk.wait(100));
        var progress = 0;
        when.then(function() {
            expect(profmk.slice(arguments)).to.deep.equal([ 200, "string", 3, 100 ]);
            expect(progress).to.equal(3);
            done();
        }, function(obj) {
            assert(false, "failed must be called!");
        }, function(obj) {
            progress++;
        });
    });

    it("fail", function(done) {
        var when = profmk.timeout(200, profmk.wait(400));
        var progress = 0;
        when.then(function(obj) {
            assert(false, "must not be called!");
        }, function(obj) {
            expect(obj).to.equal("Timeout error");
            done();
        }, function(obj) {
            progress++;
        });
    });

});
