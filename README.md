# Review of Creative Practice and Technology

**Interviews across Art, Design, and Games**

テクノロジーと表現が接続する現場を、当事者へのインタビューとして記録し続ける一般公開のアーカイブ誌。発行: [Entangled Press](https://github.com/entangled-press)。

## この誌について

技術と表現のあいだには、教育・展示・制度の現場で日々実践が生まれているのに、記録されず、引用できる形で残らないまま消えていく知が多くあります。本誌はその知を、キュレーター、アーティスト、エンジニア、研究者、ゲーム開発者へのインタビューとして構成・編集し、出典を示して参照できる形で蓄積します。

**GitHubリポジトリを掲載承諾済み原稿の正本**とし、Webサイトはそれを読むためのビューワーです。

## 構成

```
content/interviews/   記事の正本（Markdown + メタデータ）。三桁の通し番号で刻む
src/                  Webビューワー（Astro）
EDITORIAL.md          編集フロー・許諾・公開後の対応方針
```

## 引用について

記事の出典は、次の形式で記載できます。

> 話し手名, 「記事タイトル」 *Review of Creative Practice and Technology* #001, Entangled Press, 2026. URL

## インタビューデータの取り扱い

録音・文字起こし等の生データはこのリポジトリに含まれません。掲載されるのは、話し手本人が構成原稿を確認し、公開を許諾した記事のみです。詳細は [EDITORIAL.md](EDITORIAL.md)。

## License

[掲載コンテンツとソースコードの利用方針](LICENSE.md)をご確認ください。掲載許諾と第三者の再利用許諾を区別し、掲載コンテンツにはCC等の包括的ライセンスを付与しません。

---

## English

*Review of Creative Practice and Technology* is an open, ongoing archive of interviews documenting where technology and creative expression meet — across art, design, and games. Published by Entangled Press. Each issue is an edited, interviewee-approved conversation, maintained in this repository as the canonical source and rendered on the web. No blanket reuse license is granted for published content. Lawful quotation and other statutory uses remain available; uses requiring permission must be discussed individually. See LICENSE.md.

## ローカル開発と検証

Node.js 22.12以降を使用します。

```sh
npm ci
npm test
npm run build
npm run dev
```

一覧と記事ページは、`status: published`、`consent: confirmed`、`published` 日付のある記事だけを出力します。これは公開条件の検査であり、実際の承諾を検証する認証・管理機能ではありません。公開前に非公開の承諾記録と原稿の版・媒体・条件を照合してください。下書きを公開Gitに保存してよいという意味でもありません。

現状はAstroの公開サイトです。原稿確認・承諾管理画面、版変更時の自動失効、メール送信、電子署名は未実装です。問い合わせ先、正式な掲載条件、ソースコードのライセンスは未決定です。問い合わせ先を設定してから公開してください。

mainへのpushでGitHub Pagesに自動デプロイされます。変更の検討・ローカル検証と本番公開を区別してください。
