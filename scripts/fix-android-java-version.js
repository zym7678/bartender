const fs = require('node:fs');
const path = require('node:path');

const GENERATED_GRADLE_FILES = [
  path.join('android', 'app', 'capacitor.build.gradle'),
  path.join('android', 'capacitor-cordova-android-plugins', 'build.gradle'),
];

function fixAndroidJavaVersion(rootDir = path.resolve(__dirname, '..')) {
  let changed = 0;
  const checked = [];

  for (const relativePath of GENERATED_GRADLE_FILES) {
    const gradlePath = path.join(rootDir, relativePath);
    checked.push(gradlePath);

    if (!fs.existsSync(gradlePath)) {
      throw new Error(`Missing generated Gradle file: ${gradlePath}`);
    }

    const original = fs.readFileSync(gradlePath, 'utf8');
    const fixed = original.replaceAll('JavaVersion.VERSION_21', 'JavaVersion.VERSION_17');

    if (fixed !== original) {
      fs.writeFileSync(gradlePath, fixed);
      changed += 1;
    }
  }

  return { changed, checked };
}

if (require.main === module) {
  const result = fixAndroidJavaVersion();
  console.log(`Android Java version check complete. Updated ${result.changed} file(s).`);
}

module.exports = { fixAndroidJavaVersion };
