# 個人製作

## Description

私の技術不足のなかで<u>やってみたい技術、憧れのサイトを模様</u>して技術を付けようということで作成しました。<br>
起動の手順は以下に記入しております。

## 仕様技術

React, Next.js, TypeScript, NextAuth, charcoal(UIライブラリ), CSS Module

## 起動手順

### パッケージのインストール

`npm i`

### envの設定

`NEXTAUTH_URL = http://localhost:3000`<br/>
`NEXTAUTH_SECRET = `<br/>
`NEXTAUTH_JWT_SECRET = `<br/>
`DATABASE_URL=`<br/>

### s3のバケットネーム変更してます（多少のリスクを防ぐために）
`バケットネーム　→　s3の設定したバケットネームで。`

### prismaのマイグレート

`npx prisma migrate dev`

### prismaの生成

`npx prisma generate`

### 起動

`npm run dev`
