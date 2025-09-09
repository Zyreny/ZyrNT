<img src="assets/logo/logo.svg" alt="Zyreny Logo" width="300" />

# ZyrNT - 自訂義新分頁

ZyrNT 是一個簡單且美觀的新分頁擴充功能，提供自訂義的新分頁，將來會推出更多功能始自定義能更加完善。

## 特色功能

✨ **視覺設計**

-   精美的背景圖片支持
-   可自訂主題色彩
-   響應式設計，適配各種螢幕尺寸

🔍 **搜尋功能**

-   簡潔的搜尋欄設計
-   直觀的搜尋圖標

⚙️ **個人化設置**

-   可調整主題色彩
-   支持背景圖片開關
-   可上傳自訂背景圖片
-   背景顏色自訂選項

## 快速開始

### 1. **下載專案**

-   #### Git：
    ```bash
    git clone https://github.com/Zyreny/ZyrNT.git
    cd ZyrNT
    ```
-   #### 下載已打包檔案：
    1. 到下方**發行版本**區塊找到你要的版本
    2. 前往該版本頁面下載檔案（zip, crx）

### 2. **本地預覽**

-   #### 直接在瀏覽器中開啟 `index.html`
-   #### 使用本地伺服器：

    ```bash
    # 使用 Python (如果已安裝)
    python3 -m http.server 8000

    # 使用 Node.js (如果已安裝)
    npx serve .
    ```

### 3. **擴展安裝**

-   #### 自行安裝（以 Chrome 為例）：
    -   **透過 Git clone 下載專案：**
        1. [前往擴充管理頁面](chrome://extensions/)
        2. 開啟頁面右上角的「開發人員模式 (Developer mode)」。
        3. 點擊左上角的「載入未封裝擴充項目」
        4. 選擇此專案資料夾 `ZyrNT`
    -   **透過 ZIP 下載專案：**
        1. 解壓縮 ZIP 檔案
        2. 同上方步驟
    -   **透過 CRX 下載專案：**
        1. 下載 CRX 檔案
        2. 將 CRX 檔案拖曳至 [擴充管理頁面](chrome://extensions/)
-   #### Chrome 擴充功能商店安裝（目前在審查中）

## 發行版本

點擊版本號前往對應版本頁面
| 版本號                                                        | 類型   | 發行日期   | 備註     |
| ------------------------------------------------------------- | ------ | ---------- | -------- |
| [v1.1.0](https://github.com/Zyreny/ZyrNT/releases/tag/v1.1.0) | 正式版 | 2025/09/09 | 推薦版本 |
| [v1.0.0](https://github.com/Zyreny/ZyrNT/releases/tag/v1.0.0) | 正式版 | 2025/09/07 |          |

## 檔案結構

```
ZyrNT/
├── index.html           # 主頁面
├── style.css            # 樣式表
├── script.js            # JavaScript 功能
├── icon.svg             # 頁面圖標
├── favicon.ico          # 頁面圖標
├── apple-touch-icon.png # 頁面圖標
├── icons/               # 擴充功能圖標
│   ├── icon16.png       # 16x16 圖標
│   ├── icon48.png       # 48x48 圖標
│   └── icon128.png      # 128x128 圖標
├── assets/
│   ├── bg/
│   │   └── default.webp # 預設背景圖片
│   └── logo/
│       └── logo.svg     # Logo 圖標
├── LICENSE              # 授權條款
├── README.md            # 說明文件
└── manifest.json        # 擴充功能設定
```

## 使用方式

### 設置面板

點擊右上角的齒輪圖標打開設置面板，您可以：

-   **調整主題色**：選擇您喜愛的主題顏色
-   **背景設定**：開啟或關閉背景圖片
-   **上傳背景**：使用您自己的圖片作為背景
-   **背景顏色**：當關閉背景圖片時的純色背景

### 搜尋功能

在搜尋欄中輸入關鍵字即可進行搜尋，並使用 Google 搜尋引擎顯示搜尋結果。

## 開發

### 技術棧

-   **HTML5** - 頁面結構
-   **CSS3** - 樣式與動畫
-   **Vanilla JavaScript** - 互動功能
-   **Google Fonts** - 中文字體支援

### 自訂與擴展

歡迎 Fork 這個專案並進行自訂：

1. 修改 `style.css` 調整視覺樣式
2. 編輯 `script.js` 添加新功能
3. 替換 `assets/` 中的資源文件
4. 調整 `index.html` 的頁面結構

## 貢獻

歡迎提交 Issue 和 Pull Request！

1. Fork 這個專案
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 文件。

## 聯繫

作者：Zyreny\
網站：<https://zyreny.com/>\
專案連結：<https://github.com/Zyreny/ZyrNT>
