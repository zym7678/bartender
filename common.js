const STORAGE_PREFIX = "cb_";
const STORAGE_VERSION = "ingredients-v2";

const STANDARD_INGREDIENTS = [
  { id: "gin", name: "金酒", category: "基酒" },
  { id: "vodka", name: "伏特加", category: "基酒" },
  { id: "white_rum", name: "白朗姆酒", category: "基酒" },
  { id: "tequila", name: "龙舌兰酒", category: "基酒" },
  { id: "bourbon", name: "波本威士忌", category: "基酒" },
  { id: "irish_whiskey", name: "爱尔兰威士忌", category: "基酒" },
  { id: "rye_whiskey", name: "黑麦威士忌", category: "基酒" },
  { id: "cognac", name: "干邑白兰地", category: "基酒" },
  { id: "pisco", name: "皮斯科白兰地", category: "基酒" },
  { id: "cachaca", name: "卡沙萨酒", category: "基酒" },
  { id: "orange_liqueur", name: "橙味利口酒", category: "利口酒" },
  { id: "peach_liqueur", name: "桃子利口酒", category: "利口酒" },
  { id: "coffee_liqueur", name: "咖啡利口酒", category: "利口酒" },
  { id: "green_chartreuse", name: "绿查特酒", category: "利口酒" },
  { id: "maraschino_liqueur", name: "马拉斯奇诺利口酒", category: "利口酒" },
  { id: "campari", name: "金巴利", category: "苦味/开胃酒" },
  { id: "aperol", name: "阿佩罗", category: "苦味/开胃酒" },
  { id: "bitters", name: "苦精", category: "苦精" },
  { id: "sweet_vermouth", name: "甜味美思", category: "加强葡萄酒" },
  { id: "dry_vermouth", name: "干味美思", category: "加强葡萄酒" },
  { id: "prosecco", name: "普罗赛克起泡酒", category: "起泡酒" },
  { id: "champagne", name: "香槟", category: "起泡酒" },
  { id: "lime_juice", name: "青柠汁", category: "果汁/酸味" },
  { id: "lemon_juice", name: "柠檬汁", category: "果汁/酸味" },
  { id: "orange_juice", name: "橙汁", category: "果汁/酸味" },
  { id: "grapefruit_juice", name: "葡萄柚汁", category: "果汁/酸味" },
  { id: "pineapple_juice", name: "菠萝汁", category: "果汁/酸味" },
  { id: "cranberry_juice", name: "蔓越莓汁", category: "果汁/酸味" },
  { id: "tomato_juice", name: "番茄汁", category: "果汁/酸味" },
  { id: "simple_syrup", name: "糖浆", category: "糖类/糖浆" },
  { id: "grenadine", name: "石榴糖浆", category: "糖类/糖浆" },
  { id: "peach_puree", name: "桃泥", category: "糖类/糖浆" },
  { id: "soda_water", name: "苏打水", category: "气泡/软饮" },
  { id: "tonic_water", name: "汤力水", category: "气泡/软饮" },
  { id: "ginger_beer", name: "姜汁啤酒", category: "气泡/软饮" },
  { id: "coffee", name: "咖啡", category: "咖啡/乳制品/蛋" },
  { id: "coconut_milk", name: "椰奶", category: "咖啡/乳制品/蛋" },
  { id: "egg_white", name: "蛋白", category: "咖啡/乳制品/蛋" }
];

const OTHER_CATEGORY = "其他";

const STANDARD_GLASSES = [
  { id: "rocks", name: "古典杯", visualGlass: "rocks" },
  { id: "martini", name: "马天尼杯", visualGlass: "martini" },
  { id: "highball", name: "海波杯", visualGlass: "highball" },
  { id: "collins", name: "柯林斯杯", visualGlass: "highball" },
  { id: "coupe", name: "鸡尾酒杯", visualGlass: "coupe" },
  { id: "flute", name: "香槟杯", visualGlass: "flute" },
  { id: "wine", name: "葡萄酒杯", visualGlass: "wine" },
  { id: "copper_mug", name: "铜杯", visualGlass: "highball" },
  { id: "hurricane", name: "飓风杯", visualGlass: "wine" },
  { id: "other", name: "其他杯型", visualGlass: "coupe" }
];

const STANDARD_GARNISHES = [
  { id: "orange_peel", name: "橙皮", visualGarnish: "orange" },
  { id: "orange_slice", name: "橙片", visualGarnish: "orange" },
  { id: "lime_wedge", name: "青柠角", visualGarnish: "lime" },
  { id: "lime_slice", name: "青柠片", visualGarnish: "lime" },
  { id: "lemon_peel", name: "柠檬皮", visualGarnish: "lemon" },
  { id: "lemon_slice", name: "柠檬片", visualGarnish: "lemon" },
  { id: "cherry", name: "樱桃", visualGarnish: "cherry" },
  { id: "mint", name: "薄荷", visualGarnish: "mint" },
  { id: "olive", name: "橄榄", visualGarnish: "olive" },
  { id: "salt_rim", name: "盐边", visualGarnish: "salt" },
  { id: "none", name: "无装饰", visualGarnish: "none" },
  { id: "other", name: "其他装饰", visualGarnish: "none" }
];

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

function ensureStorageVersion() {
  const key = STORAGE_PREFIX + "schema_version";
  if (localStorage.getItem(key) === STORAGE_VERSION) return;
  DB.clear();
  localStorage.setItem(key, STORAGE_VERSION);
}

function getStandardIngredients() {
  return STANDARD_INGREDIENTS.map((ingredient) => ({ ...ingredient }));
}

function getIngredientCategories() {
  return [...new Set(STANDARD_INGREDIENTS.map((ingredient) => ingredient.category)), OTHER_CATEGORY];
}

function getIngredientsByCategory(category) {
  if (category === OTHER_CATEGORY) return [{ id: "custom", name: "其他原料", category: OTHER_CATEGORY }];
  return STANDARD_INGREDIENTS.filter((ingredient) => ingredient.category === category).map((ingredient) => ({ ...ingredient }));
}

function getStandardIngredient(value) {
  if (!value) return null;
  const text = String(value).trim();
  return STANDARD_INGREDIENTS.find((ingredient) => ingredient.id === text || ingredient.name === text) || null;
}

function makeCustomIngredientId(name) {
  const text = String(name || "").trim();
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }
  return "custom_" + Math.abs(hash);
}

function normalizeCustomIngredient(name) {
  const text = String(name || "").trim();
  if (!text) {
    throw new Error("自定义原料不能为空");
  }
  return { id: makeCustomIngredientId(text), name: text, category: OTHER_CATEGORY };
}

function getStandardGlasses() {
  return STANDARD_GLASSES.map((glass) => ({ ...glass }));
}

function getStandardGlass(value) {
  if (!value) return null;
  const text = String(value).trim();
  return STANDARD_GLASSES.find((glass) => glass.id === text || glass.name === text) || null;
}

function normalizeGlass(value) {
  const standard = getStandardGlass(value);
  if (standard && standard.id !== "other") {
    return { glassId: standard.id, glass: standard.name, visualGlass: standard.visualGlass };
  }
  const glass = String(value || "").trim() || "其他杯型";
  return { glassId: standard ? standard.id : "custom", glass, visualGlass: standard ? standard.visualGlass : "coupe" };
}

function getStandardGarnishes() {
  return STANDARD_GARNISHES.map((garnish) => ({ ...garnish }));
}

function getStandardGarnish(value) {
  if (!value) return null;
  const text = String(value).trim();
  return STANDARD_GARNISHES.find((garnish) => garnish.id === text || garnish.name === text) || null;
}

function normalizeGarnish(value) {
  const standard = getStandardGarnish(value);
  if (standard && standard.id !== "other") {
    return { garnishId: standard.id, garnish: standard.name, visualGarnish: standard.visualGarnish };
  }
  const garnish = String(value || "").trim();
  if (!garnish) return { garnishId: "none", garnish: "", visualGarnish: "none" };
  return { garnishId: standard ? "other" : "custom", garnish, visualGarnish: "none" };
}

function normalizeRecipeIngredient(ingredient) {
  const standard = getStandardIngredient(ingredient.ingredientId || ingredient.name);
  const normalized = standard || normalizeCustomIngredient(ingredient.name || ingredient.ingredientId);
  return {
    ...ingredient,
    ingredientId: normalized.id,
    name: normalized.name,
    category: normalized.category
  };
}

function normalizeCabinetItem(item) {
  const standard = getStandardIngredient(item.ingredientId || item.type);
  const normalized = standard || normalizeCustomIngredient(item.type || item.ingredientId);
  return {
    ...item,
    ingredientId: normalized.id,
    type: normalized.name,
    category: normalized.category
  };
}

function getIngredientKey(value) {
  if (!value) return "";
  if (typeof value === "string") {
    const standard = getStandardIngredient(value);
    return standard ? standard.id : value.trim();
  }
  if (value.ingredientId) return value.ingredientId;
  const name = value.name || value.type || "";
  const standard = getStandardIngredient(name);
  return standard ? standard.id : makeCustomIngredientId(name);
}

function ingredientMatches(cabinetItem, recipeIngredient) {
  return getIngredientKey(cabinetItem) === getIngredientKey(recipeIngredient);
}

function inferCocktailVisual(recipe) {
  const glassText = (recipe.glass || "").toLowerCase();
  const garnishText = recipe.garnish || "";
  const ingredientIds = (recipe.ingredients || []).map((ingredient) => getIngredientKey(ingredient));
  const ingredientCategories = (recipe.ingredients || []).map((ingredient) => ingredient.category || "");

  let glass = recipe.visualGlass || "coupe";
  if (/古典|rocks|old/.test(glassText)) glass = "rocks";
  else if (/海波|高杯|collins|highball|铜杯/.test(glassText)) glass = "highball";
  else if (/马天尼|鸡尾酒|martini|cocktail/.test(glassText)) glass = "martini";
  else if (/香槟|笛|flute/.test(glassText)) glass = "flute";
  else if (/葡萄酒|wine|飓风|风/.test(glassText)) glass = "wine";

  let palette = "gold";
  if (ingredientIds.some((id) => ["campari", "cranberry_juice", "grenadine"].includes(id))) palette = "ruby";
  if (ingredientIds.some((id) => ["aperol", "orange_juice", "peach_puree"].includes(id))) palette = "spritz";
  if (ingredientIds.some((id) => ["lime_juice", "green_chartreuse"].includes(id))) palette = "lime";
  if (ingredientIds.some((id) => ["coffee", "coffee_liqueur"].includes(id))) palette = "coffee";
  if (ingredientIds.some((id) => ["pineapple_juice", "coconut_milk", "egg_white"].includes(id))) palette = "cream";
  if (ingredientIds.some((id) => ["tomato_juice"].includes(id))) palette = "tomato";
  if (ingredientIds.some((id) => id.startsWith("custom_")) && ingredientCategories.includes("果汁/酸味")) palette = "spritz";

  let garnish = recipe.visualGarnish || "none";
  if (/橙|orange/.test(garnishText) || ingredientIds.includes("orange_liqueur") || ingredientIds.includes("orange_juice")) garnish = "orange";
  if (/青柠|lime/.test(garnishText) || ingredientIds.includes("lime_juice")) garnish = "lime";
  if (/柠檬|lemon/.test(garnishText) || ingredientIds.includes("lemon_juice")) garnish = "lemon";
  if (/樱桃|cherry/.test(garnishText)) garnish = "cherry";
  if (/薄荷|mint/.test(garnishText)) garnish = "mint";
  if (/橄榄|olive/.test(garnishText)) garnish = "olive";
  if (/盐/.test(garnishText)) garnish = "salt";

  const bubbles = ingredientIds.some((id) => ["prosecco", "champagne", "soda_water", "tonic_water", "ginger_beer"].includes(id)) || ingredientCategories.includes("气泡/软饮");
  const ice = ["rocks", "highball", "wine"].includes(glass);

  return { glass, palette, garnish, bubbles, ice };
}

function renderCocktailVisual(recipe) {
  const visual = inferCocktailVisual(recipe || {});
  const visualSeed = String((recipe && (recipe.id || recipe.name)) || visual.glass + visual.palette + visual.garnish);
  let visualHash = 0;
  for (let index = 0; index < visualSeed.length; index += 1) {
    visualHash = ((visualHash << 5) - visualHash + visualSeed.charCodeAt(index)) | 0;
  }
  const visualId = "cv" + Math.abs(visualHash);
  const drinkGradientId = "drinkGradient" + visualId;
  const visualGlowId = "visualGlow" + visualId;
  const palettes = {
    gold: ["#f3d99a", "#c8843e"],
    ruby: ["#f06a4e", "#8d2119"],
    spritz: ["#ffb45f", "#d85632"],
    lime: ["#b9d982", "#4d8f55"],
    coffee: ["#8d5b3a", "#2b1710"],
    cream: ["#fff2cd", "#d6a85c"],
    tomato: ["#e95d46", "#9c251b"],
  };
  const colors = palettes[visual.palette] || palettes.gold;
  const glassShapes = {
    rocks: '<path d="M74 84h112l-12 112H86z" fill="rgba(255,255,255,.055)" stroke="rgba(247,234,216,.55)" stroke-width="5" stroke-linejoin="round"/><path d="M83 124h94l-7 62H90z" fill="url(#drinkGradient)"/>',
    highball: '<path d="M82 44h96l-10 152H92z" fill="rgba(255,255,255,.055)" stroke="rgba(247,234,216,.55)" stroke-width="5" stroke-linejoin="round"/><path d="M88 108h84l-5 80H94z" fill="url(#drinkGradient)"/>',
    martini: '<path d="M54 56h152l-66 78v52h32" fill="none" stroke="rgba(247,234,216,.58)" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="M70 68h120l-52 58z" fill="url(#drinkGradient)"/>',
    coupe: '<path d="M62 72c16 52 120 52 136 0zM130 124v62M98 188h64" fill="none" stroke="rgba(247,234,216,.58)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M75 80h110c-20 30-90 30-110 0z" fill="url(#drinkGradient)"/>',
    flute: '<path d="M103 38h54l-12 126h-30zM130 164v28M108 194h44" fill="none" stroke="rgba(247,234,216,.58)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M109 78h42l-8 78h-26z" fill="url(#drinkGradient)"/>',
    wine: '<path d="M76 62c0 58 108 58 108 0c0 78-32 88-54 88s-54-10-54-88zM130 150v42M102 194h56" fill="none" stroke="rgba(247,234,216,.58)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M83 86c15 36 79 36 94 0c-7 44-29 58-47 58s-40-14-47-58z" fill="url(#drinkGradient)"/>',
  };
  const garnishShapes = {
    orange: '<circle cx="178" cy="77" r="22" fill="#f7a64a" stroke="#ffd59a" stroke-width="4"/><path d="M178 57v40M158 77h40M164 63l28 28M192 63l-28 28" stroke="#ffd59a" stroke-width="2" opacity=".75"/>',
    lime: '<circle cx="178" cy="77" r="21" fill="#93bf62" stroke="#d9efa7" stroke-width="4"/><path d="M178 58v38M159 77h38M165 64l26 26M191 64l-26 26" stroke="#d9efa7" stroke-width="2" opacity=".75"/>',
    lemon: '<ellipse cx="178" cy="77" rx="25" ry="18" fill="#f4d868" stroke="#fff1a8" stroke-width="4"/>',
    cherry: '<circle cx="177" cy="78" r="13" fill="#d64a49"/><path d="M178 66c6-18 18-22 28-22" fill="none" stroke="#79a95b" stroke-width="4" stroke-linecap="round"/>',
    mint: '<path d="M174 82c-18-20-13-44 13-51c13 24 6 41-13 51zM188 86c8-23 29-29 43-10c-12 19-29 23-43 10z" fill="#7dbb75"/>',
    olive: '<ellipse cx="178" cy="78" rx="18" ry="13" fill="#8fa35c"/><circle cx="183" cy="78" r="5" fill="#c45c4a"/>',
    salt: '<path d="M56 58h148" stroke="#f8e9d5" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 10" opacity=".9"/>',
    none: "",
  };
  const ice = visual.ice ? '<rect x="106" y="113" width="25" height="25" rx="5" fill="rgba(255,255,255,.22)" transform="rotate(-12 118 125)"/><rect x="133" y="139" width="23" height="23" rx="5" fill="rgba(255,255,255,.18)" transform="rotate(14 144 151)"/>' : "";
  const bubbles = visual.bubbles ? '<circle class="cocktail-bubble b1" cx="119" cy="99" r="4"/><circle class="cocktail-bubble b2" cx="143" cy="124" r="3"/><circle class="cocktail-bubble b3" cx="132" cy="76" r="3"/>' : "";

  const glassShape = (glassShapes[visual.glass] || glassShapes.coupe).replace(/drinkGradient/g, drinkGradientId);

  return '<svg class="cocktail-visual" data-glass="' + esc(visual.glass) + '" data-palette="' + esc(visual.palette) + '" data-garnish="' + esc(visual.garnish) + '" viewBox="0 0 260 240" role="img" aria-label="' + esc((recipe && recipe.name ? recipe.name : "鸡尾酒") + "图标") + '" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="' + drinkGradientId + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + colors[0] + '"/><stop offset="1" stop-color="' + colors[1] + '"/></linearGradient><radialGradient id="' + visualGlowId + '" cx=".5" cy=".52" r=".52"><stop offset="0" stop-color="' + colors[0] + '" stop-opacity=".34"/><stop offset="1" stop-color="' + colors[1] + '" stop-opacity="0"/></radialGradient></defs>' +
    '<rect x="18" y="8" width="224" height="224" rx="58" fill="rgba(255,255,255,.035)" stroke="rgba(240,196,123,.12)"/><circle cx="130" cy="123" r="98" fill="url(#' + visualGlowId + ')"/><g class="cocktail-glass">' +
    glassShape + ice + bubbles + (garnishShapes[visual.garnish] || "") +
    '</g><path d="M64 204c31 14 101 14 132 0" stroke="rgba(240,196,123,.2)" stroke-width="5" stroke-linecap="round"/></svg>';
}

function getSampleCabinetItems() {
  return [
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
}

function getSampleRecipeItems() {
  return [
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
}

function buildSampleCabinetRecords() {
  return getSampleCabinetItems().map((item) => ({
    id: DB._id(),
    ...normalizeCabinetItem({ ...item, remaining: item.total })
  }));
}

function buildSampleRecipeRecords() {
  return getSampleRecipeItems().map((item) => ({
    id: DB._id(),
    ...item,
    ...normalizeGlass(item.glass),
    ...normalizeGarnish(item.garnish),
    ingredients: item.ingredients.map(normalizeRecipeIngredient),
    createdAt: DB.today()
  }));
}

function seedSampleData() {
  if (DB.get("cabinet").length || DB.get("recipes").length) return;

  DB.setMany({
    cabinet: buildSampleCabinetRecords(),
    recipes: buildSampleRecipeRecords(),
    log: []
  });
}

function resetSampleData() {
  if (!confirm("清空所有数据并重新加载示例数据？")) return;
  DB.clear();
  seedSampleData();
  location.reload();
}

function clearCabinetData() {
  if (!confirm("清空所有酒柜数据？")) return;
  DB.set("cabinet", []);
  toast("已清空酒柜", "ok");
  if (typeof renderCabinet === "function") renderCabinet();
}

function addSampleCabinetData() {
  if (DB.get("cabinet").length && !confirm("添加测试数据会覆盖当前酒柜，继续？")) return;
  DB.set("cabinet", buildSampleCabinetRecords());
  toast("已添加测试酒柜", "ok");
  if (typeof renderCabinet === "function") renderCabinet();
}

function clearRecipeData() {
  if (!confirm("清空所有配方数据？")) return;
  DB.set("recipes", []);
  toast("已清空配方", "ok");
  if (typeof renderRecipes === "function") renderRecipes();
}

function addSampleRecipeData() {
  if (DB.get("recipes").length && !confirm("添加测试数据会覆盖当前配方，继续？")) return;
  DB.set("recipes", buildSampleRecipeRecords());
  toast("已添加测试配方", "ok");
  if (typeof renderRecipes === "function") renderRecipes();
}

function saveCabinet(id, type, brand, openedDate, total, remaining) {
  const normalized = normalizeCabinetItem({ type, brand, openedDate, total, remaining, unit: "ml" });
  const items = DB.get("cabinet");
  if (id) {
    const index = items.findIndex((item) => item.id === id);
    if (index > -1) {
      items[index] = { ...items[index], ...normalized };
    }
  } else {
    items.push({ id: DB._id(), ...normalized });
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
  return getStandardIngredients();
}

function saveRecipe(id, name, glass, instructions, garnish, ingredients) {
  const normalizedIngredients = ingredients.map(normalizeRecipeIngredient);
  const normalizedGlass = normalizeGlass(glass);
  const normalizedGarnish = normalizeGarnish(garnish);
  const items = DB.get("recipes");
  if (id) {
    const index = items.findIndex((item) => item.id === id);
    if (index > -1) {
      items[index] = { ...items[index], name, ...normalizedGlass, instructions, ...normalizedGarnish, ingredients: normalizedIngredients };
    }
  } else {
    items.push({ id: DB._id(), name, ...normalizedGlass, instructions, ...normalizedGarnish, ingredients: normalizedIngredients, createdAt: DB.today() });
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
    .filter((ingredient) => !cabinet.some((item) => ingredientMatches(item, ingredient) && item.remaining >= ingredient.amount))
    .map((ingredient) => ({ name: ingredient.name }));
}

function getAvailBrands(ingredient, needAmount) {
  return DB.get("cabinet").filter((item) => ingredientMatches(item, ingredient) && item.remaining >= needAmount);
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
      ingredientId: ingredient.ingredientId,
      amount: ingredient.amount,
      unit: ingredient.unit,
      brands: getAvailBrands(ingredient, ingredient.amount)
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
      const key = getIngredientKey(ingredient);
      const selectId = "bs_" + key.replace(/\W/g, "");
      brandSelections[key] = ingredient.brands[0].id;
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
    const key = getIngredientKey(ingredient);
    const select = document.getElementById("bs_" + key.replace(/\W/g, ""));
    if (select) {
      select.addEventListener("change", () => {
        brandSelections[key] = select.value;
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
    const brands = getAvailBrands(ingredient, ingredient.amount);
    const key = getIngredientKey(ingredient);
    const target = brands.length === 1
      ? cabinet.find((item) => item.id === brands[0].id)
      : cabinet.find((item) => item.id === brandMap[key]);

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

globalThis.DB = DB;
globalThis.getStandardIngredients = getStandardIngredients;
globalThis.getIngredientCategories = getIngredientCategories;
globalThis.getIngredientsByCategory = getIngredientsByCategory;
globalThis.getStandardIngredient = getStandardIngredient;
globalThis.getStandardGlasses = getStandardGlasses;
globalThis.getStandardGlass = getStandardGlass;
globalThis.normalizeGlass = normalizeGlass;
globalThis.getStandardGarnishes = getStandardGarnishes;
globalThis.getStandardGarnish = getStandardGarnish;
globalThis.normalizeGarnish = normalizeGarnish;
globalThis.inferCocktailVisual = inferCocktailVisual;
globalThis.renderCocktailVisual = renderCocktailVisual;
globalThis.checkMissing = checkMissing;
globalThis.executeMake = executeMake;

ensureStorageVersion();
seedSampleData();
