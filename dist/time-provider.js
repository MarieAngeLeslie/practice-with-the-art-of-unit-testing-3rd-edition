"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealTimeProvider = void 0;
var moment_1 = require("moment/moment");
var RealTimeProvider = function () {
    _this.getDay = function () { return moment_1.default.day(); };
};
exports.RealTimeProvider = RealTimeProvider;
