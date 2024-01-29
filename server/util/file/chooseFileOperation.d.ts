import { questionFormat } from "./choosefileTypeDefine";
/**
 *
 * @param path 文件路径
 * @param spec 特殊情况
 */
declare const readFile: (path: string, spec?: boolean) => string;
/**
 * 用户调用的最外层的方法,直接构建完成所有选择题需要内容
 * @param questionPath 问题文件路径
 * @param answerPath 答案文件路径
 */
declare const getFullMapping: (questionPath: string, answerPath: string) => questionFormat[] | null;
export { getFullMapping, readFile };
