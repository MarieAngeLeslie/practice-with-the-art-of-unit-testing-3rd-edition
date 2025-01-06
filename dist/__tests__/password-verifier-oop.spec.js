"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var password_verifier_1 = require("../password-verifier");
//-------------------- Object-oriented code testing side -----------------------
var SUNDAY = 0;
var FakeTimeProvider = /** @class */ (function () {
    function FakeTimeProvider() {
    }
    FakeTimeProvider.prototype.getDay = function () {
        return this.fakeDay;
    };
    return FakeTimeProvider;
}());
describe('password verifier with interfaces', function () {
    test('on weekends, throws exceptions', function () {
        var stubTimeProvider = new FakeTimeProvider();
        stubTimeProvider.fakeDay = SUNDAY;
        var verifier = new password_verifier_1.PasswordVerifier([], stubTimeProvider);
        expect(function () { return verifier.verify('anything'); }).toThrow("It's the weekend!");
    });
});
