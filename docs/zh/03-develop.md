<!--
 * @Author: fzf404
 * @Date: 2022-09-23 20:37:31
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-17 20:33:56
 * @Description: 开发文档
-->

推荐使用 `Visual Studio Code` 作为代码编辑器，并安装工作区推荐插件。

应用共分为 `渲染进程` 和 `主进程` 两部分。

## 🥇 运行项目

> 在开始任何项目之前，一定要先把项目运行起来

```bash
# 1. clone 项目
git clone https://github.com/fzf404/Monit.git -b beta --depth 1

# 2. 安装 pnpm
npm i -g pnpm

# 3. 更换国内源
pnpm config set registry https://registry.npmmirror.com
pnpm config set electron_mirror https://registry.npmmirror.com/-/binary/electron/

# 4. 安装依赖
pnpm i

# 5. 运行项目
pnpm dev

# 6. 打包项目
pnpm build
```

### 🖱️ 开发说明

> 构建成功后可在 `release` 目录下找到安装包

使用快捷键 `Ctrl + R / Cmd + R` 重新加载页面。

使用快捷键 `Ctrl + Shift + I / Cmd + Option + I` 打开开发者工具。

### 🏆 贡献指南

> 欢迎提交 `Pull Requests`，如果有任何问题，可以在 `Issues` 中提出

请将代码提交到 `beta` 分支。

执行 `commit` 操作时自动进行代码格式化。

`Visual Studio Code` 中安装 `Todo Tree` 插件后，可以在 `待办事项` 标签页查看项目的 `TODO` 事项。

## 🎇 渲染进程

> 渲染进程使用 vue3 进行开发

### ♿ 插件开发

> 首先需要在 `app/plugins` 目录下新建插件

#### 1. 创建插件

> 创建 `app/plugins/demo.vue` 文件

```vue
<template>
  <article class="flex-col-center">
    <h1 class="text-lg">Demo</h1>
  </article>
</template>
```

可以在 `app/theme/basic.scss` 中找到 `flex-col-center` 的样式定义。

可以在 [tailwindcss](https://tailwindcss.com/) 文档中找到 `text-lg` 的样式定义。

#### 2. 注册插件

> 修改 `custom/plugin.ts` 文件

```ts
{ name: 'demo', size: [2, 2], description: '示例', debug: true },
```

可以在 `app/router.js` 中查看自动生成路由的代码。

#### 3. 响应式存储

> 修改 `app/plugins/demo.vue` 文件

```vue
<template>
  <article class="flex-col-center">
    <h1 class="text-lg">{{ store.title }}</h1>
  </article>
</template>

<script setup>
import { storage } from '~/storage'

// 响应式存储
const store = storage({
  title: 'Demo',
})
</script>
```

可以在 `lib/storage.ts` 中查看响应式存储的代码。

#### 4. 接入设置

> 修改 `app/plugins/demo.vue` 文件

```vue
<template>
  <Setting size="wide" :setting="[{ id: 'title', label: '标题', type: 'text' }]" :config="store" />
  <article class="flex-col-center">
    <h1 class="text-lg">{{ store.title }}</h1>
  </article>
</template>

<script setup>
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'

// 响应式存储
const store = storage({
  title: 'Demo',
})
</script>
```

接下来就可以设置标题的文字了。

可以在 `app/components/setting.vue` 中查看 `setting` 组件的代码。

#### 5. 发送通知

> 修改 `app/plugins/demo.vue` 文件

```vue
<template>
  <Setting
    size="wide"
    :setting="[
      {
        id: 'notice',
        label: '消息通知',
        type: 'checkbox',
      },
      { id: 'title', label: '标题', type: 'text' },
    ]"
    :config="store"
    :onSave="onSave"
  />
  <article class="flex-col-center">
    <h1 class="text-lg">{{ store.title }}</h1>
  </article>
</template>

<script setup>
import { sendAlert, sendNotice } from '#/ipc'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'

// 响应式存储
const store = storage(
  {
    title: 'Demo',
    notice: false,
  },
  {
    title: () => {
      // 发送通知
      sendNotice(`标题已改为：${store.title}`)
    },
  }
)

// 设置保存
const onSave = () => {
  // 发送提醒
  sendAlert('设置已保存！')
}
</script>
```

此时在修改设置点击保存后，会弹窗：`设置已保存！`。

在 `title` 修改时，会弹出通知：`标题已改为：xxx`。

可以在 `coustom/ipc.ts` 中查看 `sendAlert` 和 `sendNotice` 的代码。

可以在 `coustom/event.ts` 中查看`sendAlert` 和 `sendNotice` 的事件代码。

#### 6. 更多

> 更多开发请查看其他插件的源码
>
> 程序员成长的标志就是能看懂别人的代码

建议阅读顺序：`welcome` -> `image` -> `count` -> `config` -> `todo` -> `github` -> `juejin` -> `clock` -> `camera` -> `music`

### 💡 主题开发

待补充...

### ⛰️ 布局开发

待补充...

## ⛪ 主进程

> 可以在 `coustom/event.ts` 及 `coustom/ipc.ts` 中注册事件

待补充...
