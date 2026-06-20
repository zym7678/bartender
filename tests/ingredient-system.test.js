const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function createLocalStorage() {
  const store = {};
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem(key, value) {
      store[key] = String(value);
      this[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
      delete this[key];
    },
    key(index) {
      return Object.keys(store)[index] || null;
    },
    clear() {
      Object.keys(store).forEach((key) => {
        delete store[key];
        delete this[key];
      });
    },
    get length() {
      return Object.keys(store).length;
    },
    _dump() {
      return store;
    },
  };
}

function loadCommon() {
  const localStorage = createLocalStorage();
  const context = {
    console,
    localStorage,
    confirm: () => true,
    location: { reload() {} },
    document: {
      createElement() {
        return {
          textContent: "",
          get innerHTML() {
            return this.textContent
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;");
          },
        };
      },
      getElementById() {
        return {
          textContent: "",
          className: "",
          classList: { add() {}, remove() {} },
          appendChild() {},
        };
      },
      addEventListener() {},
      body: { appendChild() {} },
      querySelectorAll() {
        return [];
      },
    },
    setTimeout,
    clearTimeout,
  };

  vm.createContext(context);
  const source = fs.readFileSync(path.join(__dirname, "..", "common.js"), "utf8");
  vm.runInContext(source, context);
  return context;
}

function test(name, fn) {
  try {
    fn();
    console.log("PASS", name);
  } catch (error) {
    console.error("FAIL", name);
    throw error;
  }
}

test("standard ingredients expose stable ids and categories", () => {
  const app = loadCommon();
  const ingredient = app.getStandardIngredient("橙味利口酒");

  assert.equal(ingredient.id, "orange_liqueur");
  assert.equal(ingredient.category, "利口酒");
});

test("saving cabinet and recipes stores ingredient ids", () => {
  const app = loadCommon();
  app.DB.clear();

  app.saveCabinet("", "橙味利口酒", "君度", "2026-06-19", 700, 410);
  app.saveRecipe("", "玛格丽特", "玛格丽特杯", "摇匀。", "盐边", [
    { name: "橙味利口酒", amount: 20, unit: "ml" },
  ]);

  const cabinet = app.DB.get("cabinet")[0];
  const recipe = app.DB.get("recipes")[0];

  assert.equal(cabinet.ingredientId, "orange_liqueur");
  assert.equal(recipe.ingredients[0].ingredientId, "orange_liqueur");
});

test("inventory matching and deduction use ingredient id instead of display text", () => {
  const app = loadCommon();
  app.DB.clear();
  app.DB.set("cabinet", [
    {
      id: "stock-1",
      ingredientId: "orange_liqueur",
      type: "橙子利口酒",
      brand: "君度",
      openedDate: "2026-06-19",
      total: 700,
      remaining: 410,
      unit: "ml",
    },
  ]);

  const recipe = {
    id: "recipe-1",
    name: "玛格丽特",
    ingredients: [
      { ingredientId: "orange_liqueur", name: "橙味利口酒", amount: 20, unit: "ml" },
    ],
  };

  assert.deepEqual(app.checkMissing(recipe), []);

  app.executeMake(recipe, {});

  assert.equal(app.DB.get("cabinet")[0].remaining, 390);
});

test("cocktail visual is inferred from glass ingredients and garnish", () => {
  const app = loadCommon();
  const visual = app.inferCocktailVisual({
    name: "阿佩罗橙光 Aperol Spritz",
    glass: "葡萄酒杯",
    garnish: "橙片",
    ingredients: [
      { ingredientId: "aperol", name: "阿佩罗", amount: 60, unit: "ml" },
      { ingredientId: "prosecco", name: "普罗赛克起泡酒", amount: 90, unit: "ml" },
      { ingredientId: "soda_water", name: "苏打水", amount: 30, unit: "ml" },
    ],
  });

  assert.equal(visual.glass, "wine");
  assert.equal(visual.palette, "spritz");
  assert.equal(visual.garnish, "orange");
  assert.equal(visual.bubbles, true);
});

test("cocktail visual renders a reusable svg", () => {
  const app = loadCommon();
  const svg = app.renderCocktailVisual({
    name: "尼格罗尼 Negroni",
    glass: "古典杯",
    garnish: "橙皮",
    ingredients: [
      { ingredientId: "gin", name: "金酒", amount: 30, unit: "ml" },
      { ingredientId: "campari", name: "金巴利", amount: 30, unit: "ml" },
      { ingredientId: "sweet_vermouth", name: "甜味美思", amount: 30, unit: "ml" },
    ],
  });

  assert.match(svg, /<svg/);
  assert.match(svg, /cocktail-visual/);
  assert.match(svg, /data-glass="rocks"/);
  assert.match(svg, /data-garnish="orange"/);
});

test("ingredients can be filtered by category for two-step picking", () => {
  const app = loadCommon();
  const liqueurs = app.getIngredientsByCategory("利口酒");

  assert.ok(liqueurs.some((ingredient) => ingredient.id === "orange_liqueur"));
  assert.ok(liqueurs.every((ingredient) => ingredient.category === "利口酒"));
});

test("custom ingredients are saved under other category and still match by generated id", () => {
  const app = loadCommon();
  app.DB.clear();

  app.saveCabinet("", "自制香料糖浆", "自制", "2026-06-19", 300, 120);
  app.saveRecipe("", "测试酒", "古典杯", "搅拌。", "其他装饰", [
    { name: "自制香料糖浆", amount: 20, unit: "ml" },
  ]);

  const cabinet = app.DB.get("cabinet")[0];
  const recipe = app.DB.get("recipes")[0];

  assert.equal(cabinet.category, "其他");
  assert.equal(recipe.ingredients[0].category, "其他");
  assert.equal(cabinet.ingredientId, recipe.ingredients[0].ingredientId);
  assert.deepEqual(app.checkMissing(recipe), []);
});

test("standard glasses and garnishes expose ids and custom fallback", () => {
  const app = loadCommon();

  assert.equal(app.getStandardGlass("古典杯").visualGlass, "rocks");
  assert.equal(app.getStandardGarnish("橙皮").visualGarnish, "orange");
  assert.equal(app.normalizeGarnish("自制花草").garnishId, "custom");
  assert.equal(app.normalizeGarnish("自制花草").garnish, "自制花草");
});

test("sample cabinet data starts with remaining equal to total", () => {
  const app = loadCommon();
  app.DB.clear();
  app.addSampleCabinetData();

  const cabinet = app.DB.get("cabinet");
  assert.ok(cabinet.length > 0);
  cabinet.forEach((item) => {
    assert.equal(item.remaining, item.total);
  });
});

test("test data controls clear and refill cabinet and recipes independently", () => {
  const app = loadCommon();
  app.DB.clear();

  app.addSampleCabinetData();
  app.addSampleRecipeData();
  assert.ok(app.DB.get("cabinet").length > 0);
  assert.ok(app.DB.get("recipes").length > 0);

  app.clearCabinetData();
  assert.equal(app.DB.get("cabinet").length, 0);
  assert.ok(app.DB.get("recipes").length > 0);

  app.clearRecipeData();
  assert.equal(app.DB.get("recipes").length, 0);
});
