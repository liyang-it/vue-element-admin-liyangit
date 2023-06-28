日本語 | [English](./README.md) | [简体中文](./README.zh-CN.md) | [Spanish](./README.es.md)

## 概要

**vue-element-admin-liyangit**は、vue-element-adminに基づいているバックエンド管理フロントエンドフレームワークです。これは、[vue-element-admin](https://panjiachen.github.io/vue-element-admin)に基づいていて、何の機能も変更していません。元のプロジェクトの基本スタイルを変更しただけです。バックエンドの動的なメニュー権限ケースソリューション、PWAアプリケーションサポート、機能コードコメントの説明、不要な機能を削除して、あなたが**vue2*のみをサポートしていて、vue-element-adminをすぐに手に入れることができます。

* 元のプロジェクトの基本スタイルを修正
* バックエンドおよびバックエンドの動的メニュー権限ケースソリューション
* PWAアプリケーションのサポート
* 機能コードのコメントの説明
* 無駄なエネルギーを削除しました
* ビッグデータ表プラグイン

## プレビュー
- [オンラインプレビュー](https://liyang-it.github.io/vue-admin-page)

- [vue-element-admin 公式ドキュメント](https://github.com/PanJiaChen/vue-element-admin)
  
## Getting started

```bash
# clone the project
git clone -b i18n git@github.com:PanJiaChen/vue-element-admin.git

# enter the project directory
cd vue-element-admin

# install dependency
npm install

# develop
npm run dev
```

http://localhost:9527 が自動的に開きます。

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
