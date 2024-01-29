import {questionFormat} from "../util/file/choosefileTypeDefine";
import {getReturnType, ReturnCode} from "../util/returnType";
import {getFullMapping, readFile} from "../util/file/chooseFileOperation";

let express = require("express")
let router = express.Router()
let counter: number = 0
module.exports = (questionFilePath:string, answerFilePath:string) => {
    const fileData: questionFormat[] | null = getFullMapping(questionFilePath,
        answerFilePath)
    const len: number = fileData !== null ? fileData.length : 0
    router.get("/getQuestion/:action", (req: any, resp: any) => {
            let action: string = req.params.action
            if (action === "next" && counter < len - 1) {
                counter++
            } else if (action === "prev" && counter > 0) {
                counter--
            }
            let data: questionFormat | null = fileData !== null ? fileData[counter] : null
            if (data !== undefined) {
                let coder = counter === len - 1
                    ? ReturnCode.NO_NEXT : counter === 0
                        ? ReturnCode.NO_PREV :
                        ReturnCode.OK
                resp.send(getReturnType(coder, {
                    id: counter + 1,
                    data: data
                }))
            } else {
                resp.send(getReturnType(ReturnCode.NULL, null))
            }
        }
    )
//简单测试
    router.get("/", (req: any, resp: any) => {
        resp.setHeader("Content-Type", "text/html")
        let data = readFile("views/index.html", true)
        resp.end(data)
    })
    return router
}
