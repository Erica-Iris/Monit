/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-28 22:47:41
 * @Description: main 入口
 */

import { app, BrowserWindow, protocol } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'

import { appEvent } from '#/event'
import { initTray } from './tray'
import { autoWindow, createWindow } from './window'

// 调试模式
const isDebug = process.env.NODE_ENV === 'development'

// 注册协议
protocol.registerSchemesAsPrivileged([{ scheme: 'monit', privileges: { secure: true, standard: true } }])

// 准备就绪
app.on('ready', async () => {
  // 应用事件监听
  appEvent()

  // 初始化系统托盘
  initTray()

  // 自动打开窗口
  autoWindow()

  // TODO 自动检查更新
  if (!isDebug)
    autoUpdater.checkForUpdatesAndNotify({
      title: 'Monit - update',
      body: '已下载新版本，将会在软件关闭后自动更新。',
    })
})

// 调试模式下安装 vue-devtools
app.on('ready', () => {
  if (isDebug) {
    try {
      installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools 安装失败：', e.toString())
    }
  }
})

// mac 激活窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('welcome')
  }
})

// 阻止托盘退出
app.on('window-all-closed', () => {})
