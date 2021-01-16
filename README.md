# Webpack template

シンプルなWebページを構築する想定で作成したテンプレート。

[デモ](https://ljourm.github.io/webpack-template/)

## 構成

- Node
- Webpack
  - Babel
  - Pug
  - Sass
- JavaScript
  - jQuery
- CSS
  - Bulma
- Lint
  - ESLint
  - StyleLint

## 環境構築

### 事前準備

1. Gitをインストール
1. Node.jsをインストール (バージョン: v12.20.1)
1. Yarnをインストール (npmでもよいが、ドキュメントはYarnで記載するため、適宜変更すること)

### 開発サーバの開始

```
$ git clone https://github.com/ljourm/webpack-template.git
$ cd webpack-template
$ yarn install
$ yarn serve
# localhost:8080が自動的にブラウザに表示される
```
