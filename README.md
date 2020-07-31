## Prerequisites

- node >= 6.0.0
- npm >= 3.0.0


## 更新日志
### v1.2.5
1. 增加DllPlugin优化构建速度,编译速度更快 yarn startdll
2. 增加build版本控制
3. 增加 刷新浏览器会保持继续显示当前组件,不会使系统跳转到首页
### v1.2.1
1. 升级webpack 4.0, 做了一些性能优化,编译时间从13秒优化到2-3秒,速度最高提升90%(第一次启动时间是正常时间,启动后Ctrl+c 关闭项目重新启动速度会变快)
2. 封装了axios 请求
3. 增加了一些全局公共方法/utils/global,和一些工具函数/utils/index,封装了表单验证/utils/rules
4. 项目结构做了一些调整
5. 重做了404页面
6. 修复了几个小bug
7. 增加build打包结果分析 yarn analyz

qhwb-admin是基于vue2.0全家桶 + element-ui 开发的一个后台模板，实现了无限级菜单，页面、按钮级别的权限管理，为了减少前后端的沟通成本，页面、按钮级别的权限验证和动态路由表的存储校验，也都由前端完成，这样前端新建页面或者删除页面都不需要告诉后台去增加删除路由表

## 2. 准备工作
-开发环境
- node.js v8.0+
- webpack v3
- git

-技术栈
- ES6+
- vue v2.5+
- vue-router
- vuex
- axios
- scss
- element-ui v2.4+

## 3. 实现功能
```
- 登录、退出
+ 基于token
	- 状态拦截、404页面
	- 动态加载路由
	- 页面、按钮指令权限管理
	- 无限级菜单
- 封装vue-i18n@8.x国际化组件
- 系统全屏化
- 菜单收缩
- icon 图标
+ tab标签导航
	- 右击快捷功能
- 表格拖拽排序
- 封装了 axios
- 封装了全局方法,和一些工具函数
- 编辑器
	- markdown（编辑器目前只封装了这一个组件，重写了markdown编辑和预览的皮肤，实时获取：markdown，html，json 三种格式文本）
- Echarts 组件封装

封装了一些element-ui没有但是常用的组件，正常需要的功能element-ui里面都有，可以直接复制

```
## 4.开发使用
### 4.1开发
```
# 克隆项目
git clone http://git.yfkjqh.com:3000/liaozhiliang/qhwb_admin.git

# 推荐使用 yarn, 安装依赖基本上一次过,npm 经常会卡在node-sass,如果npm安装node-sass 失败,单独多安装几次应该就可以了: npm i node-sass -D

# 设置淘宝镜像
yarn config set registry https://registry.npm.taobao.org/
or
npm config set registry https://registry.npm.taobao.org

# 安装依赖 (如果安装失败就多安装几次，实在不行就换淘宝镜像)
yarn  or  yarn install
or
npm install

# 启动项目 (已经配置好启动服务自动打开浏览器，如果没自动打开按照控制台输出的地址自己打开)
# 如果eslint语法检查报错，直接关掉eslint语法检查
yarn dev
or
npm run dev

# 启动单元测试
yarn  unit
or
npm run unit

# 启动端到端测试
yarn e2e
or
 npm run e2e

# 启动编译打包 生产环境
yarn build
or
 npm run build

# 启动编译打包 并生成打包结果 生产环境
yarn analyz
or
npm run analyz

# 抽取分离公共依赖
yarn startdll
or
npm run startdll
```


## 5. 项目结构说明
```
|------------build          构建脚本目录

    |---------build.js             生产环境构建脚本

    |---------check-version.js 检查node、npm等版本

    |---------dev-client.js     开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新

    |---------dev-server.js     运行本地开发服务器

    |---------utils.js               构建相关工具方法

    |---------vebpack.base.conf.js     webpack基本配置

    |---------vebpack.dev.conf.js       webpack开发环境配置

    |---------vebpack.prod.conf.js     webpack生产环境配置   

|------------config           项目配置

    |---------dev.env.js           开发环境变量

    |---------index.js              项目配置文件

    |---------prod.env.js         生产环境变量

|------------dist             使用生产环境配置构建项目，构建好的目录放到该目录

|------------node_modules         node的依赖包

|------------src
    |---------api                 封装了 axios

    |---------assets                 资源目录，这里的资源会被webpack构建

    |---------components        		组件目录

    |---------directive        		    自定义指令

    |---------i18n					        多语言国际化

    |---------router

    |-----------index.js               前端路由

    |---------utils					全局方法和工具函数

    |---------views					页面文件

    |---------vuex					全局状态管理目录

    |--------App.vue                	根组件

    |--------main.js                 入口js文件

    |--------markData.js                 markdown 初始数据

|------------static             纯静态资源，不会被webpack构建

|------------index.html         入口页面

|------------test        		单元测试

|------------.babelrc            ES6语法编译配置

|-----------.editorconfig      	定义代码格式

|-----------.gitignore         	git 上传需要忽略的文件

|-----------package.json       项目基本信息

---------------------
```
## 结语
如果这个框架对你有帮助的话，请给个星点个star