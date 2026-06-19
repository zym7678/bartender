const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const dir = __dirname;

const iconsDir = path.join(dir, '..', 'icons');
const wwwIconsDir = path.join(dir, '..', 'www', 'icons');

[iconsDir, wwwIconsDir].forEach(d => fs.mkdirSync(d, { recursive: true }));

const svg192 = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 192 192\"><rect width=\"192\" height=\"192\" rx=\"32\" fill=\"#d4a574\"/><text x=\"96\" y=\"118\" font-size=\"80\" text-anchor=\"middle\" fill=\"#fff\">🍸</text></svg>';
const svg512 = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><rect width=\"512\" height=\"512\" rx=\"64\" fill=\"#d4a574\"/><text x=\"256\" y=\"310\" font-size=\"200\" text-anchor=\"middle\" fill=\"#fff\">🍸</text></svg>';

Promise.all([
  sharp(Buffer.from(svg192)).resize(192, 192).png().toFile(path.join(iconsDir, 'icon-192.png')),
  sharp(Buffer.from(svg192)).resize(192, 192).png().toFile(path.join(wwwIconsDir, 'icon-192.png')),
  sharp(Buffer.from(svg192)).resize(180, 180).png().toFile(path.join(iconsDir, 'icon-180.png')),
  sharp(Buffer.from(svg192)).resize(180, 180).png().toFile(path.join(wwwIconsDir, 'icon-180.png')),
  sharp(Buffer.from(svg512)).resize(512, 512).png().toFile(path.join(iconsDir, 'icon-512.png')),
  sharp(Buffer.from(svg512)).resize(512, 512).png().toFile(path.join(wwwIconsDir, 'icon-512.png')),
  sharp(Buffer.from(svg512)).resize(1024, 1024).png().toFile(path.join(iconsDir, 'icon-1024.png')),
]).then(() => console.log('All icons generated!')).catch(console.error);
