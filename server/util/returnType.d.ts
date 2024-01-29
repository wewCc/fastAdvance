interface ReturnType {
    code: number;
    data: any;
    msg: string;
}
declare enum ReturnCode {
    OK = 200,
    NULL = 1001,
    NO_NEXT = 611,
    NO_PREV = 612
}
declare const getReturnType: (code: number, data: any, msg?: string) => ReturnType;
export { getReturnType, ReturnCode };
