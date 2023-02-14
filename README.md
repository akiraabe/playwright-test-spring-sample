# Playwright test SpringBoot sample

## このプロジェクトについて
このプロジェクトはPlaywrightを用いてWebアプリケーションをテストするサンプルです。

テスト対象のWebアプリケーションはSpringBootを用いたもので、導入や起動の仕方は以下のFintanのガイドを参照ください。
[Spring Frameworkを利用する実プロジェクトで活用できる設計・開発標準](https://fintan.jp/page/5311/)

## Playwrightのインストール方法
このプロジェクトは、VSCodeのエクステンションを用いてPlaywrightをインストールしています。
手順は、以下のサイトを参照ください。
[Getting started - VS Code](https://playwright.dev/docs/getting-started-vscode)

## テストの実行方法
Playwrightのテストは、以下のコマンドで実行できます。
（インストールで生成されるexample.spec.tsはskipされるように設定しています。）
```
npx playwright test
```
テスト対象のファイルを指定することもできます。
```
npx playwright test tests/FintanSpringSample.spec.ts
```


または、VSCodeのエクステンション機能を用いて、テストを実行することもできます。
（最初に使う場合には、この方法が分かりやすいと思います。）
実行方法は、前述の[Getting started - VS Code](https://playwright.dev/docs/getting-started-vscode)を参照ください。
