# Mendako BBS

暗号化されたメッセージを投稿できる匿名掲示板（BBS）です。

## 特徴

- **暗号化**: 投稿内容は AES 暗号化され、Google スプレッドシートに安全に保管されます
- **緊急脱出機能**: Esc キーを押すと即座に Google Classroom へ移動します
- **匿名性**: 名前はセッション ID から自動生成され、タブを閉じるとリセットされます
- **PWA 対応**: スマートフォンでネイティブアプリのように利用できます
- **ページネーション**: 20 件ずつ投稿を表示し、過去ログを閲覧可能

## 技術スタック

- HTML5 / CSS3 / JavaScript (Vanilla JS)
- [CryptoJS](https://github.com/brix/crypto-js) - AES 暗号化
- Google Apps Script - バックエンド
- PWA (Progressive Web App)

## 使い方

1. `index.html` をブラウザで開く
2. メッセージを入力して「送信」ボタンをクリック
3. 投稿は自動的に暗号化されて保存されます

### ショートカット

| キー | 動作 |
|------|------|
| `Esc` | 緊急脱出（Google Classroom へ遷移） |

## セットアップ

### 1. Google Apps Script の設定

1. Google スクリプトエディタでバックエンドを作成
2. `GAS_URL` をあなたのスクリプトの URL に変更（`js/bbs.js` 内）

```javascript
const GAS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```

### 2. 暗号キーの変更（オプション）

セキュリティ向上のため、暗号化キーを変更することを推奨します。

```javascript
const KEY_PART1 = 'YOUR_KEY_PART1';
const KEY_PART2 = 'YOUR_KEY_PART2';
```

### 3. PWA アイコンの設定

`manifest.json` に記載されたアイコンファイルを準備：
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

## ファイル構成

```
mendako-bbs/
├── index.html          # メインページ
├── manifest.json       # PWA マニフェスト
├── README.md           # このファイル
└── js/
    ├── bbs.js          # 掲示板のメインロジック
    ├── sw.js           # サービスワーカー
    └── lib/
        └── crypto-js.min.js  # CryptoJS ライブラリ
```

## 注意事項

- 暗号化は施されていますが、絶対的な秘密保持を保証するものではありません
- 個人情報の投稿は避けてください
- 利用は自己責任で行ってください

## ライセンス

© Shimataiyaki

## デモ

[https://shimataiyaki.github.io/mendako-bbs/](https://shimataiyaki.github.io/mendako-bbs/)
