简体中文 | [English](./README.md) | [日本語](./README.ja.md) | [Spanish](./README.es.md)

## 简介

 **vue-element-admin-liyangit** 是一个后台管理前端框架，它基于 [vue-element-admin](https://panjiachen.github.io/vue-element-admin)  并没有修改任何功能，只是修改了 原项目的基础样式、以及 前后端动态菜单权限案例解决方案，PWA应用支持、功能代码注释讲解、删除了无用功能，能让您快速上手 **vue-element-admin** ，仅支持 **vue2.X**

 * 修改原项目的基础样式
 * 前后端动态菜单权限案例解决方案
 * PWA应用支持
 * 功能代码注释讲解
 * 删除了无用功能
 * 大数据表格插件

## 预览
- [在线预览](https://liyang-it.github.io/vue-admin-page)

- [vue-element-admin 官方文档](https://github.com/PanJiaChen/vue-element-admin) 

- [vue-element-admin 官方文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/) （方便没翻墙的用户查看）


## 开发

```bash
# 克隆项目
git clone -b i18n git@github.com:PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
