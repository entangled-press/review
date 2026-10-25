---
name: Review of Creative Practice and Technology
description: 技術と表現の現場を記録する日本語インタビューアーカイブ
colors:
  paper: "#0a0c0f"
  surface: "#101318"
  ink: "#fff"
  ink-soft: "#fff"
  rule: "#303236"
  accent: "#ff2e3a"
typography:
  body:
    fontFamily: "'Zen Kaku Gothic New', 'Hiragino Kaku Gothic ProN', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.95
  lead:
    fontSize: "clamp(18px, 1.7vw, 22px)"
    fontWeight: 500
    lineHeight: 1.65
  title:
    fontSize: "23px"
    fontWeight: 700
    lineHeight: 1.6
  label:
    fontSize: "13px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  xxl: "64px"
components:
  article-row:
    textColor: "{colors.ink}"
    padding: "32px 0"
  secondary-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
---

# Design System: Review of Creative Practice and Technology

## Overview

AfterImage の暗い色調と日本語組版を受け継ぐ、静かな編集ページ。大きなタイトル、余白、細い罫線で順序を示し、読み手を本文へ導く。ここに記載する値は現在の実装から抽出したもの。

**Key Characteristics:**
- 暗い紙面と、補助情報も含めた純白の文字。
- 提供されたベクターロゴと日本語ゴシックの本文。
- 罫線で区切る一覧と、装飾を抑えたリンク。

## Colors

### Primary

赤のアクセントはリンクのホバー時の下線に使う。

### Neutral

`paper` がページ背景、`ink` が本文、`ink-soft` が説明とメタデータ、`rule` が区切り線。`ink` と `ink-soft` はともに純白。補助情報はサイズと配置で区別する。`surface` は定義済みだが現状の主要面では未使用。

## Typography

英語誌名はフォントではなく提供された SVG の形状を表示する。IBM Plex Sans は読み込まない。日本語本文は Zen Kaku Gothic New。コンセプトの先頭文は中太。号数は等幅数字。本文の読みやすさは広めの行間で確保する。

## Layout

外枠の最大幅は (1120px)、左右余白は (32px)。トップの導入は (1.3fr / 1fr) の2列、列間は (48px)、上下余白は (104px / 112px)。コンセプトの最大幅は (30em)。記事本文は最大 (760px)。

画面幅 (680px) 以下で導入と記事行を1列にする。外側余白は (24px)、トップロゴは導入列幅に合わせて縦横比を保ち、導入の列間は (40px)、導入の上下余白は (56px / 64px)。フッターも縦に並ぶ。About は通常 (1fr / 1.5fr)、列間 (64px)、本文最大幅 (36em)。狭い画面では1列、列間 (24px)。

## Elevation & Depth

影は使わない。背景、1px の罫線、余白で構造を伝える。

## Shapes

角丸カードや囲い込みを使わず、水平の罫線で一覧とページの節目を示す。

## Components

- **ヘッダー:** 1行ロゴと AfterImage への戻りリンクを左右に配置する。ロゴ幅は min(48%, 360px)、狭い画面は min(60%, 320px)。
- **導入:** `assets/logo_RCPT.svg`（原寸 890.3 × 399.8）を列幅いっぱいに表示し、日本語コンセプト文と対にする。誌名を画像の代替テキストに指定する。
- **記事行:** 号数、タイトルとメタデータ、読むリンクの3列。行全体がリンク。ホバーで見出しに下線。
- **空状態:** 公開準備中の説明を通常の文字組みで表示する。
- **About:** 「表現と技術の合流地点を。」の見出しと、承認済みの日本語全文。
- **フッター:** `assets/logo_RCPT_1line.svg`（原寸 2246.5 × 154.7）と発行者、利用方針、掲載データ・ソースコードへのリンク。ロゴ幅は (320px)、狭い画面ではコンテナ内に収める。
- **ロゴ:** ヘッダーも同じ1行原図を使用。CSS `filter: brightness(0) invert(1)` で白く表示し、SVG 原本の色や形状は編集しない。
- **フォーカス:** リンクに明るい (2px) の輪郭と (6px) の離隔。本文へのスキップリンクを用意する。

## Do's and Don'ts

- **Do** 大きさ、太さ、余白と罫線で階層を作る。
- **Do** 狭い画面では文章と記事行を縦に積む。
- **Don't** 空状態を架空の記事で埋めない。
- **Don't** AfterImage の参照ファイルを変更しない。

タイトルロゴの表示幅は親幅の64%、最大352px。

フッターは中央揃え。誌名の横一列SVGをコンテンツ幅いっぱいに表示し、IPA・未踏ターゲットの提供ロゴ、発行者、関連リンクの順に縦に並べる。

罫線は表示せず、セクション間の余白で区切る。Aboutの上は96px（狭幅80px）、フッターの上は112px（狭幅88px）。リードの前半・後半は同じ文字サイズ・太さ・行間に統一する。

共通ヘッダーは表示しない。トップはタイトルロゴから始まり、共通ナビゲーションはフッターに集約する。

スクロール時は画面外の文章・ロゴが一度だけ24px下からフェードし、微かなぼかしが解ける。初期画面の内容は即時表示。動きを減らす設定・JavaScript無効・印刷時は通常表示する。

スマホ（680px以下）ではタイトル領域を100svh確保し、最初にロゴを表示。リード文は次の画面でスクロールに合わせて現れる。
