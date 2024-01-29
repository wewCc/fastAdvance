#!/usr/bin/env node
var express = require("express");
var path = require("path");
var router = require("../server/controller/displayController");
var app = express();
// @ts-ignore
var program = require('commander').program;
var commander = require('commander');
var version = "1.0.0";
var startSever = function (questionFilePath, answerFilePath, port) {
    if (port === void 0) { port = 8080; }
    app.use(express.static(path.join(__dirname, "../server/views")));
    app.use(router(questionFilePath, answerFilePath));
    app.listen(port, function (error) {
        if (error) {
            console.error("\u7AEF\u53E3\u53D1\u751F\u51B2\u7A81,\u7AEF\u53E3\u53F7".concat(port));
        }
        else {
            console.log("\u670D\u52A1\u5668\u542F\u52A8\u6210\u529F");
            console.log("http://localhost:".concat(port, "/"));
        }
    });
};
program
    .version(version) // 设置命令行工具的版本号
    .description('该工具可以快速生成一个网站,根据输入的题目和答案文件,生成答题,快速复习');
// 定义命令
program
    //帮助菜单中隐藏该命令
    .addOption(new commander.Option('-p, --port <number>', 'port number'))
    .addOption(new commander.Option('-qf --questionFile <questionFile>', '选择题问题文件'))
    .addOption(new commander.Option('-af --answerFile <answerFile>', '答案文件'))
    .action(function (options) {
    var port = options.port, questionFile = options.questionFile, answerFile = options.answerFile;
    if (!questionFile || !answerFile) {
        console.log("\u001b[31m请传入文件路径!\u001b[0m");
        process.exit(1);
    }
    if (!port) {
        port = 8080;
    }
    startSever(questionFile, answerFile, port);
}).parse(process.argv);
