"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordVerifier = void 0;
var SUNDAY = 0, SATURDAY = 1;
var PasswordVerifier = /** @class */ (function () {
    function PasswordVerifier(rules, timeProvider) {
        this._timeProvider = timeProvider;
    }
    PasswordVerifier.prototype.verify = function (input) {
        var _this = this;
        var isWeekened = [SUNDAY, SATURDAY]
            .filter(function (x) { return x === _this._timeProvider.getDay(); })
            .length > 0;
        if (isWeekened) {
            throw new Error("It's the weekend!");
        }
        return [];
    };
    return PasswordVerifier;
}());
exports.PasswordVerifier = PasswordVerifier;
