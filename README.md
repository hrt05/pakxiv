# pakxiv

## Description

私の技術不足のなかで<u>やってみたい技術、憧れのサイトを模様</u>して技術を付けようということで作成しました。<br>
起動の手順は以下に記入しております。

## 仕様技術

React, Next.js, TypeScript, NextAuth, charcoal(UIライブラリ)

## 起動手順

###パッケージのインストール
`npm i`

###envの設定

`NEXTAUTH_URL = http://localhost:3000`
`NEXTAUTH_SECRET = `
`NEXTAUTH_JWT_SECRET = `
`DATABASE_URL=`

###prismaのマイグレート
`npx prisma migrate dev`

###prismaの生成
`prisma genetate`

###起動
`npm run dev`
