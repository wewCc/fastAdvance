/**
 * 构建正则匹配
 */
interface RegxPattern {
    question: RegExp,
    choose: RegExp,
    answer?: string
}

let reg: RegxPattern = {
    choose: /^[a-zA-Z].*$/gm,
    question: /^[0-9].*$/gm
}
export {
    reg
}