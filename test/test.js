var profmk = require("./profmk");
var expect = require("./ext/chai").expect;
var assert = require("./ext/chai").assert;

describe("is", function() {

    it("isObject", function() {
        var f = profmk.isObject;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.true;
        expect(f(arguments)).to.be.true;
        expect(f([1, 2, 3])).to.be.true;
        expect(f(function() {
        })).to.be.true;
        expect(f(new Date())).to.be.true;
        expect(f(/./)).to.be.true;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.false;
    });

    it("isUndefined", function() {
        var f = profmk.isUndefined;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.false;
        expect(f(function() {
        })).to.be.false;
        expect(f(new Date())).to.be.false;
        expect(f(/./)).to.be.false;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.true;
    });

    it("isNull", function() {
        var f = profmk.isNull;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.false;
        expect(f(function() {
        })).to.be.false;
        expect(f(new Date())).to.be.false;
        expect(f(/./)).to.be.false;
        expect(f(null)).to.be.true;
        expect(f(void 0)).to.be.false;
    });

    it("isArray", function() {
        var f = profmk.isArray;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.true;
        expect(f(function() {
        })).to.be.false;
        expect(f(new Date())).to.be.false;
        expect(f(/./)).to.be.false;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.false;
    });

    it("isFunction", function() {
        var f = profmk.isFunction;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.false;
        expect(f(function() {
        })).to.be.true;
        expect(f(new Date())).to.be.false;
        expect(f(/./)).to.be.false;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.false;
    });

    it("isString", function() {
        var f = profmk.isString;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.true;
        expect(f("true")).to.be.true;
        expect(f("false")).to.be.true;
        expect(f("10")).to.be.true;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.false;
        expect(f(function() {
        })).to.be.false;
        expect(f(new Date())).to.be.false;
        expect(f(/./)).to.be.false;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.false;
    });

    it("isBoolean", function() {
        var f = profmk.isBoolean;
        expect(f(true)).to.be.true;
        expect(f(false)).to.be.true;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.false;
        expect(f(function() {
        })).to.be.false;
        expect(f(new Date())).to.be.false;
        expect(f(/./)).to.be.false;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.false;
    });

    it("isNumber", function() {
        var f = profmk.isNumber;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.true;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.false;
        expect(f(function() {
        })).to.be.false;
        expect(f(new Date())).to.be.false;
        expect(f(/./)).to.be.false;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.false;
    });

    it("isDate", function() {
        var f = profmk.isDate;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.false;
        expect(f(function() {
        })).to.be.false;
        expect(f(function() {
        })).to.be.false;
        expect(f(new Date())).to.be.true;
        expect(f(/./)).to.be.false;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.false;
    });

    it("isRegExp", function() {
        var f = profmk.isRegExp;
        expect(f(true)).to.be.false;
        expect(f(false)).to.be.false;
        expect(f(10)).to.be.false;
        expect(f("foo")).to.be.false;
        expect(f("true")).to.be.false;
        expect(f("false")).to.be.false;
        expect(f("10")).to.be.false;
        expect(f({a: 1})).to.be.false;
        expect(f(arguments)).to.be.false;
        expect(f([1, 2, 3])).to.be.false;
        expect(f(function() {
        })).to.be.false;
        expect(f(new Date())).to.be.false;
        expect(f(/./)).to.be.true;
        expect(f(null)).to.be.false;
        expect(f(void 0)).to.be.false;
    });

});

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

describe("mediator", function() {

    it("publish/subscribe", function(done) {
        var mediator = profmk.mediator();
        var nb1 = 0;
        var nb2 = 0;
        var str = "";
        mediator.subscribe("channel 1", function(obj1, obj2) {
            nb1++;
            str += " 1 " + obj1 + obj2;
        });
        mediator.subscribe("channel 2", function(obj1, obj2) {
            nb2++;
            str += " 2 " + obj1 + obj2;
        });
        mediator.subscribe("channel 2", function(obj1, obj2) {
            nb2++;
            str += " 3 " + obj1 + obj2;
            return false;
        });
        mediator.subscribe("channel 2", function() {
            assert(false, "must not be called!");
        });
        mediator.subscribe("channel 2", function(obj1, obj2) {
            nb2++;
            str += " 4 " + obj1 + obj2;
        }, 1);
        mediator.subscribe("channel 3", function(obj1, obj2, obj3) {
            expect(nb1).to.equal(1);
            expect(nb2).to.equal(6);
            expect(str).to.equal(" 4 ab 2 ab 3 ab 1 cd 4 ef 2 ef 3 ef");
            expect(obj1).to.equal(1);
            expect(obj2).to.equal(2);
            expect(obj3).to.equal(3);
            done();
        });
        mediator.publish("channel 2", "a", "b");
        mediator.publish("channel 1", "c", "d");
        mediator.publish("channel 2", "e", "f");
        mediator.publish("channel 3", 1, 2, 3);
    });

    it("publish/unsubscribe/subscribe", function(done) {
        var mediator = profmk.mediator();
        var nb1 = 0;
        var nb2 = 0;
        
        mediator.subscribe("channel 1", function() {
            nb1++;
        });
        mediator.subscribe("channel 2", function() {
            nb2++;
        });        
        var f = function() {
            assert(false, "must not be called!");
        };
        mediator.subscribe("channel 2", f);
        mediator.subscribe("channel 3", function() {
            assert(false, "must not be called!");
        });
        mediator.subscribe("channel 3", function() {
            assert(false, "must not be called!");
        });
        mediator.subscribe("channel 4", function() {
            expect(nb1).to.equal(1);
            expect(nb2).to.equal(1);
            done();
        });
        mediator.publish("channel 1");
        mediator.unsubscribe("channel 2", f);
        mediator.publish("channel 2");
        mediator.unsubscribe("channel 3");
        mediator.publish("channel 3");
        mediator.publish("channel 4");
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
        }, function() {
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
        future.then(function() {
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
        promise.then(function() {
            setTimeout(done, 100);
        }, function() {
            assert(false, "must not be called!");
        }, function() {
            assert(false, "must not be called!");
        });

        future.notifyDone("done");
        future.notifyProgress("progress");
        future.notifyFail("fail");
    });

    it("fail & !progress & !done", function(done) {
        var future = profmk.future();
        var promise = future.promise();
        promise.then(function() {
            assert(false, "must not be called!");
        }, function() {
            setTimeout(done, 100);
        }, function() {
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
        }, function() {
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
        promise.then(function() {
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

    it("progress & done 1", function(done) {
        var future1 = profmk.future();
        var future2 = profmk.future();
        var future3 = profmk.future();
        var when = profmk.when(future1, future2, future3, "string", 3, null, [1, 2, 3], {
            a: 1,
            b: 2
        });
        var progress = 0;
        when.then(function() {
            expect(profmk.slice(arguments)).to.deep.equal(["done1", "done2", "done3", "string", 3, null, [1, 2, 3], {
                    a: 1,
                    b: 2
                }]);
            expect(progress).to.equal(7);
            done();
        }, function() {
            assert(false, "must not be called!");
        }, function() {
            progress++;
        });

        future1.notifyDone("done1");
        future2.notifyDone("done2");
        future3.notifyDone("done3");
    });

    it("progress & done 2", function(done) {
        var f1 = function() {
            return 1;
        };
        var f2 = function() {
            return 2;
        };
        var f3 = function() {
            return 3;
        };

        var when = profmk.when(f1, f2, f3);
        var progress = 0;
        when.then(function() {
            expect(profmk.slice(arguments)).to.deep.equal([1, 2, 3]);
            expect(progress).to.equal(2);
            done();
        }, function() {
            assert(false, "must not be called!");
        }, function() {
            progress++;
        });
    });

});

describe("wait", function() {

    it("done", function(done) {
        var when = profmk.wait(200);
        when.then(function(obj) {
            expect(obj).to.equal(200);
            done();
        }, function() {
            assert(false, "must not be called!");
        }, function() {
            assert(false, "must not be called!");
        });
    });

    it("progress & done", function(done) {
        var when = profmk.wait(200, "string", 3);
        var progress = 0;
        when.then(function() {
            expect(profmk.slice(arguments)).to.deep.equal([200, "string", 3]);
            expect(progress).to.equal(2);
            done();
        }, function() {
            assert(false, "failed must be called!");
        }, function() {
            progress++;
        });
    });

});

describe("timeout", function() {

    it("progress & done", function(done) {
        var when = profmk.timeout(200, "string", 3, profmk.wait(100));
        var progress = 0;
        when.then(function() {
            expect(profmk.slice(arguments)).to.deep.equal([200, "string", 3, 100]);
            expect(progress).to.equal(3);
            done();
        }, function() {
            assert(false, "failed must be called!");
        }, function() {
            progress++;
        });
    });

    it("fail", function(done) {
        var when = profmk.timeout(200, profmk.wait(400));
        var progress = 0;
        when.then(function() {
            assert(false, "must not be called!");
        }, function(obj) {
            expect(obj).to.equal("Timeout error");
            done();
        }, function() {
            progress++;
        });
    });

});
