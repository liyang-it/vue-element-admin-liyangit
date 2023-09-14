## 该项目是 Tauri + Vue项目，可用于 桌面应用开发, 主要用于打包 vue-element-admin打包为 桌面应用



`src` 文件夹 是 Vue 项目源文件 (不需要关注)
`src-tauri` 是 Tauri 项目配置文件夹 ，用于配置 桌面应用的图标、名称等信息
`dist` 存放的是 (vue-element-admin)打包好的 dist 静态页面文件，用于打包 桌面应用

启动打包命令 参考: package.json 文件

`npm run dev` 启动 vue 项目
`npm run build` 编译打包 vue项目 
`npm run tauri dev` 使用桌面端启动 vue项目
`npm run tauri build` 打包vue 为桌面应用 exe



## 使用说明：

### truai 环境安装

需要安装 tauri开发环境, 请参考 [官网起步](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites)

### 安装依赖

```java
npm install
```

### 打包

将 `vue-element-admin` 打包好的 dist 里面所有文件复制到 当前目录 dist下
然后执行 `npm run tauri build` 命令, 会将 当前目录 dist的文件 打包为桌面应用

打包好的安装文件位于 : `pc\src-tauri\target\release\bundle\msi\`
