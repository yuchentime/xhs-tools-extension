## 项目引用
本项目基于 [Chrome Extension (MV3) Boilerplate with React 18 and Webpack 5](https://github.com/lxieyang/chrome-extension-boilerplate-react) 进行开发。感谢 [lxieyang](https://github.com/lxieyang) 提供的优秀模板。

## 分支说明
我通常基于xhs-tools分支开发，有随写随提交的恶习，必然存在诸多bug。只有在确认没有什么问题后，我才会将代码合并到main分支。

## 免责声明
本项目仅供个人学习使用，请勿用于商业用途。<br/>
另外，本项目未做严格的反检测手段，不适用大批量、高频次的使用场景，仅供娱乐。

## 安装
首先在浏览器地址栏键入：`chrome://extensions/`，打开本地扩展插件管理界面，开启“开发者模式”
### 方式 1（不推荐，我懒）
下载页面右侧我打包好的xhs-tools-1.1.0.zip文件，解压缩到xhs-tools-1.1.0/，然后将该目录拖到扩展插件管理界面
### 方式 2（推荐）
1. 在项目的主目录中执行：`npm run build`
3. 将打包生成的build/目录拖拽进去

## 使用说明
**采集评论** <br/>
进入要采集的小红书笔记详情页面，点击图标弹窗，点击执行按钮便会开始自动采集任务，采集完成或主动停止后，会自动导出csv文件

**后续更新**<br/>
随缘，做什么视具体业务而定，欢迎在Issues中提交你的想法
