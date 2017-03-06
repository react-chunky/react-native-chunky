'use strict'

const path = require('path')
const spawn = require('child_process').spawn

const appDir = process.cwd()
const libDir = path.resolve(appDir, 'node_modules')
const reactNativeDir = path.resolve(libDir, 'react-native')
const packagerDir = path.resolve(reactNativeDir, 'packager')
const reactNativeChunkyDir = __dirname
const reactNativeChunkyAppDir = path.resolve(reactNativeChunkyDir, 'app')

const packagerExec = path.resolve(packagerDir, 'packager.sh')

const packager = spawn(packagerExec, ['--verbose', '--projectRoots', `${appDir},${reactNativeChunkyAppDir}`])

packager.stdout.on('data', (data) => {
  console.log(`${data}`);
})

packager.stderr.on('data', (data) => {
  console.log(`${data}`)
});

packager.on('close', (code) => {
  console.log(`exit ${code}`)
})
