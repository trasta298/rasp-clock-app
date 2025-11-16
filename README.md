# Raspberry Pi Clock

ラズパイOS上で動作する、スタイリッシュなデジタル時計アプリケーションです。

## 特徴

- 大きく見やすい時計表示（秒単位更新）
- サイバーパンク風のダークモードデザイン
- ネオンカラーのグロー効果
- アニメーション付き背景
- Chromium kioskモードに最適化

## デザイン

- フォント: **Orbitron** (未来的でユニーク) + **JetBrains Mono** (テクニカル)
- カラー: ネオンシアン、パープル、ピンクのグラデーション
- アニメーション: 背景の浮遊エフェクト、グリッドパターン、秒のパルス効果

## セットアップ

### 方法A: Docker Compose を使用（推奨）

#### 本番環境（Nginx + 永続化）

```bash
# Docker Composeでビルドして起動
docker compose up -d

# ブラウザで確認
# http://localhost:3000
```

コンテナの管理:
```bash
# ログ確認
docker compose logs -f

# 停止
docker compose down

# 再起動
docker compose restart

# コンテナの状態確認
docker compose ps
```

#### 開発環境（ホットリロード対応）

```bash
# 開発モードで起動
docker compose -f compose.dev.yaml up

# ブラウザで確認
# http://localhost:5173
```

#### カスタマイズファイルの永続化

`compose.yaml` のボリュームマウントを有効にすることで、カスタマイズしたファイルを永続化できます：

```yaml
volumes:
  - ./custom/index.html:/usr/share/nginx/html/index.html:ro
  - ./custom/assets:/usr/share/nginx/html/assets:ro
```

### 方法B: ローカル環境で実行

#### 1. 依存関係のインストール

```bash
cd rasp-clock-app
npm install
```

#### 2. 開発モードで実行

```bash
npm run dev
```

#### 3. 本番ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに生成されます。

#### 4. プレビュー

```bash
npm run preview
```

## Chromium Kioskモードでの起動

### 方法1: Docker Compose + Kioskモード（推奨）

```bash
# Docker Composeで起動
docker compose up -d

# Chromium kioskモードで開く
chromium-browser --kiosk --app=http://localhost:3000
```

### 方法2: コマンドラインから起動（開発用）

```bash
# 開発サーバーを起動（別ターミナルで）
npm run dev

# Chromium kioskモードで開く
chromium-browser --kiosk --app=http://localhost:5173
```

### 方法3: 本番ビルドを使用

```bash
# ビルド
npm run build

# ローカルサーバーを起動（別ターミナルで）
npm run preview

# Chromium kioskモードで開く
chromium-browser --kiosk --app=http://localhost:4173
```

### 方法5: 自動起動設定（ラズパイ起動時に自動実行）

#### Docker Composeを使った自動起動

1. Docker Composeをシステム起動時に開始:

```bash
# systemdサービスファイルを作成
sudo nano /etc/systemd/system/rasp-clock.service
```

2. 以下の内容を記述:

```ini
[Unit]
Description=Raspberry Pi Clock
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/pi/rasp-clock-app
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
User=pi

[Install]
WantedBy=multi-user.target
```

3. サービスを有効化:

```bash
sudo systemctl enable rasp-clock.service
sudo systemctl start rasp-clock.service
```

4. Chromiumの自動起動設定:

```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/clock.desktop
```

5. 以下の内容を記述:

```ini
[Desktop Entry]
Type=Application
Name=RaspberryPi Clock
Exec=chromium-browser --kiosk --app=http://localhost:3000
X-GNOME-Autostart-enabled=true
```

#### ローカルビルドを使った自動起動

1. デスクトップ環境の自動起動設定ファイルを作成:

```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/clock.desktop
```

2. 以下の内容を記述:

```ini
[Desktop Entry]
Type=Application
Name=RaspberryPi Clock
Exec=chromium-browser --kiosk --app=file:///home/pi/rasp-clock-app/dist/index.html
X-GNOME-Autostart-enabled=true
```

**注意**:
- パスは実際のビルドディレクトリに合わせて変更してください
- `file://` を使う場合は事前に `npm run build` を実行してください

### 方法6: Nginxを使用（より安定）

1. Nginxをインストール:

```bash
sudo apt update
sudo apt install nginx
```

2. ビルドファイルをNginxのディレクトリにコピー:

```bash
sudo cp -r dist/* /var/www/html/
```

3. Chromium kioskモードで起動:

```bash
chromium-browser --kiosk --app=http://localhost
```

## Kioskモードのオプション

```bash
chromium-browser \
  --kiosk \
  --app=http://localhost:4173 \
  --noerrdialogs \
  --disable-infobars \
  --no-first-run \
  --disable-session-crashed-bubble \
  --disable-features=TranslateUI
```

- `--kiosk`: フルスクリーンモード
- `--noerrdialogs`: エラーダイアログを表示しない
- `--disable-infobars`: 情報バーを無効化
- `--no-first-run`: 初回起動メッセージを表示しない

## カスタマイズ

### カラーの変更

`tailwind.config.js` でカラーをカスタマイズできます:

```javascript
colors: {
  'cyber-dark': '#0a0e27',
  'cyber-darker': '#050714',
  'neon-cyan': '#00fff5',
  'neon-purple': '#b026ff',
  'neon-pink': '#ff2e97',
}
```

### フォントの変更

`index.html` と `tailwind.config.js` のフォント設定を変更してください。

## 技術スタック

- Vite
- React
- Tailwind CSS
- Google Fonts (Orbitron, JetBrains Mono)
- Docker / Docker Compose
- Nginx (Alpine)

## Docker環境での詳細設定

### ポート番号の変更

`compose.yaml` のポート設定を変更:

```yaml
ports:
  - "3000:80"  # 左側を任意のポートに変更
```

### タイムゾーンの変更

```yaml
environment:
  - TZ=Asia/Tokyo  # 任意のタイムゾーンに変更
```

### ログの永続化

Nginxのログは自動的に `nginx-logs` ボリュームに保存されます：

```bash
# ログボリュームの確認
docker volume inspect rasp-clock-app_nginx-logs

# ログの確認
docker compose logs clock
```

## トラブルシューティング

### Docker環境

#### コンテナが起動しない場合

```bash
# ログを確認
docker compose logs

# コンテナの状態を確認
docker compose ps

# イメージを再ビルド
docker compose build --no-cache
docker compose up -d
```

#### ポートが使用中の場合

```bash
# ポート3000を使用しているプロセスを確認
sudo lsof -i :3000

# または compose.yaml のポート番号を変更
```

### ローカル環境

#### 画面が表示されない場合

1. 開発サーバーが起動しているか確認
2. ポート番号が正しいか確認（デフォルト: 5173）
3. ファイアウォール設定を確認

#### フォントが表示されない場合

インターネット接続を確認してください（Google Fontsを使用しています）。

オフライン環境の場合は、フォントをローカルにダウンロードして `public` ディレクトリに配置してください。

### ヘルスチェック

```bash
# Docker環境のヘルスチェック
curl http://localhost:3000/health

# コンテナのヘルス状態を確認
docker inspect --format='{{.State.Health.Status}}' rasp-clock
```

## ライセンス

MIT
