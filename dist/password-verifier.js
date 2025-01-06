"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordVerifier = exports.verifyPassword3 = exports.oneUppCaseRule = exports.PasswordVerifier1 = void 0;
var time_provider_1 = require("./time-provider");
var PasswordVerifier1 = /** @class */ (function () {
    function PasswordVerifier1() {
        this.rules = [];
    }
    PasswordVerifier1.prototype.addRule = function (rule) {
        this.rules.push(rule);
    };
    PasswordVerifier1.prototype.verify = function (input) {
        var errors = [];
        this.rules.forEach(function (rule) {
            var result = rule(input);
            if (!result.passed) {
                errors.push("error ".concat(result.reason));
            }
        });
        return errors;
    };
    return PasswordVerifier1;
}());
exports.PasswordVerifier1 = PasswordVerifier1;
var oneUppCaseRule = function (input) {
    return {
        passed: (input.toLowerCase() !== input),
        reason: "at least one upperCase needed"
    };
};
exports.oneUppCaseRule = oneUppCaseRule;
//-------------------- dependency injection via partialmocks -----------------------
var SUNDAY = 0, SATURDAY = 6, MONDAY = 1;
var verifyPassword3 = function (input, rules, getDayFn) {
    var dayOfWeek = getDayFn();
    if ([SATURDAY, SUNDAY].includes(dayOfWeek)) {
        throw Error("It's the weekend!");
    }
    return [];
};
exports.verifyPassword3 = verifyPassword3;
//-------------------- Object-oriented injection techniques -----------------------
var PasswordVerifier = /** @class */ (function () {
    function PasswordVerifier(rules, timeProvider) {
        this.rules = rules;
        this.timeProvider = timeProvider;
    }
    PasswordVerifier.prototype.verify = function (input) {
        if ([SATURDAY, SUNDAY].includes(this.timeProvider())) {
            throw new Error("It's the weekend!");
        }
        var errros = [];
        return errros;
    };
    return PasswordVerifier;
}());
exports.PasswordVerifier = PasswordVerifier;
var passwordVerifierFactory = function (rules) {
    return new PasswordVerifier(new time_provider_1.RealTimeProvider());
};
