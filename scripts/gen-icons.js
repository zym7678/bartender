const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..');
const sourceIcon = path.join(rootDir, 'assets', 'app-icon-source.jfif');
const iconsDir = path.join(rootDir, 'icons');
const wwwIconsDir = path.join(rootDir, 'www', 'icons');
const androidResDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');

const androidIconSizes = [
  ['mipmap-mdpi', 48, 108],
  ['mipmap-hdpi', 72, 162],
  ['mipmap-xhdpi', 96, 216],
  ['mipmap-xxhdpi', 144, 324],
  ['mipmap-xxxhdpi', 192, 432],
];

function ensureDirs() {
  [iconsDir, wwwIconsDir].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));
  androidIconSizes.forEach(([dir]) => fs.mkdirSync(path.join(androidResDir, dir), { recursive: true }));
}

function squareIcon(size, outputPath) {
  return sharp(sourceIcon)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .png()
    .toFile(outputPath);
}

async function roundIcon(size, outputPath) {
  const circle = Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>
    </svg>`,
  );

  return sharp(sourceIcon)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .composite([{ input: circle, blend: 'dest-in' }])
    .png()
    .toFile(outputPath);
}

async function generateIcons() {
  if (!fs.existsSync(sourceIcon)) {
    throw new Error(`Missing icon source image: ${sourceIcon}`);
  }

  ensureDirs();

  const tasks = [
    squareIcon(180, path.join(iconsDir, 'icon-180.png')),
    squareIcon(180, path.join(wwwIconsDir, 'icon-180.png')),
    squareIcon(192, path.join(iconsDir, 'icon-192.png')),
    squareIcon(192, path.join(wwwIconsDir, 'icon-192.png')),
    squareIcon(512, path.join(iconsDir, 'icon-512.png')),
    squareIcon(512, path.join(wwwIconsDir, 'icon-512.png')),
    squareIcon(1024, path.join(iconsDir, 'icon-1024.png')),
  ];

  for (const [densityDir, launcherSize, foregroundSize] of androidIconSizes) {
    const dir = path.join(androidResDir, densityDir);
    tasks.push(squareIcon(launcherSize, path.join(dir, 'ic_launcher.png')));
    tasks.push(roundIcon(launcherSize, path.join(dir, 'ic_launcher_round.png')));
    tasks.push(squareIcon(foregroundSize, path.join(dir, 'ic_launcher_foreground.png')));
  }

  await Promise.all(tasks);
  console.log('All icons generated from assets/app-icon-source.jfif');
}

generateIcons().catch((error) => {
  console.error(error);
  process.exit(1);
});
