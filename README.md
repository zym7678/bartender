# 🍸 Bartender - 调酒库

个人调酒管理工具 — 管理存酒、经典配方，随机摇一杯，一键制作。

源自 TheCocktailDB 35 款经典鸡尾酒配方数据。

## ✨ 功能

- 🍾 **酒柜** — 管理存酒（类型、品牌、开封日期、剩余量）
- 📖 **配方** — 35 款经典鸡尾酒配方，支持自定义增删
- 🎲 **摇一杯** — 随机推荐鸡尾酒，材料不足自动拦截
- 🔍 **做一杯** — 按酒名或基酒搜索配方，一键制作扣减库存
- 📋 **记录** — 自动记录饮用历史
- ⚡ **PWA** — 可安装到桌面/手机，离线可用

## 🍹 配方列表（35 款）

| # | 名称 | 基酒 |
|---|------|------|
| 1 | 尼格罗尼 Negroni | 金酒 |
| 2 | 马天尼 Martini | 金酒 |
| 3 | 古典 Old Fashioned | 波本威士忌 |
| 4 | 莫吉托 Mojito | 白朗姆酒 |
| 5 | 威士忌酸酒 Whiskey Sour | 波本威士忌 |
| 6 | 玛格丽特 Margarita | 龙舌兰酒 |
| 7 | 金汤力 Gin and Tonic | 金酒 |
| 8 | 戴克利 Daiquiri | 白朗姆酒 |
| 9 | 血腥玛丽 Bloody Mary | 伏特加 |
| 10 | 沙滩风情 Sex on the Beach | 伏特加 |
| 11 | 航空 Aviation | 金酒 |
| 12 | 老古巴 Old Cuban | 白朗姆酒 |
| 13 | 迈泰 Mai Tai | 白朗姆酒 |
| 14 | 阿美利加诺 Americano | 金巴利 |
| 15 | 莫斯科骡子 Moscow Mule | 伏特加 |
| 16 | 长岛冰茶 Long Island Iced Tea | 混合烈酒 |
| 17 | 椰林飘香 Pina Colada | 白朗姆酒 |
| 18 | 边车 Sidecar | 干邑白兰地 |
| 19 | 皮斯科酸酒 Pisco Sour | 皮斯科白兰地 |
| 20 | 浓缩咖啡马天尼 Espresso Martini | 伏特加 |
| 21 | 金普雷 Gimlet | 金酒 |
| 22 | 爱尔兰咖啡 Irish Coffee | 爱尔兰威士忌 |
| 23 | 大都会 Cosmopolitan | 伏特加 |
| 24 | 曼哈顿 Manhattan | 波本威士忌 |
| 25 | 新加坡司令 Singapore Sling | 金酒 |
| 26 | 帕洛玛 Paloma | 龙舌兰酒 |
| 27 | 汤姆柯林斯 Tom Collins | 金酒 |
| 28 | 萨泽拉克 Sazerac | 黑麦威士忌 |
| 29 | 海明威特别款 Hemingway Special | 白朗姆酒 |
| 30 | 凯匹林纳 Caipirinha | 卡沙萨酒 |
| 31 | 贝里尼 Bellini | 普罗赛克起泡酒 |
| 32 | 林荫大道 Boulevardier | 波本威士忌 |
| 33 | 阿佩罗橙光 Aperol Spritz | 阿佩罗 |
| 34 | 法式七十五 French 75 | 金酒 |
| 35 | 最后一杯 Last Word | 金酒 |

## 🚀 在线访问

GitHub Pages: [https://zym7678.github.io/bartender/](https://zym7678.github.io/bartender/)

## 🛠 本地使用

打开 `index.html` 即可。首次启动自动加载示例数据（存酒 + 35 款配方）。

## 📦 技术栈

- 纯 HTML + CSS + Vanilla JS（无框架无依赖）
- localStorage 持久化
- PWA（Service Worker + manifest.json）
