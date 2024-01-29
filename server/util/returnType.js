"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnCode = exports.getReturnType = void 0;
var ReturnCode;
(function (ReturnCode) {
    ReturnCode[ReturnCode["OK"] = 200] = "OK";
    ReturnCode[ReturnCode["NULL"] = 1001] = "NULL";
    ReturnCode[ReturnCode["NO_NEXT"] = 611] = "NO_NEXT";
    ReturnCode[ReturnCode["NO_PREV"] = 612] = "NO_PREV";
})(ReturnCode || (exports.ReturnCode = ReturnCode = {}));
const getReturnType = (code, data, msg = "") => {
    return {
        code: code,
        data: data,
        msg: msg
    };
};
exports.getReturnType = getReturnType;
//# sourceMappingURL=returnType.js.map