<<<<<<< HEAD
# meeting-app
会議録アプリ
=======
# 環境構築
dockerを使用するのが最も手早いですが、  
自分のローカルに環境を構築することもできます。

## dockerとは？
コンテナ仮想化ツールと呼ばれる。DBやWEBアプリを仮想環境上に立ち上げることができるもの。  
あらかじめ、環境をどうつくるのかをファイルに記載することで、環境構築に悩まなくて良くなる。  

簡単に理解はできないので、色々検索してみてください。  
[参考](https://www.kagoya.jp/howto/rentalserver/docker/)

## docker install
UNIXが最も面倒くさく、Macが最も簡単です。  
Windowsは、使用しているOSのエディションによっては導入できません。  

[インストール参考](https://qiita.com/n-yamanaka/items/ddb18943f5e43ca5ac2e)

## dockerを使った環境構築

```
docker-compose build  
```
で必要な環境を構築し、
  
```
./script/bootstrap
```
で前準備を行い、  

```
docker-compose up
```
で起動します。

### 引用・謝辞
ありがとうございます

[高速に開発できる Docker + Rails開発環境のテンプレートを作った](https://qiita.com/kawasin73/items/2253523be18e5afd994f)

#### docker環境コマンド例
- bundle install
```
docker-compose run --rm rails bundle
```
- devise setup
```
docker-compose run spring rails g devise:install
docker-compose run spring rails g devise:user
docker-compose run spring rake db:migrate 
```

#### dockerコマンド例
- docker-compose ps
dockerが立ち上げたコンテナの稼働状態を表示。  
state列がUpは稼働中。Exit 0は停止. 0以外は異常終了.

#### dockerのよく出るエラー
```
A server is already running. Check /app/tmp/pids/server.pid.
```
server.pidは本来サーバ起動中に存在し、落ちるとなくなる。  
なぜか、それが残留してしまったパターン。  
単純に消せば良い。
>>>>>>> template/master
