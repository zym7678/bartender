const fs = require("fs");

const files = ["index.html", "cabinet.html", "recipes.html", "shake.html", "make.html", "log.html"];
const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi;

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const scripts = [...html.matchAll(re)].map((match) => match[1]).filter((script) => script.trim());
  scripts.forEach((script, index) => {
    try {
      new Function(script);
    } catch (error) {
      console.error(file + " script " + index + ": " + error.message);
      process.exitCode = 1;
    }
  });
}
