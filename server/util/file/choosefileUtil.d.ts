import { questionFormat } from "./choosefileTypeDefine";
/***
 * 构建一个映射Value结构
 * @param question 题目
 * @param choose 答案
 */
declare const buildMapValueFormat: (question: string, choose: string) => questionFormat;
declare const isMapEmpty: (map: Map<string, questionFormat>) => boolean;
declare const isFileDataValid: (msg: string) => boolean;
export { buildMapValueFormat, isMapEmpty, isFileDataValid };
