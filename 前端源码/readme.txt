 概览
该项目为基于课程教学数据的实时内容推荐和个性化智能问答系统，此目录为前端代码部分。

 目录结构
│  jsconfig.json
│  package-lock.json
│  package.json
│  vite-plugin-copy.d.ts
│  vite.config.js
├─dist
│  ├─assets
│  ├─background
│  ├─content
│  ├─contentPage
│  ├─icons
│  ├─js
│  └─popup
├─mock
├─public
└─src
    ├─assets
    ├─background
    ├─content
    │  └─components
    ├─contentPage
    │  ├─api
    │  ├─assets
    │  │  ├─icons
    │  │  └─images
    │  ├─components
    │  │  └─SvgIcon
    │  ├─router
    │  ├─store
    │  │  └─modules
    │  ├─styles
    │  └─views
    │      ├─chat
    │      ├─login
    │      ├─practice
    │      ├─sidebar
    │      └─video
    ├─icons
    └─popup
        ├─components
        └─store

 dist
这个目录用于存放构建后的文件，通常是压缩和优化后的JavaScript、CSS和其他资源文件，用于生产环境。

 mock
此文件夹用于存放模拟数据。这些数据通常用于开发和测试阶段，模拟后端API返回的数据，以便于前端独立开发。

 public
包含所有静态资源如HTML文件、图标等，这些资源将直接被Web服务器访问。

 src
源代码目录，包含项目的JavaScript、CSS和其他资源文件。是项目的核心，包含大部分的逻辑、样式和图片等。

 jsconfig.json
配置文件，用于帮助Visual Studio Code理解JavaScript项目的结构，提供代码自动完成和智能感知功能。

 package.json
定义项目中所使用的npm软件包依赖关系，包含项目的配置信息如脚本任务等。

 vite.config.js
Vite的配置文件，定义了如何构建和优化前端资源。
