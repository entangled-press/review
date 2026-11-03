# 検索向けの設定と運用

## 実装済み

- 各ページの正規URLと説明文、OGP画像。
- トップのWebSite構造化データ。記事には公開日・話し手を含むArticle構造化データ。
- `/review/sitemap.xml`。一覧・記事と同じ公開判定を使い、承諾待ちや下書きは含めません。
- 検索用の本文は静的HTMLとして出力します。

## 公開後にSearch Consoleで行うこと

1. URLプレフィックス `https://entangled-press.github.io/review/` を追加します。
2. Googleから指定されたHTML確認ファイルを `public/` に置いて公開し、所有権を確認します。確認コードは発行されたものを使います。
3. `https://entangled-press.github.io/review/sitemap.xml` をサイトマップとして送信します。
4. トップをURL検査し、公開URLのテスト後にインデックス登録をリクエストします。
5. 記事を公開したら、その記事URLを確認します。インデックス未登録の場合はSearch Consoleに表示される理由を調べます。

robots.txtはホスト直下の `/robots.txt` だけが有効です。このプロジェクトで `/review/robots.txt` を作っても検索制御には使われないため、追加していません。現在のホスト直下は404です。独自ドメインに移行する場合は、Astroのsite・base、サイトマップ、正規URLとSearch Consoleの登録先を更新します。

Search Consoleへのログイン・所有権確認・サイトマップ送信は未実施です。検索で見つからない理由や登録状況は、site検索だけでは確定できません。設定を追加しても掲載時期や順位は保証されません。
