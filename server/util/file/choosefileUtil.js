"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileDataValid = exports.isMapEmpty = exports.buildMapValueFormat = void 0;
/***
 * 构建一个映射Value结构
 * @param question 题目
 * @param choose 答案
 */
const buildMapValueFormat = (question, choose) => {
    return {
        question: question,
        choose: choose,
        answer: ""
    };
};
exports.buildMapValueFormat = buildMapValueFormat;
const isMapEmpty = (map) => {
    return map.size === 0;
};
exports.isMapEmpty = isMapEmpty;
const isFileDataValid = (msg) => {
    return msg.length === 0;
};
exports.isFileDataValid = isFileDataValid;
//# sourceMappingURL=choosefileUtil.js.map