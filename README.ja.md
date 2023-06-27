日本語 | [English](./README.md) | [简体中文](./README.zh-CN.md) | [Spanish](./README.es.md)

## 概要

[vue-element-admin](https://panjiachen.github.io/vue-element-admin) は管理画面のフロントエンドのインタフェースで、[vue](https://github.com/vuejs/vue) と [element-ui](https://github.com/ElemeFE/element)を使っています。i18nの多言語対応、可変ルート、権限、典型的なビジネスアプリテンプレートであり、豊富なコンポーネントを提供しています。素早くビジネス用の管理画面の現型を構築に役立ちます。

- [デモページ](https://panjiachen.github.io/vue-element-admin)

- [ドキュメント](https://panjiachen.github.io/vue-element-admin-site/)

- [Gitter](https://gitter.im/vue-element-admin/discuss)

- [Donate](https://panjiachen.gitee.io/vue-element-admin-site/zh/donate)

- [Wiki](https://github.com/PanJiaChen/vue-element-admin/wiki)

- おすすめシンプルテンプレート: [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
- デスクトップバージョン: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)
- Typescriptバージョン: [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (感謝: [@Armour](https://github.com/Armour))
- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)


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