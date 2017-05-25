@echo off
title React Packager
node "%~dp0..\node_modules\react-native\local-cli\cli.js" start %*
pause
exit
