# fastAdvance
To generate the question in the website,and just upload two files to use it

**安装:**

```bash
npm i -g fastAdvance
```

该命令用于快速生成一个刷题网站,您可以通过传入两份文件来生成该网站。

## 问题文件

```bash
1.请问java中的内容是哪一个选项()
A.sas B.sasa C.sasa D.sasasa

2.22222dasda
A.CCC B.aaa C.sddd D.sbb

3.22222dasda
A.CCC B.aaa C.sddd D.sbb
4.22222dasda
A.CCC B.aaa C.sddd D.sbb
5.22222dasda
A.CCC B.aaa C.sddd D.sbb

```



## 答案文件

两种写法都可以

```bash
ABCBDBSAHSAHSAHSA
SA
A
ASASAS
A
```

## 命令主要格式如下

```bash
root> fastAdvance --help
Usage: start [options]

该工具可以快速生成一个网站,根据输入的题目和答案文件,生成答题,快速复习

Options:
  -V, --version                      output the version number
  -p, --port <number>                port number
  -qf --questionFile <questionFile>  选择题问题文件
  -af --answerFile <answerFile>      答案文件
  -h, --help                         display help for command
```

这里注意,问题文件和答案文件必须同时传入,否则就会出现问题

#### 具体调用案例

```bash
fastAdvance -qf D:\test.txt -af D:\test2.txt

```

运行后会提示出网站地址,直接访问即可

### 端口冲突

当出现了端口冲突问题,您可以通过**-p**指定端口