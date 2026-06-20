const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { fixAndroidJavaVersion } = require('../scripts/fix-android-java-version');

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'bartender-java-version-'));

try {
  const appGradlePath = path.join(tempRoot, 'android', 'app', 'capacitor.build.gradle');
  const pluginGradlePath = path.join(tempRoot, 'android', 'capacitor-cordova-android-plugins', 'build.gradle');

  fs.mkdirSync(path.dirname(appGradlePath), { recursive: true });
  fs.mkdirSync(path.dirname(pluginGradlePath), { recursive: true });

  fs.writeFileSync(
    appGradlePath,
    [
      'android {',
      '  compileOptions {',
      '      sourceCompatibility JavaVersion.VERSION_21',
      '      targetCompatibility JavaVersion.VERSION_21',
      '  }',
      '}',
      '',
    ].join('\n'),
  );

  fs.writeFileSync(
    pluginGradlePath,
    [
      'android {',
      '    compileOptions {',
      '        sourceCompatibility JavaVersion.VERSION_21',
      '        targetCompatibility JavaVersion.VERSION_21',
      '    }',
      '}',
      '',
    ].join('\n'),
  );

  const result = fixAndroidJavaVersion(tempRoot);

  assert.equal(result.changed, 2);
  assert.equal(fs.readFileSync(appGradlePath, 'utf8').includes('JavaVersion.VERSION_21'), false);
  assert.equal(fs.readFileSync(pluginGradlePath, 'utf8').includes('JavaVersion.VERSION_21'), false);
  assert.equal(fs.readFileSync(appGradlePath, 'utf8').includes('JavaVersion.VERSION_17'), true);
  assert.equal(fs.readFileSync(pluginGradlePath, 'utf8').includes('JavaVersion.VERSION_17'), true);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
