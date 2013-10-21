/*
 * Compact promise pattern implementation and more. (https://github.com/mathieumast/profmk)
 * 
 * Version : 0.6.0
 * 
 * Copyright (c) 2013, Mathieu MAST
 * 
 * Licensed under the MIT license
 */
(function() {
    'use strict';

    var profmk = {};

    profmk.errors = {
        timeout: 'Timeout error'
    };

    /*
     * Slice array or arguments.
     */
    profmk.slice = function(array, start, end) {
        if (!!end)
            return Array.prototype.slice.call(array, start, end);
        else if (!!start)
            return Array.prototype.slice.call(array, start);
        else
            return Array.prototype.slice.call(array);
    };

    /*
     * Invoke function for context and many arguments.
     */
    profmk.invoke = function(context, func) {
        return func.apply(context, profmk.slice(arguments, 2));
    };

    /*
     * Asynchrone invoke function for context and many arguments and return promise.
     */
    profmk.async = function(context, func) {
        var _future = profmk.future(), args = profmk.slice(arguments, 2);
        setTimeout(function() {
            _future.notifyDone(func.apply(context, args));
        }, 1);
        return _future.promise();
    };

    /*
     * Returns the index of item in the array or -1 if item is not found.
     */
    profmk.indexOf = Array.prototype.indexOf || function(array, item) {
        var i = 0, l = array.length;
        for (; i < l; i++)
            if (array[i] === item)
                return i;
        return -1;
    };

    /*
     * Returns true if value is undefined.
     */
    profmk.isUndefined = function(value) {
        return typeof value == 'undefined';
    };

    /*
     * Returns true if value is null.
     */
    profmk.isNull = function(value) {
        return value === null;
    };

    /*
     * Returns true if value is an object.
     */
    profmk.isObject = function(value) {
        return value === Object(value);
    };

    /*
     * Function isArray, isObject, isFunction, isString, isBoolean, isNumber, isDate, isRegExp.
     */
    var typesElems = ['Array', 'Function', 'String', 'Boolean', 'Number', 'Date', 'RegExp'];
    for (var i = 0; i < typesElems.length; i++) {
        profmk.invoke(profmk, function(type) {
            this['is' + type] = function(value) {
                return value == null ? false : Object.prototype.toString.call(value) == '[object ' + type + ']';
            };
        }, typesElems[i]);
    }

    /*
     * Extend object.
     */
    profmk.extend = function(dest) {
        var args = profmk.slice(arguments, 1), i = 0, l = args.length, prop;
        for (; i < l; i++)
            for (prop in args[i])
                dest[prop] = args[i][prop];
        return dest;
    };

    /*
     * Create a new instance of function and arguments in array.
     */
    profmk.instantiate = function(func, args) {
        var obj, i = 0, l = args.length, q = [];
        if (profmk.isArray(args)) {
            switch (l) {
                case 0:
                    obj = new func();
                    break;
                case 1:
                    obj = new func(args[0]);
                    break;
                case 2:
                    obj = new func(args[0], args[1]);
                    break;
                case 3:
                    obj = new func(args[0], args[1], args[2]);
                    break;
                case 4:
                    obj = new func(args[0], args[1], args[2], args[3]);
                    break;
                default:
                    for (; i < l; i++)
                        q.push('args[' + i + ']');
                    obj = eval('new func(' + q.join(',') + ');');
            }
            return obj;
        } else
            return new func();
    };

    /*
     * Promise implementation.
     */
    var _Promise = function() {
        var _callbacks = {
            done: [],
            fail: [],
            progress: []
        };
        /*
         * Return copy of callbacks.
         */
        this.callbacks = function() {
            return {
                done: profmk.slice(_callbacks.done),
                fail: profmk.slice(_callbacks.fail),
                progress: profmk.slice(_callbacks.progress)
            };
        };
        /*
         * Add handlers to be called when the Promise object is done, failed, or still in progress.
         */
        this.then = function(done, fail, progress) {
            if (profmk.isFunction(done))
                _callbacks['done'].push(done);
            if (profmk.isFunction(fail))
                _callbacks['fail'].push(fail);
            if (profmk.isFunction(progress))
                _callbacks['progress'].push(progress);
            return this;
        };
    };

    /*
     * Future implementation.
     */
    var _Future = function() {
        var _step = 'progress', _promise = new _Promise(), _self = this;
        this.context = this;
        this._notify = function(type, array) {
            if (_step === 'progress') {
                _step = type;
                profmk.async(_self, function() {
                    var _callbacks = _promise.callbacks(), i = 0, l = _callbacks[type].length;
                    for (; i < l; i++)
                        _callbacks[type][i].apply(_self.context, array);
                });
            }
            return _self;
        };
        /*
         * Return promise instance.
         */
        this.promise = function() {
            return _promise;
        };
    };
    /*
     * Add handlers to be called when the Future object is done, failed, or still in progress.
     */
    _Future.prototype.then = function(done, fail, progress) {
        this.promise().then(done, fail, progress);
    };
    /*
     * Function notifyDone, notifyFail, notifyProgress : notify that the Future object is Done, Fail, Progress.
     */
    _Future.prototype.notifyDone = function() {
        return this._notify('done', profmk.slice(arguments));
    };
    /*
     * Notify that the Future object is failed.
     */
    _Future.prototype.notifyFail = function() {
        return this._notify('fail', profmk.slice(arguments));
    };
    /*
     * Notify that the Future object is in progress.
     */
    _Future.prototype.notifyProgress = function() {
        return this._notify('progress', profmk.slice(arguments));
    };
    /*
     * Get a new future object.
     */
    profmk.future = function() {
        return new _Future();
    };

    /*
     * When implementation.
     */
    var _When = function(objs) {
        profmk.extend(this, new _Future());
        var _results = [], _remaining = objs.length, i = 0, l = objs.length, _self = this;
        for (; i < l; i++) {
            var elem = objs[i], promise;
            if (profmk.isUndefined(elem) || profmk.isNull(elem))
                promise = profmk.future().notifyDone(null).promise();
            else if (profmk.isFunction(elem.then))
                promise = profmk.isFunction(elem.promise) ? elem.promise() : elem;
            else if (profmk.isFunction(elem))
                promise = profmk.async(_self, elem, profmk.slice(arguments, 2));
            else
                promise = profmk.future().notifyDone(elem).promise();
            profmk.invoke(_self, function(i, promise) {
                promise.then(function(obj) {
                    _results[i] = obj;
                    if (--_remaining === 0) {
                        _Future.prototype.notifyDone.apply(_self.context, _results);
                    } else {
                        _self.context.notifyProgress(obj);
                    }
                }, function(obj) {
                    _self.context.notifyFail(obj);
                }, function(obj) {
                    _self.context.notifyProgress(obj);
                });
            }, i, promise);
        }
    };
    profmk.extend(_When.prototype, _Future.prototype);
    /*
     * Get a new when promise object.
     */
    profmk.when = function() {
        var when = new _When(profmk.slice(arguments));
        return when.promise();
    };

    /*
     * Get a new wait promise object.
     */
    profmk.wait = function(ms) {
        var future = profmk.future(), objs = [future].concat(profmk.slice(arguments, 1)), when = new _When(objs);
        setTimeout(function() {
            future.notifyDone(ms);
        }, ms);
        return when.promise();
    };

    /*
     * Get a new timeout promise object.
     */
    profmk.timeout = function(ms) {
        var when = new _When([ms].concat(profmk.slice(arguments, 1)));
        setTimeout(function() {
            when.notifyFail(profmk.errors.timeout);
        }, ms);
        return when.promise();
    };

    /*
     * Export profmk.
     */
    if (typeof define == 'function' && define.amd) {
        define('profmk', function() {
            return profmk;
        });
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = profmk;
    } else {
        var root = this;
        root['profmk'] = profmk;
    }
}).call(this);