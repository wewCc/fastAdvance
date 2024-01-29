import {reg} from "../RegxPatternBuild";
import {questionFormat} from "./choosefileTypeDefine";
import {buildMapValueFormat, isFileDataValid, isMapEmpty} from "./choosefileUtil";

let fs = require("fs")
type regxIterable = IterableIterator<RegExpMatchArray>
/**
 *
 * @param path 文件路径
 * @param spec 特殊情况
 */
const readFile = (path: string, spec: boolean = false): string => {
    let arr = path.split(".")
    let suffix = arr[arr.length - 1]
    if (suffix !== "txt" && !spec) {
        return ""
    }
    return fs.readFileSync(path, "utf-8")
}
/***
 * 获取所有选择题问题
 * @param fileData 文件数据
 */
const getQuestionIterable = (fileData: string): regxIterable => {
    return fileData.matchAll(reg.question)
}
/***
 * 获取所有选择题选项
 * @param fileData
 */
const getChooseIterable = (fileData: string): regxIterable => {
    return fileData.matchAll(reg.choose)
}

/***
 * 建立映射
 * @param question 问题数组
 * @param choose  选择数组
 */
const mergeIterable = (question: regxIterable, choose: regxIterable): Map<string, questionFormat> => {
    let map: Map<string, questionFormat> = new Map()
    let questionIterable = question.next()
    let chooseIterable = choose.next()
    if (questionIterable.value === undefined || chooseIterable.value === undefined) {
        console.log("传入文件格式有误")
        return map;
    }
    while (!(questionIterable.done && chooseIterable.done)) {
        map.set(questionIterable.value[0],
            buildMapValueFormat(questionIterable.value[0], chooseIterable.value[0]
            )
        )
        questionIterable = question.next()
        chooseIterable = choose.next()
    }
    return map
}
/***
 *  选择题答案构建
 * @param filePath 答案文件
 * @param map 之前构建的map
 */
const buildChooseMapWithAnswer = (filePath: string, map: Map<string, questionFormat>)
    : questionFormat[] => {
    let res: questionFormat[] = []
    if (isMapEmpty(map)) {
        console.log("答案构建失败,原因==>先前题目构建出现问题")
        return res;
    }
    let fileData: string = Array(readFile(filePath))[0]
    fileData = fileData.replace(/[\n\r]/g, "")
    let handlerArray: string[] = fileData.split("")
    map.forEach(((value, key) => {
        value.answer = (handlerArray.shift() + "").trim()
        res.push(value)
    }))
    return res
}
/***
 * 返回组合后的函数
 * @param path
 */
const getQuestionMapping = (path: string): Map<string, questionFormat> => {
    let fileData = readFile(path)
    return mergeIterable(getQuestionIterable(fileData), getChooseIterable(fileData))
}
/**
 * 用户调用的最外层的方法,直接构建完成所有选择题需要内容
 * @param questionPath 问题文件路径
 * @param answerPath 答案文件路径
 */
const getFullMapping = (questionPath: string, answerPath: string): questionFormat[] | null => {
    //如果文件条件不符合,直接返回null
    if (isFileDataValid(questionPath) && isFileDataValid(answerPath)) {
        console.log("不符合文件格式")
        return null
    }
    let data = getQuestionMapping(questionPath)
    return buildChooseMapWithAnswer(answerPath, data)
}
export {
    getFullMapping,
    readFile
}