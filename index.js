#!/usr/bin/env node
/**
 *
 * 首先我们都知道操作系统中都会有一个 PATH 环境变量，
 * 当系统调用一个命令的时候，就会在PATH变量中注册的路径中寻找，如果注册的路径中有就调用，
 * 否则就提示命令没找到。我们可以通过process.env获取本机系统中所有的环境变量，
 * 所以这句话主要是帮助脚本找到node的脚本解释器，可以理解为调用系统中的node来解析我们的脚本。
 */

require('babel-register')
require('babel-polyfill')
require('babel-core').transform('code', {
  presets: [
    [
      require('babel-preset-latest-node'),
      {
        target: 'current'
      }
    ]
  ]
})

require('./src')
