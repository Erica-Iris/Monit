/*
 * @Author: fzf404
 * @Date: 2022-05-26 19:48:32
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-18 18:30:57
 * @Description: window 管理
 */

import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import { winEvent } from '#/event'
import { pluginList } from '#/plugin'
import { cget } from '~/storage'

// 窗口网格大小
const BasicMesh = 100

// 创建窗口
export const createWindow = (name) => {
  // 判断窗口启动
  const isOpen = BrowserWindow.getAllWindows().find((item) => item.title === name)
  if (isOpen) {
    // 展示窗口
    return isOpen.show()
  }

  // 窗口大小
  const size = pluginList.find(({ name: n }) => n === name).size

  // 读取配置
  const x = cget(name, 'x', 20)
  const y = cget(name, 'y', 20)
  const top = cget(name, 'top', false)

  // 创建窗口
  const win = new BrowserWindow({
    x: x,
    y: y,
    title: name,
    width: size[0] * BasicMesh,
    height: size[1] * BasicMesh,
    alwaysOnTop: top, // 置顶

    frame: false, // 隐藏边框
    resizable: false, // 不可调整大小
    hasShadow: false, // 阴影
    transparent: true, // 透明
    skipTaskbar: true, // 隐藏任务栏图标
    fullscreenable: false, // 禁止全屏
    roundedCorners: false, // 圆角

    // vibrancy: 'dark', // 毛玻璃效果
    visualEffectState: 'active', // 保持激活

    webPreferences: {
      nodeIntegration: true, // node 集成
      contextIsolation: false, // 上下文隔离
      webSecurity: false, // 跨域
    },
  })

  // 根据模式启动应用
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 加载应用
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/' + name)
    // 默认不开启调试器
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    // 生产模式
    createProtocol('monit') // 创建协议
    win.loadURL('monit://./index.html#/' + name) // 加载应用
  }

  // 监听事件
  winEvent(win, name)
}

// 开机自启窗口
export const autoWindow = () => {
  const openPlugins = cget('config', 'open', ['welcome'])
  openPlugins.forEach((item) => {
    createWindow(item)
  })
}
