const STORAGE_PREFIX = "cb_";

const DB = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_PREFIX + key)) || [];
    } catch {
      return [];
    }
  },
  set(key, value) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  },
  setMany(entries) {
    Object.entries(entries).forEach(([key, value]) => {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    });
  },
  clear() {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  },
  _id() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  },
  today() {
    return new Date().toISOString().slice(0, 10);
  },
};

function seedSampleData() {
  if (DB.get("cabinet").length || DB.get("recipes").length) return;

  const spirits = [
    { type: "金酒", brand: "孟买蓝宝石", openedDate: "2026-03-10", total: 750, remaining: 620, unit: "ml" },
    { type: "金酒", brand: "添加利", openedDate: "2026-05-01", total: 750, remaining: 750, unit: "ml" },
    { type: "波本威士忌", brand: "杰克丹尼", openedDate: "2026-02-15", total: 700, remaining: 430, unit: "ml" },
    { type: "爱尔兰威士忌", brand: "尊美醇", openedDate: "2026-04-20", total: 700, remaining: 520, unit: "ml" },
    { type: "黑麦威士忌", brand: "布莱德", openedDate: "2026-04-08", total: 700, remaining: 610, unit: "ml" },
    { type: "白朗姆酒", brand: "百加得", openedDate: "2026-01-08", total: 750, remaining: 540, unit: "ml" },
    { type: "伏特加", brand: "绝对", openedDate: "2026-03-22", total: 750, remaining: 560, unit: "ml" },
    { type: "龙舌兰酒", brand: "奥美加银", openedDate: "2026-05-15", total: 750, remaining: 720, unit: "ml" },
    { type: "干邑白兰地", brand: "轩尼诗 VS", openedDate: "2026-03-02", total: 700, remaining: 510, unit: "ml" },
    { type: "皮斯科白兰地", brand: "Capel", openedDate: "2026-04-09", total: 700, remaining: 500, unit: "ml" },
    { type: "卡沙萨酒", brand: "Sagatiba", openedDate: "2026-05-28", total: 700, remaining: 650, unit: "ml" },
    { type: "金巴利", brand: "Campari", openedDate: "2026-03-05", total: 700, remaining: 460, unit: "ml" },
    { type: "阿佩罗", brand: "Aperol", openedDate: "2026-04-06", total: 700, remaining: 520, unit: "ml" },
    { type: "甜味美思", brand: "马天尼红", openedDate: "2026-04-01", total: 750, remaining: 500, unit: "ml" },
    { type: "干味美思", brand: "马天尼干", openedDate: "2026-04-01", total: 750, remaining: 680, unit: "ml" },
    { type: "橙味利口酒", brand: "君度", openedDate: "2026-02-20", total: 700, remaining: 410, unit: "ml" },
    { type: "桃子利口酒", brand: "DeKuyper", openedDate: "2026-05-11", total: 700, remaining: 560, unit: "ml" },
    { type: "咖啡利口酒", brand: "Kahlua", openedDate: "2026-02-18", total: 700, remaining: 520, unit: "ml" },
    { type: "绿查特酒", brand: "Chartreuse", openedDate: "2026-03-30", total: 700, remaining: 620, unit: "ml" },
    { type: "马拉斯奇诺利口酒", brand: "Luxardo", openedDate: "2026-04-12", total: 700, remaining: 540, unit: "ml" },
    { type: "普罗赛克起泡酒", brand: "Mionetto", openedDate: "2026-06-01", total: 750, remaining: 500, unit: "ml" },
    { type: "香槟", brand: "Moet Imperial", openedDate: "2026-05-20", total: 750, remaining: 540, unit: "ml" },
    { type: "苏打水", brand: "怡泉", openedDate: "2026-06-10", total: 330, remaining: 330, unit: "ml" },
    { type: "汤力水", brand: "Schweppes", openedDate: "2026-06-10", total: 330, remaining: 330, unit: "ml" },
    { type: "姜汁啤酒", brand: "Bundaberg", openedDate: "2026-06-10", total: 375, remaining: 375, unit: "ml" },
    { type: "蔓越莓汁", brand: "Ocean Spray", openedDate: "2026-06-11", total: 1000, remaining: 800, unit: "ml" },
    { type: "番茄汁", brand: "Romerquelle", openedDate: "2026-06-01", total: 300, remaining: 300, unit: "ml" },
    { type: "葡萄柚汁", brand: "鲜榨葡萄柚", openedDate: DB.today(), total: 500, remaining: 500, unit: "ml" },
    { type: "橙汁", brand: "鲜榨橙汁", openedDate: DB.today(), total: 500, remaining: 500, unit: "ml" },
    { type: "菠萝汁", brand: "Dole", openedDate: "2026-06-11", total: 1000, remaining: 800, unit: "ml" },
    { type: "桃泥", brand: "Monin", openedDate: "2026-06-07", total: 500, remaining: 400, unit: "ml" },
    { type: "青柠汁", brand: "新鲜青柠", openedDate: DB.today(), total: 300, remaining: 300, unit: "ml" },
    { type: "柠檬汁", brand: "新鲜柠檬", openedDate: DB.today(), total: 300, remaining: 300, unit: "ml" },
    { type: "糖浆", brand: "莫林", openedDate: "2026-01-15", total: 500, remaining: 350, unit: "ml" },
    { type: "石榴糖浆", brand: "Monin", openedDate: "2026-05-16", total: 500, remaining: 440, unit: "ml" },
    { type: "苦精", brand: "安高天娜", openedDate: "2025-12-01", total: 200, remaining: 160, unit: "ml" },
    { type: "咖啡", brand: "冷萃咖啡", openedDate: DB.today(), total: 300, remaining: 300, unit: "ml" },
    { type: "椰奶", brand: "佳乐", openedDate: "2026-06-12", total: 400, remaining: 400, unit: "ml" },
    { type: "蛋白", brand: "巴氏杀菌蛋白", openedDate: DB.today(), total: 200, remaining: 200, unit: "ml" }
  ];

  const recipes = [
    {
      name: "尼格罗尼 Negroni",
      glass: "古典杯",
      instructions: "将所有配料加冰搅拌约20秒，滤入装有大冰块的古典杯中。",
      garnish: "橙皮",
      ingredients: [
        { name: "金酒", amount: 30, unit: "ml" },
        { name: "金巴利", amount: 30, unit: "ml" },
        { name: "甜味美思", amount: 30, unit: "ml" }
      ]
    },
    {
      name: "马天尼 Martini",
      glass: "马天尼杯",
      instructions: "金酒与干味美思加冰搅拌，滤入冰镇后的马天尼杯。",
      garnish: "橄榄或柠檬皮",
      ingredients: [
        { name: "金酒", amount: 60, unit: "ml" },
        { name: "干味美思", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "古典 Old Fashioned",
      glass: "古典杯",
      instructions: "杯中加入糖浆和苦精，加入大冰块后倒入波本威士忌，轻轻搅拌。",
      garnish: "橙皮",
      ingredients: [
        { name: "波本威士忌", amount: 60, unit: "ml" },
        { name: "糖浆", amount: 5, unit: "ml" },
        { name: "苦精", amount: 2, unit: "dash" }
      ]
    },
    {
      name: "莫吉托 Mojito",
      glass: "海波杯",
      instructions: "朗姆酒、青柠汁和糖浆加冰摇匀，倒入杯中后补入苏打水。",
      garnish: "薄荷枝",
      ingredients: [
        { name: "白朗姆酒", amount: 45, unit: "ml" },
        { name: "青柠汁", amount: 20, unit: "ml" },
        { name: "糖浆", amount: 15, unit: "ml" },
        { name: "苏打水", amount: 80, unit: "ml" }
      ]
    },
    {
      name: "威士忌酸酒 Whiskey Sour",
      glass: "酸酒杯",
      instructions: "所有配料加冰充分摇匀，滤入酒杯中。",
      garnish: "樱桃",
      ingredients: [
        { name: "波本威士忌", amount: 50, unit: "ml" },
        { name: "柠檬汁", amount: 25, unit: "ml" },
        { name: "糖浆", amount: 15, unit: "ml" }
      ]
    },
    {
      name: "玛格丽特 Margarita",
      glass: "玛格丽特杯",
      instructions: "所有配料加冰摇匀，滤入做过盐边的杯中。",
      garnish: "盐边和青柠角",
      ingredients: [
        { name: "龙舌兰酒", amount: 45, unit: "ml" },
        { name: "橙味利口酒", amount: 20, unit: "ml" },
        { name: "青柠汁", amount: 15, unit: "ml" }
      ]
    },
    {
      name: "金汤力 Gin and Tonic",
      glass: "海波杯",
      instructions: "杯中加冰，倒入金酒后补满汤力水，轻轻搅拌。",
      garnish: "青柠角",
      ingredients: [
        { name: "金酒", amount: 50, unit: "ml" },
        { name: "汤力水", amount: 120, unit: "ml" }
      ]
    },
    {
      name: "戴克利 Daiquiri",
      glass: "鸡尾酒杯",
      instructions: "朗姆酒、青柠汁和糖浆加冰摇匀，滤入冰镇酒杯。",
      garnish: "青柠皮",
      ingredients: [
        { name: "白朗姆酒", amount: 50, unit: "ml" },
        { name: "青柠汁", amount: 20, unit: "ml" },
        { name: "糖浆", amount: 15, unit: "ml" }
      ]
    },
    {
      name: "血腥玛丽 Bloody Mary",
      glass: "海波杯",
      instructions: "所有配料加冰轻摇后倒入杯中。",
      garnish: "芹菜杆和柠檬角",
      ingredients: [
        { name: "伏特加", amount: 45, unit: "ml" },
        { name: "番茄汁", amount: 90, unit: "ml" },
        { name: "柠檬汁", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "沙滩风情 Sex on the Beach",
      glass: "海波杯",
      instructions: "将所有配料加冰摇匀，倒入装冰的高杯中。",
      garnish: "橙片",
      ingredients: [
        { name: "伏特加", amount: 40, unit: "ml" },
        { name: "桃子利口酒", amount: 20, unit: "ml" },
        { name: "蔓越莓汁", amount: 60, unit: "ml" },
        { name: "橙汁", amount: 30, unit: "ml" }
      ]
    },
    {
      name: "航空 Aviation",
      glass: "鸡尾酒杯",
      instructions: "所有配料加冰摇匀，滤入冰镇酒杯。",
      garnish: "柠檬皮",
      ingredients: [
        { name: "金酒", amount: 45, unit: "ml" },
        { name: "柠檬汁", amount: 15, unit: "ml" },
        { name: "马拉斯奇诺利口酒", amount: 15, unit: "ml" }
      ]
    },
    {
      name: "老古巴 Old Cuban",
      glass: "香槟杯",
      instructions: "除起泡酒外其余配料加冰摇匀，滤入杯中后补上起泡酒。",
      garnish: "薄荷枝",
      ingredients: [
        { name: "白朗姆酒", amount: 45, unit: "ml" },
        { name: "青柠汁", amount: 20, unit: "ml" },
        { name: "糖浆", amount: 15, unit: "ml" },
        { name: "苦精", amount: 2, unit: "dash" },
        { name: "香槟", amount: 60, unit: "ml" }
      ]
    },
    {
      name: "迈泰 Mai Tai",
      glass: "古典杯",
      instructions: "所有配料加冰摇匀，倒入装满碎冰的杯中。",
      garnish: "青柠皮",
      ingredients: [
        { name: "白朗姆酒", amount: 45, unit: "ml" },
        { name: "橙味利口酒", amount: 15, unit: "ml" },
        { name: "青柠汁", amount: 20, unit: "ml" },
        { name: "糖浆", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "阿美利加诺 Americano",
      glass: "古典杯",
      instructions: "在装冰的杯中依次倒入所有配料，轻轻搅拌。",
      garnish: "橙片",
      ingredients: [
        { name: "金巴利", amount: 30, unit: "ml" },
        { name: "甜味美思", amount: 30, unit: "ml" },
        { name: "苏打水", amount: 60, unit: "ml" }
      ]
    },
    {
      name: "莫斯科骡子 Moscow Mule",
      glass: "铜杯",
      instructions: "杯中加冰，倒入伏特加和青柠汁，补入姜汁啤酒。",
      garnish: "青柠片",
      ingredients: [
        { name: "伏特加", amount: 45, unit: "ml" },
        { name: "青柠汁", amount: 15, unit: "ml" },
        { name: "姜汁啤酒", amount: 120, unit: "ml" }
      ]
    },
    {
      name: "长岛冰茶 Long Island Iced Tea",
      glass: "海波杯",
      instructions: "所有基酒与酸味配料加冰轻摇后倒入杯中，再补入苏打水。",
      garnish: "柠檬角",
      ingredients: [
        { name: "伏特加", amount: 15, unit: "ml" },
        { name: "金酒", amount: 15, unit: "ml" },
        { name: "白朗姆酒", amount: 15, unit: "ml" },
        { name: "龙舌兰酒", amount: 15, unit: "ml" },
        { name: "橙味利口酒", amount: 15, unit: "ml" },
        { name: "柠檬汁", amount: 20, unit: "ml" }
      ]
    },
    {
      name: "椰林飘香 Pina Colada",
      glass: "飓风杯",
      instructions: "所有配料与碎冰一起搅打，倒入杯中。",
      garnish: "菠萝片",
      ingredients: [
        { name: "白朗姆酒", amount: 45, unit: "ml" },
        { name: "椰奶", amount: 60, unit: "ml" },
        { name: "菠萝汁", amount: 90, unit: "ml" }
      ]
    },
    {
      name: "边车 Sidecar",
      glass: "鸡尾酒杯",
      instructions: "所有配料加冰摇匀，滤入酒杯。",
      garnish: "橙皮",
      ingredients: [
        { name: "干邑白兰地", amount: 50, unit: "ml" },
        { name: "橙味利口酒", amount: 20, unit: "ml" },
        { name: "柠檬汁", amount: 20, unit: "ml" }
      ]
    },
    {
      name: "皮斯科酸酒 Pisco Sour",
      glass: "古典杯",
      instructions: "所有配料加冰充分摇匀，滤入杯中。",
      garnish: "苦精",
      ingredients: [
        { name: "皮斯科白兰地", amount: 60, unit: "ml" },
        { name: "柠檬汁", amount: 25, unit: "ml" },
        { name: "糖浆", amount: 15, unit: "ml" },
        { name: "蛋白", amount: 15, unit: "ml" }
      ]
    },
    {
      name: "浓缩咖啡马天尼 Espresso Martini",
      glass: "马天尼杯",
      instructions: "所有配料加冰充分摇匀，滤入酒杯中。",
      garnish: "咖啡豆",
      ingredients: [
        { name: "伏特加", amount: 50, unit: "ml" },
        { name: "咖啡利口酒", amount: 20, unit: "ml" },
        { name: "咖啡", amount: 30, unit: "ml" },
        { name: "糖浆", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "金普雷 Gimlet",
      glass: "鸡尾酒杯",
      instructions: "所有配料加冰摇匀，滤入冰镇酒杯。",
      garnish: "青柠皮",
      ingredients: [
        { name: "金酒", amount: 60, unit: "ml" },
        { name: "青柠汁", amount: 15, unit: "ml" },
        { name: "糖浆", amount: 15, unit: "ml" }
      ]
    },
    {
      name: "爱尔兰咖啡 Irish Coffee",
      glass: "爱尔兰咖啡杯",
      instructions: "杯中加入威士忌与糖浆，倒入热咖啡搅拌。",
      garnish: "奶油顶",
      ingredients: [
        { name: "爱尔兰威士忌", amount: 45, unit: "ml" },
        { name: "咖啡", amount: 120, unit: "ml" },
        { name: "糖浆", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "大都会 Cosmopolitan",
      glass: "鸡尾酒杯",
      instructions: "所有配料加冰摇匀，滤入冰镇酒杯。",
      garnish: "橙皮",
      ingredients: [
        { name: "伏特加", amount: 40, unit: "ml" },
        { name: "橙味利口酒", amount: 15, unit: "ml" },
        { name: "蔓越莓汁", amount: 30, unit: "ml" },
        { name: "青柠汁", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "曼哈顿 Manhattan",
      glass: "鸡尾酒杯",
      instructions: "所有配料加冰搅拌，滤入冰镇酒杯。",
      garnish: "樱桃",
      ingredients: [
        { name: "波本威士忌", amount: 50, unit: "ml" },
        { name: "甜味美思", amount: 20, unit: "ml" },
        { name: "苦精", amount: 2, unit: "dash" }
      ]
    },
    {
      name: "新加坡司令 Singapore Sling",
      glass: "高杯",
      instructions: "所有配料加冰摇匀，倒入装冰的高杯中。",
      garnish: "橙片",
      ingredients: [
        { name: "金酒", amount: 30, unit: "ml" },
        { name: "橙味利口酒", amount: 10, unit: "ml" },
        { name: "菠萝汁", amount: 60, unit: "ml" },
        { name: "柠檬汁", amount: 15, unit: "ml" },
        { name: "石榴糖浆", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "帕洛玛 Paloma",
      glass: "海波杯",
      instructions: "龙舌兰与青柠汁加冰后倒入杯中，补入葡萄柚汁和苏打水。",
      garnish: "葡萄柚片",
      ingredients: [
        { name: "龙舌兰酒", amount: 45, unit: "ml" },
        { name: "青柠汁", amount: 15, unit: "ml" },
        { name: "葡萄柚汁", amount: 90, unit: "ml" },
        { name: "苏打水", amount: 30, unit: "ml" }
      ]
    },
    {
      name: "汤姆柯林斯 Tom Collins",
      glass: "柯林斯杯",
      instructions: "金酒、柠檬汁和糖浆加冰后倒入杯中，补入苏打水。",
      garnish: "柠檬片",
      ingredients: [
        { name: "金酒", amount: 45, unit: "ml" },
        { name: "柠檬汁", amount: 30, unit: "ml" },
        { name: "糖浆", amount: 15, unit: "ml" },
        { name: "苏打水", amount: 90, unit: "ml" }
      ]
    },
    {
      name: "萨泽拉克 Sazerac",
      glass: "古典杯",
      instructions: "威士忌、糖浆与苦精加冰搅拌后倒入杯中。",
      garnish: "柠檬皮",
      ingredients: [
        { name: "黑麦威士忌", amount: 45, unit: "ml" },
        { name: "糖浆", amount: 5, unit: "ml" },
        { name: "苦精", amount: 2, unit: "dash" }
      ]
    },
    {
      name: "海明威特别款 Hemingway Special",
      glass: "鸡尾酒杯",
      instructions: "所有配料加冰摇匀，滤入冰镇酒杯。",
      garnish: "青柠皮",
      ingredients: [
        { name: "白朗姆酒", amount: 45, unit: "ml" },
        { name: "葡萄柚汁", amount: 30, unit: "ml" },
        { name: "青柠汁", amount: 15, unit: "ml" },
        { name: "马拉斯奇诺利口酒", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "凯匹林纳 Caipirinha",
      glass: "古典杯",
      instructions: "所有配料加冰摇匀后倒入杯中。",
      garnish: "青柠角",
      ingredients: [
        { name: "卡沙萨酒", amount: 60, unit: "ml" },
        { name: "青柠汁", amount: 20, unit: "ml" },
        { name: "糖浆", amount: 10, unit: "ml" }
      ]
    },
    {
      name: "贝里尼 Bellini",
      glass: "香槟杯",
      instructions: "先倒入桃泥，再缓缓加入起泡酒。",
      garnish: "桃片",
      ingredients: [
        { name: "普罗赛克起泡酒", amount: 120, unit: "ml" },
        { name: "桃泥", amount: 30, unit: "ml" }
      ]
    },
    {
      name: "林荫大道 Boulevardier",
      glass: "古典杯",
      instructions: "所有配料加冰搅拌，滤入杯中。",
      garnish: "橙皮",
      ingredients: [
        { name: "波本威士忌", amount: 45, unit: "ml" },
        { name: "金巴利", amount: 30, unit: "ml" },
        { name: "甜味美思", amount: 30, unit: "ml" }
      ]
    },
    {
      name: "阿佩罗橙光 Aperol Spritz",
      glass: "葡萄酒杯",
      instructions: "杯中加冰，先倒入阿佩罗，再加入起泡酒和苏打水。",
      garnish: "橙片",
      ingredients: [
        { name: "阿佩罗", amount: 60, unit: "ml" },
        { name: "普罗赛克起泡酒", amount: 90, unit: "ml" },
        { name: "苏打水", amount: 30, unit: "ml" }
      ]
    },
    {
      name: "法式七十五 French 75",
      glass: "香槟杯",
      instructions: "除香槟外其余配料加冰摇匀，滤入杯中后补上香槟。",
      garnish: "柠檬皮",
      ingredients: [
        { name: "金酒", amount: 30, unit: "ml" },
        { name: "柠檬汁", amount: 15, unit: "ml" },
        { name: "糖浆", amount: 10, unit: "ml" },
        { name: "香槟", amount: 60, unit: "ml" }
      ]
    },
    {
      name: "最后一杯 Last Word",
      glass: "鸡尾酒杯",
      instructions: "所有配料加冰摇匀，滤入冰镇酒杯。",
      garnish: "青柠皮",
      ingredients: [
        { name: "金酒", amount: 30, unit: "ml" },
        { name: "绿查特酒", amount: 30, unit: "ml" },
        { name: "马拉斯奇诺利口酒", amount: 30, unit: "ml" },
        { name: "青柠汁", amount: 30, unit: "ml" }
      ]
    }
  ];

  DB.setMany({
    cabinet: spirits.map((item) => ({ id: DB._id(), ...item })),
    recipes: recipes.map((item) => ({ id: DB._id(), ...item, createdAt: DB.today() })),
    log: []
  });
}

function resetSampleData() {
  if (!confirm("清空所有数据并重新加载示例数据？")) return;
  DB.clear();
  seedSampleData();
  location.reload();
}

function saveCabinet(id, type, brand, openedDate, total, remaining) {
  const items = DB.get("cabinet");
  if (id) {
    const index = items.findIndex((item) => item.id === id);
    if (index > -1) {
      items[index] = { ...items[index], type, brand, openedDate, total, remaining };
    }
  } else {
    items.push({ id: DB._id(), type, brand, openedDate, total, remaining, unit: "ml" });
  }
  DB.set("cabinet", items);
  return items;
}

function deleteCabinet(id) {
  if (!confirm("确定删除？")) return;
  DB.set("cabinet", DB.get("cabinet").filter((item) => item.id !== id));
  toast("已删除", "ok");
}

function getTypeSuggest() {
  return [...new Set(DB.get("cabinet").map((item) => item.type))];
}

function saveRecipe(id, name, glass, instructions, garnish, ingredients) {
  const items = DB.get("recipes");
  if (id) {
    const index = items.findIndex((item) => item.id === id);
    if (index > -1) {
      items[index] = { ...items[index], name, glass, instructions, garnish, ingredients };
    }
  } else {
    items.push({ id: DB._id(), name, glass, instructions, garnish, ingredients, createdAt: DB.today() });
  }
  DB.set("recipes", items);
  return items;
}

function deleteRecipe(id) {
  if (!confirm("确定删除？")) return;
  DB.set("recipes", DB.get("recipes").filter((item) => item.id !== id));
  toast("已删除配方", "ok");
}

function checkMissing(recipe) {
  const cabinet = DB.get("cabinet");
  return recipe.ingredients
    .filter((ingredient) => !cabinet.some((item) => item.type === ingredient.name && item.remaining >= ingredient.amount))
    .map((ingredient) => ({ name: ingredient.name }));
}

function getAvailBrands(typeName, needAmount) {
  return DB.get("cabinet").filter((item) => item.type === typeName && item.remaining >= needAmount);
}

let pendingMakeId = null;
let brandSelections = {};

function makeDrink(recipeId) {
  const recipe = DB.get("recipes").find((item) => item.id === recipeId);
  if (!recipe) return;

  const missing = checkMissing(recipe);
  if (missing.length) {
    toast("缺少 " + missing.map((item) => item.name).join("、") + "，换一杯吧", "warn");
    return;
  }

  const multiBrandIngredients = recipe.ingredients
    .map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      brands: getAvailBrands(ingredient.name, ingredient.amount)
    }))
    .filter((ingredient) => ingredient.brands.length > 1);

  if (multiBrandIngredients.length) {
    pendingMakeId = recipeId;
    showBrandModal(recipe, multiBrandIngredients);
    return;
  }

  executeMake(recipe, {});
}

function showBrandModal(recipe, multiBrandIngredients) {
  const recipeName = document.getElementById("brand-recipe-name");
  const list = document.getElementById("brand-pick-list");
  if (!recipeName || !list) {
    executeMake(recipe, {});
    return;
  }

  recipeName.textContent = "为「" + recipe.name + "」选择品牌";
  brandSelections = {};

  list.innerHTML = multiBrandIngredients
    .map((ingredient) => {
      const selectId = "bs_" + ingredient.name.replace(/\s/g, "");
      brandSelections[ingredient.name] = ingredient.brands[0].id;
      return (
        "<div class=brand-pick-item>" +
        "<label>" + esc(ingredient.name) + "（需要 " + ingredient.amount + " " + ingredient.unit + "）</label>" +
        "<select id=\"" + selectId + "\">" +
        ingredient.brands
          .map(
            (brand) =>
              "<option value=\"" + brand.id + "\">" +
              esc(brand.brand) +
              "（剩 " + brand.remaining + " ml）</option>"
          )
          .join("") +
        "</select></div>"
      );
    })
    .join("");

  multiBrandIngredients.forEach((ingredient) => {
    const select = document.getElementById("bs_" + ingredient.name.replace(/\s/g, ""));
    if (select) {
      select.addEventListener("change", () => {
        brandSelections[ingredient.name] = select.value;
      });
    }
  });

  showModal("brand");
}

function confirmBrandPick() {
  closeModal("brand");
  if (!pendingMakeId) return;
  const recipe = DB.get("recipes").find((item) => item.id === pendingMakeId);
  pendingMakeId = null;
  if (recipe) executeMake(recipe, brandSelections);
}

function executeMake(recipe, brandMap) {
  const cabinet = DB.get("cabinet");

  recipe.ingredients.forEach((ingredient) => {
    const brands = getAvailBrands(ingredient.name, ingredient.amount);
    const target = brands.length === 1
      ? cabinet.find((item) => item.id === brands[0].id)
      : cabinet.find((item) => item.id === brandMap[ingredient.name]);

    if (target) {
      target.remaining = Math.round((target.remaining - ingredient.amount) * 10) / 10;
    }
  });

  DB.set("cabinet", cabinet);

  const log = DB.get("log");
  log.unshift({
    id: DB._id(),
    recipeName: recipe.name,
    recipeId: recipe.id,
    drankAt: new Date().toISOString(),
    ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient }))
  });
  DB.set("log", log);
  toast("干杯，已扣减库存", "ok");
}

function deleteLogEntry(id) {
  if (!confirm("删除这条？")) return;
  DB.set("log", DB.get("log").filter((item) => item.id !== id));
  toast("已删除", "ok");
}

function clearLog() {
  if (!confirm("清空所有记录？")) return;
  DB.set("log", []);
  toast("已清空", "ok");
}

function showModal(type) {
  const element = document.getElementById("modal-" + type);
  if (element) element.classList.add("active");
}

function closeModal(type) {
  const element = document.getElementById("modal-" + type);
  if (element) element.classList.remove("active");
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("active");
  }
});

function toast(message, type) {
  const variant = type || "";
  const element = document.getElementById("toast") || createToast();
  element.textContent = message;
  element.className = "toast show " + variant;
  clearTimeout(element._timer);
  element._timer = setTimeout(() => element.classList.remove("show"), 2500);
}

function createToast() {
  const toastElement = document.createElement("div");
  toastElement.id = "toast";
  toastElement.className = "toast";
  document.body.appendChild(toastElement);
  return toastElement;
}

function esc(value) {
  if (!value) return "";
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function getPage() {
  const page = location.pathname.split("/").pop().toLowerCase();
  return page.replace(".html", "") || "index";
}

function highlightNav() {
  document.querySelectorAll("nav a").forEach((anchor) => {
    const href = anchor.getAttribute("href").toLowerCase().replace(".html", "");
    anchor.classList.toggle("active", href === getPage() || (getPage() === "index" && href === "index"));
  });
}

seedSampleData();
