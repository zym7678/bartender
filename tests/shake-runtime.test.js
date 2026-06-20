const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function createElementStub() {
  return {
    innerHTML: "",
    textContent: "",
    className: "",
    classList: {
      add() {},
      remove() {},
      toggle() {},
    },
    getAttribute() {
      return "";
    },
    appendChild() {},
  };
}

const elements = {};
const localStorageStore = {};
const context = {
  console,
  localStorage: {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(localStorageStore, key) ? localStorageStore[key] : null;
    },
    setItem(key, value) {
      localStorageStore[key] = String(value);
      this[key] = String(value);
    },
    removeItem(key) {
      delete localStorageStore[key];
      delete this[key];
    },
  },
  confirm: () => true,
  location: { pathname: "/shake.html", reload() {} },
  navigator: {},
  document: {
    createElement() {
      const node = createElementStub();
      Object.defineProperty(node, "innerHTML", {
        get() {
          return this.textContent
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
        },
        set(value) {
          this._innerHTML = value;
        },
      });
      return node;
    },
    getElementById(id) {
      if (!elements[id]) elements[id] = createElementStub();
      return elements[id];
    },
    querySelectorAll() {
      return [];
    },
    addEventListener() {},
    body: { appendChild() {} },
  },
  setTimeout,
  clearTimeout,
};

vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "common.js"), "utf8"), context);

const html = fs.readFileSync(path.join(__dirname, "..", "shake.html"), "utf8");
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .filter((script) => script.trim() && !script.includes("serviceWorker"));

scripts.forEach((script) => vm.runInContext(script, context));

assert.match(elements["shake-start-visual"].innerHTML, /cocktail-visual/);

const recipe = context.DB.get("recipes")[0];
context.showDrink(recipe);
assert.match(elements["shake-result"].innerHTML, /cocktail-visual/);

console.log("PASS shake page renders cocktail visual");
