/**
 * 构建正则匹配
 */
interface RegxPattern {
    question: RegExp;
    choose: RegExp;
    answer?: string;
}
declare let reg: RegxPattern;
export { reg };
