const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const wwwCss = fs.readFileSync(path.join(root, 'www', 'style.css'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const wwwSw = fs.readFileSync(path.join(root, 'www', 'sw.js'), 'utf8');

function assertMobileLayoutStyles(source, label) {
  assert.match(
    source,
    /nav\s*\{[\s\S]*?position\s*:\s*fixed[\s\S]*?bottom\s*:/,
    `${label} should keep navigation fixed to the bottom without depending on viewport breakpoints`,
  );

  assert.match(
    source,
    /body\s*\{[\s\S]*?overflow-y\s*:\s*auto/,
    `${label} should allow vertical page scrolling on touch devices`,
  );

  assert.match(
    source,
    /body\s*\{[\s\S]*?touch-action\s*:\s*pan-y/,
    `${label} should keep vertical touch scrolling enabled`,
  );

  assert.match(
    source,
    /\.recipe-preview-header\s*\{[^}]*flex-wrap\s*:\s*wrap/,
    `${label} should allow recipe title actions to wrap instead of overflowing`,
  );

  assert.match(
    source,
    /\.recipe-preview\s+\.item-actions\s*\{[^}]*width\s*:\s*auto/,
    `${label} should keep recipe action buttons from taking a full row width inside a flex header`,
  );
}

assertMobileLayoutStyles(css, 'style.css');
assertMobileLayoutStyles(wwwCss, 'www/style.css');

function assertServiceWorkerFreshness(source, label) {
  assert.doesNotMatch(
    source,
    /caches\.match\(e\.request\)\.then\(\(cached\)\s*=>\s*cached\s*\|\|\s*fetch\(e\.request\)\)/,
    `${label} should not use cache-first responses that can keep old CSS in the installed app`,
  );

  assert.match(
    source,
    /fetch\((?:event|e)\.request\)[\s\S]*caches\.open/,
    `${label} should try the network/current packaged asset before falling back to cache`,
  );
}

assertServiceWorkerFreshness(sw, 'sw.js');
assertServiceWorkerFreshness(wwwSw, 'www/sw.js');
