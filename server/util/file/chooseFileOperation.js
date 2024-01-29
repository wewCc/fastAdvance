"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.getFullMapping = void 0;
const RegxPatternBuild_1 = require("../RegxPatternBuild");
const choosefileUtil_1 = require("./choosefileUtil");
let fs = require("fs");
/**
 *
 * @param path 文件路径
 * @param spec 特殊情况
 */
const readFile = (path, spec = false) => {
    let arr = path.split(".");
    let suffix = arr[arr.length - 1];
    if (suffix !== "txt" && !spec) {
        return "";
    }
    return fs.readFileSync(path, "utf-8");
};
exports.readFile = readFile;
/***
 * 获取所有选择题问题
 * @param fileData 文件数据
 */
const getQuestionIterable = (fileData) => {
    return fileData.matchAll(RegxPatternBuild_1.reg.question);
};
/***
 * 获取所有选择题选项
 * @param fileData
 */
const getChooseIterable = (fileData) => {
    return fileData.matchAll(RegxPatternBuild_1.reg.choose);
};
/***
 * 建立映射
 * @param question 问题数组
 * @param choose  选择数组
 */
const mergeIterable = (question, choose) => {
    let map = new Map();
    let questionIterable = question.next();
    let chooseIterable = choose.next();
    if (questionIterable.value === undefined || chooseIterable.value === undefined) {
        console.log("传入文件格式有误");
        return map;
    }
    while (!(questionIterable.done && chooseIterable.done)) {
        map.set(questionIterable.value[0], (0, choosefileUtil_1.buildMapValueFormat)(questionIterable.value[0], chooseIterable.value[0]));
        questionIterable = question.next();
        chooseIterable = choose.next();
    }
    return map;
};
/***
 *  选择题答案构建
 * @param filePath 答案文件
 * @param map 之前构建的map
 */
const buildChooseMapWithAnswer = (filePath, map) => {
    let res = [];
    if ((0, choosefileUtil_1.isMapEmpty)(map)) {
        console.log("答案构建失败,原因==>先前题目构建出现问题");
        return res;
    }
    let fileData = Array(readFile(filePath))[0];
    fileData = fileData.replace(/[\n\r]/g, "");
    let handlerArray = fileData.split("");
    map.forEach(((value, key) => {
        value.answer = (handlerArray.shift() + "").trim();
        res.push(value);
    }));
    return res;
};
/***
 * 返回组合后的函数
 * @param path
 */
const getQuestionMapping = (path) => {
    let fileData = readFile(path);
    return mergeIterable(getQuestionIterable(fileData), getChooseIterable(fileData));
};
/**
 * 用户调用的最外层的方法,直接构建完成所有选择题需要内容
 * @param questionPath 问题文件路径
 * @param answerPath 答案文件路径
 */
const getFullMapping = (questionPath, answerPath) => {
    //如果文件条件不符合,直接返回null
    if ((0, choosefileUtil_1.isFileDataValid)(questionPath) && (0, choosefileUtil_1.isFileDataValid)(answerPath)) {
        console.log("不符合文件格式");
        return null;
    }
    let data = getQuestionMapping(questionPath);
    return buildChooseMapWithAnswer(answerPath, data);
};
exports.getFullMapping = getFullMapping;
//# sourceMappingURL=chooseFileOperation.js.map