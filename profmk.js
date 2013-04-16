/**
 * Compact promise pattern implementation and more.
 * (https://github.com/mathieumast/profmk)
 * 
 * Version : 0.5.3
 * 
 * Copyright (c) 2013, Mathieu MAST
 * 
 * Licensed under the MIT license
 */
(function() {
  "use strict";

  /**
   * Returns true if object is an object.
   */
  var isObject = function(obj) {
    return obj === Object(obj);
  };

  /**
   * Returns true if object is an array.
   */
  var isArray = Array.isArray || function(obj) {
    return toString.call(obj) == "[object Array]";
  };

  /**
   * Returns the index of item in the array or -1 if item is not found.
   */
  var indexOf = Array.prototype.indexOf || function(array, item) {
    var i = 0, l = array.length;
    for (; i < l; i++)
      if (array[i] === item)
        return i;
    return -1;
  };

  /**
   * Slice object (array or arguments).
   */
  var slice = function(obj, start, end) {
    return Array.prototype.slice.call(obj, start, end);
  };

  /**
   * Extend object.
   */
  var extend = function(dest) {
    var args = slice(arguments, 1), i = 0, l = args.length;
    for (; i < l; i++) {
      var source = args[i];
      for ( var prop in source) {
        dest[prop] = source[prop];
      }
    }
    return dest;
  };

  /**
   * Create a new instance of object and arguments.
   */
  var instantiate = function(Obj, args) {
    var obj;
    if (isArray(args)) {
      switch (args.length) {
      case 0:
        obj = new Obj();
        break;
      case 1:
        obj = new Obj(args[0]);
        break;
      case 2:
        obj = new Obj(args[0], args[1]);
        break;
      case 3:
        obj = new Obj(args[0], args[1], args[2]);
        break;
      case 4:
        obj = new Obj(args[0], args[1], args[2], args[3]);
        break;
      case 5:
        obj = new Obj(args[0], args[1], args[2], args[3], args[4]);
        break;
      case 6:
        obj = new Obj(args[0], args[1], args[2], args[3], args[4], args[5]);
        break;
      case 7:
        obj = new Obj(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        break;
      case 8:
        obj = new Obj(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        break;
      case 9:
        obj = new Obj(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
        break;
      case 10:
        obj = new Obj(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        break;
      default:
        throw new Error("Max arguments : 10");
      }
    } else {
      obj = new Obj();
    }
    return obj;
  };

  /**
   * Promise implementation.
   */
  var _Promise = function() {
    var _callbacks = {
      done : [],
      fail : [],
      progress : []
    };
    /**
     * Return copy of callbacks.
     */
    this.callbacks = function() {
      return {
        done : slice(_callbacks.done),
        fail : slice(_callbacks.fail),
        progress : slice(_callbacks.progress)
      };
    };
    /**
     * Add handlers to be called when the Promise object is done, failed, or
     * still in progress.
     */
    this.then = function(done, fail, progress) {
      var addCallback = function(type, callback) {
        if (typeof callback === "function") {
          _callbacks[type].push(callback);
        }
      };
      addCallback("done", done);
      addCallback("fail", fail);
      addCallback("progress", progress);
      return this;
    };
  };

  /**
   * Future implementation.
   */
  var _Future = function() {
    var _step = "progress", _promise = new _Promise();
    this._notify = function(type, array) {
      if (_step === "progress") {
        _step = type;
        setTimeout(function() {
          var _callbacks = _promise.callbacks();
          for ( var i = 0; i < _callbacks[type].length; i++) {
            var callback = _callbacks[type][i];
            callback.apply(_promise, array);
          }
        }, 1);
      }
    };
    /**
     * Return promise instance.
     */
    this.promise = function() {
      return _promise;
    };
  };
  /**
   * Add handlers to be called when the Future object is done, failed, or still
   * in progress.
   */
  _Future.prototype.then = function(done, fail, progress) {
    this.promise().then(done, fail, progress);
  };
  /**
   * Notify that the Future object is done.
   */
  _Future.prototype.notifyDone = function() {
    this._notify("done", slice(arguments));
  };
  /**
   * Notify that the Future object is failed.
   */
  _Future.prototype.notifyFail = function() {
    this._notify("fail", slice(arguments));
  };
  /**
   * Notify that the Future object is in progress.
   */
  _Future.prototype.notifyProgress = function() {
    this._notify("progress", slice(arguments));
  };

  /**
   * When implementation. When is an extention of Future.
   */
  var _When = function(promises) {
    extend(this, new _Future());
    var _results = [], _remaining = promises.length, self = this;
    var watch = function(i, promise) {
      promise.then(function(obj) {
        _results[i] = obj;
        if (--_remaining === 0) {
          var joinObjs = [];
          for ( var j = 0; j < _results.length; j++) {
            joinObjs.push(_results[j]);
          }
          _Future.prototype.notifyDone.apply(self, joinObjs);
        } else {
          self.notifyProgress(obj);
        }
      }, function(obj) {
        self.notifyFail(obj);
      }, function(obj) {
        self.notifyProgress(obj);
      });
    };
    for ( var i = 0; i < promises.length; i++) {
      watch(i, promises[i]);
    }
  };
  extend(_When.prototype, _Future.prototype);

  /**
   * Export profmk.
   */
  var profmk = {};
  profmk.isObject = isObject;
  profmk.isArray = isArray;
  profmk.indexOf = indexOf;
  profmk.slice = slice;
  profmk.extend = extend;
  profmk.instantiate = instantiate;
  profmk.future = function() {
    return new _Future();
  };
  profmk.when = function() {
    return new _When(slice(arguments));
  };
  if (typeof define === "function" && define.amd) {
    define("profmk", function() {
      return profmk;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = profmk;
  } else {
    var root = this;
    root["profmk"] = profmk;
  }
}).call(this);