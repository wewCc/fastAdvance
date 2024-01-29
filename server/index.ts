const express = require("express")
const path = require("path")
const router = require("./controller/displayController")
let app = express()
// @ts-ignore
const {program, Option} = require('commander');
let version = "1.0.0"


const startSever = (questionFilePath: string, answerFilePath: string, port: number = 8080) => {
    app.use(express.static(path.join(__dirname, "views")))
    app.use(router(questionFilePath, answerFilePath))

    app.listen(port, (error: Error) => {
        if (error) {
            console.error(`端口发生冲突,端口号${port}`)
        } else {
            console.log(`服务器启动成功`)
            console.log(`http://localhost:${port}/`)
        }
    })
}
program
    .version(version) // 设置命令行工具的版本号
    .description('该工具可以快速生成一个网站,根据输入的题目和答案文件,生成答题,快速复习');

// 定义命令
program
    //帮助菜单中隐藏该命令
    .addOption(new Option('-p, --port <number>', 'port number'))
    .addOption(new Option('-qf --questionFile <questionFile>', '选择题问题文件'))
    .addOption(new Option('-af --answerFile <answerFile>', '答案文件'))
    .action((options: any) => {
        let {port, questionFile, answerFile} = options
        if (!questionFile || !answerFile) {
            console.log("\u001b[31m请传入文件路径!\u001b[0m")
            process.exit(1);
        }
        if (!port) {
            port = 8080
        }
        startSever(questionFile, answerFile, port)
    }).parse(process.argv)
