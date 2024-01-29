"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnType_1 = require("../util/returnType");
const chooseFileOperation_1 = require("../util/file/chooseFileOperation");
let express = require("express");
let router = express.Router();
let counter = 0;
module.exports = (questionFilePath, answerFilePath) => {
    const fileData = (0, chooseFileOperation_1.getFullMapping)(questionFilePath, answerFilePath);
    const len = fileData !== null ? fileData.length : 0;
    router.get("/getQuestion/:action", (req, resp) => {
        let action = req.params.action;
        if (action === "next" && counter < len - 1) {
            counter++;
        }
        else if (action === "prev" && counter > 0) {
            counter--;
        }
        let data = fileData !== null ? fileData[counter] : null;
        if (data !== undefined) {
            let coder = counter === len - 1
                ? returnType_1.ReturnCode.NO_NEXT : counter === 0
                ? returnType_1.ReturnCode.NO_PREV :
                returnType_1.ReturnCode.OK;
            resp.send((0, returnType_1.getReturnType)(coder, {
                id: counter + 1,
                data: data
            }));
        }
        else {
            resp.send((0, returnType_1.getReturnType)(returnType_1.ReturnCode.NULL, null));
        }
    });
    //简单测试
    router.get("/", (req, resp) => {
        resp.setHeader("Content-Type", "text/html");
        let data = (0, chooseFileOperation_1.readFile)("views/index.html", true);
        resp.end(data);
    });
    return router;
};
//# sourceMappingURL=displayController.js.map