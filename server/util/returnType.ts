interface ReturnType {
    code: number,
    data: any,
    msg: string
}

enum ReturnCode {
    OK = 200,
    NULL = 1001,
    NO_NEXT = 611,
    NO_PREV = 612,
}

const getReturnType = (code: number, data: any, msg: string = ""): ReturnType => {
    return {
        code: code,
        data: data,
        msg: msg
    }
}
export {
    getReturnType,
    ReturnCode
}