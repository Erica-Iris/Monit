/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-23 19:49:09
 * @Description: 存储配置
 */
import Store from 'electron-store'
import { reactive, watch } from 'vue'

import { getValue, setValue } from '#/ipc'

// 初始化 store
export const store = new Store({
  // 版本更新初始化
  migrations: {
    '>=0.3.0': (store) => {
      store.clear()
    },
    '>=0.7.0': (store) => {
      if (store.has('_config')) {
        store.set('config', store.get('_config'))
        store.delete('_config')
      }
    },
  },
})

/**
 * @description: 保存值
 * @param {string} node 节点名
 * @param {string} key 键名
 * @param {Object} value 值
 * @return {*}
 */
export const cset = (node: string, key: string, value: Object): void => {
  // console.log(node + '.' + key, value)
  store.set(node + '.' + key, value) // 存储值
}

/**
 * @description: 读取值
 * @param {string} node 节点名
 * @param {string} key 键名
 * @param {Object} define 默认值
 * @return {*}
 */
export const cget = (node: string, key: string, define: Object): Object => {
  // console.log(node + '.' + key, define)
  return store.get(node + '.' + key) ?? define // 读取值
}

/**
 * @description:  storage 构造器
 * @return {*}
 */
export const storage = (): { set: Function; get: Function } => {
  return {
    // 保存值
    set: (key: string, value: Object) => {
      setValue(key, value)
    },
    // 读取值
    get: (key: string, define: Object) => {
      return getValue(key, define)
    },
  }
}

export const storage1 = <T extends string>(data: Record<T, Object>, handle?: Record<T, Function>) => {
  for (const key in data) {
    data[key] = getValue(key, data[key])
  }

  const record = reactive(data)

  // 增加修改监听
  if (handle) {
    for (const key in handle) {
      watch(
        () => record[key],
        () => handle[key](),
        { deep: true }
      )
    }
  }
}
