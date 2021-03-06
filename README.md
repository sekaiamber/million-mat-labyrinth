# Million Mat Labyrinth

## 项目介绍

**在线演示：[猛击进入](http://chat.isekai.me)**  
**演示操作为↑↓←→，使用回车键聊天**

最近看到一部漫画特别的好看，叫《百万畳ラビリンス》，百万畳迷宫。于是乎就结合自己写的前后端框架，想做点有意思的项目。这个项目基本上就是一个探索小游戏。

前后端通信使用的是自开发的项目Corona，你可以在[这儿](https://github.com/coronajs)分别找到前后端项目。Corona的目的是使得前后端JS能互相调用各自的函数，方便地修改前后端内存数据。

另外说一句，项目使用Typescript写成，各种方面还不是很成熟。不过应该是一个不错的尝试。

## 开发

安装依赖
```shell
$ cd path/to/repo
$ npm install
```

前端静态文件自动生成
```shell
$ npm run dev-client
```

咱强烈建议使用`cnpm`，因为这个项目依赖里面有`node-sass`，这个库的install会从远端拉一些文件，而这个域名十分不稳定（因为GFW），经常会出乱七八糟的岔子。

安装cnpm:
```
$ npm update
$ npm install -g cnpm
$ cnpm install
```

## 部署

前端静态文件生成，压缩，打包
```shell
$ npm run deploy-client
```

用`public_dist`目录替换`public`目录。
