import {questionFormat} from "./choosefileTypeDefine";

/***
 * 构建一个映射Value结构
 * @param question 题目
 * @param choose 答案
 */
const buildMapValueFormat = (question: string, choose: string): questionFormat => {
    return {
        question: question,
        choose: choose,
        answer: ""
    }
}
const isMapEmpty = (map: Map<string, questionFormat>): boolean => {
    return map.size === 0;
}
const isFileDataValid=(msg:string)=>{
    return msg.length===0
}
export {
    buildMapValueFormat,
    isMapEmpty,
    isFileDataValid
}