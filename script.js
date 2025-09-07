// 應用程式配置
const CONFIG = {
    storageKeys: {
        mainColor: "mainColor",
        bgColor: "bgColor",
        bgToggle: "bgToggle",
        bgCustom: "bgCustom",
    },
    defaults: {
        mainColor: "#006bd0",
        bgColor: "#75BCFF",
    },
};

// DOM 元素緩存
const elements = {
    colorPicker: document.getElementById("colorPicker"),
    bgToggle: document.getElementById("bgToggle"),
    bgUpload: document.getElementById("bgUpload"),
    bgImg: document.querySelector(".bg"),
    bgColorPicker: document.getElementById("bgColorPicker"),
    bgPreviewImg: document.querySelector(".bg-preview img"),
    bgUploadOption: document.querySelector(".bg-upload-option"),
    bgColorOption: document.querySelector(".bg-color-option"),
    settingBtn: document.querySelector(".setting-btn"),
    settingPanel: document.getElementById("settingPanel"),
    closeSetting: document.getElementById("closeSetting"),
    searchInput: document.querySelector(".search-bar input"),
    searchIcon: document.querySelector(".search-bar svg"),
};

// 顏色工具函數
const ColorUtils = {
    hexToRgb(hex) {
        hex = hex.replace("#", "");
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((x) => x + x)
                .join("");
        }
        const num = parseInt(hex, 16);
        return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    },

    rgbToHex([r, g, b]) {
        return (
            "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
        );
    },

    lighten([r, g, b], percent) {
        return this.rgbToHex([
            Math.round(r + (255 - r) * percent),
            Math.round(g + (255 - g) * percent),
            Math.round(b + (255 - b) * percent),
        ]);
    },

    darken([r, g, b], percent) {
        return this.rgbToHex([
            Math.round(r * (1 - percent)),
            Math.round(g * (1 - percent)),
            Math.round(b * (1 - percent)),
        ]);
    },

    alpha([r, g, b], a) {
        return `rgba(${r},${g},${b},${a})`;
    },
};

// 本地儲存管理
const Storage = {
    get(key, defaultValue = null) {
        return localStorage.getItem(key) || defaultValue;
    },

    set(key, value) {
        localStorage.setItem(key, value);
    },

    getBool(key) {
        const value = this.get(key);
        return value !== null ? value === "true" : null;
    },
};

// 主題管理
const ThemeManager = {
    updateThemeColor(hex) {
        const rgb = ColorUtils.hexToRgb(hex);
        const root = document.documentElement.style;

        root.setProperty("--main-color", hex);
        root.setProperty("--main-color-light", ColorUtils.lighten(rgb, 0.98));
        root.setProperty("--main-color-dark", ColorUtils.darken(rgb, 0.3));
        root.setProperty("--main-color-shadow", ColorUtils.alpha(rgb, 0.18));
        root.setProperty("--main-color-border", ColorUtils.lighten(rgb, 0.6));
        root.setProperty(
            "--main-color-placeholder",
            ColorUtils.alpha(rgb, 0.52)
        );
    },

    init() {
        const savedColor = Storage.get(CONFIG.storageKeys.mainColor);
        const color = savedColor || CONFIG.defaults.mainColor;
        elements.colorPicker.value = color;
        this.updateThemeColor(color);
    },
};

// 背景管理
const BackgroundManager = {
    updateVisibility() {
        const isImageMode = elements.bgToggle.checked;

        if (isImageMode) {
            elements.bgImg.classList.remove("hidden");
            elements.bgColorOption.classList.add("hidden");
            elements.bgUploadOption.classList.remove("hidden");

            if (
                !elements.bgImg.src ||
                elements.bgImg.src.endsWith("undefined")
            ) {
                elements.bgImg.classList.add("hidden");
            }
        } else {
            elements.bgImg.classList.add("hidden");
            document.body.style.backgroundColor = elements.bgColorPicker.value;
            elements.bgUploadOption.classList.add("hidden");
            elements.bgColorOption.classList.remove("hidden");
        }
    },

    updateImage(src) {
        elements.bgImg.src = src;
        elements.bgPreviewImg.src = src;
    },

    init() {
        // 初始化背景顏色
        const savedBgColor = Storage.get(
            CONFIG.storageKeys.bgColor,
            CONFIG.defaults.bgColor
        );
        elements.bgColorPicker.value = savedBgColor;
        document.body.style.backgroundColor = savedBgColor;

        // 初始化背景切換狀態
        const savedBgToggle = Storage.getBool(CONFIG.storageKeys.bgToggle);
        if (savedBgToggle !== null) {
            elements.bgToggle.checked = savedBgToggle;
        }

        // 初始化自訂背景
        const savedBgUrl = Storage.get(CONFIG.storageKeys.bgCustom);
        if (savedBgUrl) {
            this.updateImage(savedBgUrl);
        }

        this.updateVisibility();
    },
};

// 設定面板管理
const SettingsPanel = {
    open() {
        elements.settingPanel.classList.remove("closing");
        elements.settingPanel.classList.add("open");
        document.body.classList.add("setting-open");
    },

    close() {
        elements.settingPanel.classList.add("closing");
        document.body.classList.remove("setting-open");
        elements.settingPanel.classList.remove("open");
    },

    toggle() {
        if (elements.settingPanel.classList.contains("open")) {
            this.close();
        } else {
            this.open();
        }
    },
};

// 搜尋功能
const SearchManager = {
    performSearch() {
        const query = elements.searchInput.value.trim();
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
                query
            )}`;
        }
    },

    init() {
        let isComposing = false;

        elements.searchInput.addEventListener("compositionstart", () => {
            isComposing = true;
        });

        elements.searchInput.addEventListener("compositionend", () => {
            isComposing = false;
        });

        elements.searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !isComposing) {
                this.performSearch();
            }
        });

        elements.searchIcon.style.cursor = "pointer";
        elements.searchIcon.addEventListener("click", () => {
            this.performSearch();
        });
    },
};

// 事件監聽器設定
const EventListeners = {
    init() {
        // 主題色更改
        elements.colorPicker.addEventListener("input", (e) => {
            ThemeManager.updateThemeColor(e.target.value);
            Storage.set(CONFIG.storageKeys.mainColor, e.target.value);
        });

        // 背景顏色更改
        elements.bgColorPicker.addEventListener("input", (e) => {
            document.body.style.backgroundColor = e.target.value;
            Storage.set(CONFIG.storageKeys.bgColor, e.target.value);
        });

        // 背景模式切換
        elements.bgToggle.addEventListener("change", () => {
            Storage.set(CONFIG.storageKeys.bgToggle, elements.bgToggle.checked);
            BackgroundManager.updateVisibility();
        });

        // 背景圖片上傳
        elements.bgUpload.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const result = evt.target.result;
                    BackgroundManager.updateImage(result);
                    Storage.set(CONFIG.storageKeys.bgCustom, result);
                    BackgroundManager.updateVisibility();
                };
                reader.readAsDataURL(file);
            }
        });

        // 設定面板控制
        elements.settingBtn.addEventListener("click", () => {
            SettingsPanel.toggle();
        });

        elements.closeSetting.addEventListener("click", () => {
            SettingsPanel.close();
        });

        // 點擊外部關閉設定面板
        document.addEventListener("mousedown", (e) => {
            if (
                !elements.settingPanel.contains(e.target) &&
                e.target !== elements.settingBtn &&
                elements.settingPanel.classList.contains("open")
            ) {
                SettingsPanel.close();
            }
        });
    },
};

// 應用程式初始化
const App = {
    init() {
        ThemeManager.init();
        BackgroundManager.init();
        SearchManager.init();
        EventListeners.init();
    },
};

// 啟動應用程式
App.init();
