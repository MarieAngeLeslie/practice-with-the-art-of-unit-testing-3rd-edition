"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var password_verifier_js_1 = require("../password-verifier.js");
var makeVerifier = function () { return new password_verifier_js_1.PasswordVerifier1(); };
var passingRule = function (input) { return ({ passed: true, reason: '' }); };
var makeVerifierWithPassingRule = function () {
    var verifier = makeVerifier();
    verifier.addRule(passingRule);
    return verifier;
};
var makeVerifierWithFailedRule = function (reason) {
    var verifier = makeVerifier();
    var fakeRule = function (input) { return ({ passed: false, reason: reason }); };
    verifier.addRule(fakeRule);
    return verifier;
};
describe('verifyPassword', function () {
    describe('With a failing rule', function () {
        it('it has an error message based on the rule.reason', function () {
            var verifier = makeVerifierWithFailedRule('fake reason');
            var errors = verifier.verify('any input');
            expect(errors[0]).toContain('fake reason');
        });
        it('has exactly one error', function () {
            var verifier = makeVerifierWithFailedRule('fake reason');
            var errors = verifier.verify('any input');
            expect(errors.length).toBe(1);
        });
    });
    describe('With a passing rule', function () {
        it('has no errors', function () {
            var verifier = makeVerifierWithPassingRule();
            var errors = verifier.verify('any input');
            expect(errors.length).toBe(0);
        });
    });
    describe('with a failing and a passing rule', function () {
        it('has one error', function () {
            var verifier = makeVerifierWithFailedRule('fake reason');
            verifier.addRule(passingRule);
            var errors = verifier.verify('any input');
            expect(errors.length).toBe(1);
        });
        it('error text belongs to failed rule', function () {
            var verifier = makeVerifierWithFailedRule('fake reason');
            verifier.addRule(passingRule);
            var errors = verifier.verify('any input');
            expect(errors[0]).toContain('fake reason');
        });
    });
    describe('one uppercase rule', function () {
        test.each([
            ['Abc', true],
            ['aBc', true],
            ['abc', false]
        ])('given %s %s,', function (input, expected) {
            var result = (0, password_verifier_js_1.oneUppCaseRule)(input);
            expect(result.passed).toEqual(expected);
        });
    });
});
//-------------------- Functional injection techniques -----------------------
var SUNDAY = 0, MONDAY = 1, TUESDAY = 2, WEDNESDAY = 3, FRIDAY = 4, SATURDAY = 6;
var _makeVerifier = function (rules, dayOfWeekFn) {
    return function (input) {
        if ([SUNDAY, SATURDAY].includes(dayOfWeekFn())) {
            throw new Error("It's the weekend!");
        }
    };
};
describe('verifier', function () {
    test('factory method: on weekends, throws exception', function () {
        var alwaysSunday = function () { return SUNDAY; };
        var verifyPassword = _makeVerifier([], alwaysSunday);
        expect(function () { return verifyPassword('anything'); })
            .toThrow("It's the weekend!");
    });
});
//-------------------- Object-oriented injection techniques -----------------------
describe('refactored with constructor', function () {
    var makeVerifier = function (rules, dayFn) {
        return new password_verifier_js_1.PasswordVerifier(rules, dayFn);
    };
    test('class constructor : on weekends, throws exception', function () {
        var alwaysSunday = function () { return SUNDAY; };
        var verifier = makeVerifier([], alwaysSunday);
        expect(function () { return verifier.verify('anything'); }).toThrow("It's the weekend!");
    });
    test('class constructor : on weekends with no rules, passes', function () {
        var alwaysMonday = function () { return MONDAY; };
        var verifier = makeVerifier([], alwaysMonday);
        var result = verifier.verify('anything');
        expect(result.length).toBe(0);
    });
});
