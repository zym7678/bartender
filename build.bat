@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    调酒库 - Android APK 构建脚本
echo ========================================
echo.

REM Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到 Java JDK。
    echo    请安装 Java 17+：https://adoptium.net/
    echo    或运行：winget install EclipseAdoptium.Temurin.17.JDK
    goto :error
)
echo ✓ Java OK

REM Check ANDROID_HOME
if not defined ANDROID_HOME (
    if not defined ANDROID_SDK_ROOT (
        echo ❌ 未设置 ANDROID_HOME 或 ANDROID_SDK_ROOT 环境变量。
        echo    请安装 Android Studio 并在环境变量中设置 ANDROID_HOME。
        goto :error
    )
    set ANDROID_HOME=%ANDROID_SDK_ROOT%
)
echo ✓ Android SDK OK

echo.
echo ===== 1/3: 同步 Web 资源到 Android =====
call npx cap sync android
if errorlevel 1 goto :error

echo.
echo ===== 2/3: 构建 Debug APK =====
cd android
call gradlew assembleDebug
cd ..
if errorlevel 1 goto :error

echo.
echo ===== 3/3: 生成完成 =====
echo.
echo ✅ APK 生成成功！
echo    位置：android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo 安装方法：
echo   1. 将 APK 传送到手机
echo   2. 在手机上打开文件管理器，点击 APK 安装
echo   3. 如提示未知来源，请在设置中允许安装
echo.
echo 或者用数据线连接手机后运行：
echo   adb install android\app\build\outputs\apk\debug\app-debug.apk
echo.
goto :end

:error
echo.
echo ❌ 构建失败，请检查上方错误信息。
echo.
:end
pause
