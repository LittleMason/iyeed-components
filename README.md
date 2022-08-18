# iyeed-ui
[![Npm Version](https://img.shields.io/npm/v/iyeed-ui)](https://www.npmjs.com/package/iyeed-ui) [![Build Status](https://img.shields.io/github/workflow/status/staticdeng/iyeed-ui/Node.js%20CI)](https://github.com/staticdeng/iyeed-ui/actions)

[![NPM](https://nodei.co/npm/iyeed-ui.png)](https://nodei.co/npm/iyeed-ui/)

iyeed company front-end components base of Vue.js.

Easy to use by providing simple api. Unlike other component libraries, it uses the browser itself to scroll instead of js, so it has a smaller code size but does not lose the user experience.

**中文** | [English](./README.en-US.md)

## Preview
[Online demo](https://haimalairen.github.io/)

## Installation

#### Install the npm package

```bash
# npm
npm install iyeed-ui --save
```

#### Import

```js
import Vue from 'vue';
import IyeedUI from 'iyeed-ui';

Vue.use(IyeedUI);
```

## Internationalization support

Support Chinese zh-CN and English en-US, the default is zh-CN.

```js
import IyeedUI from 'iyeed-ui';

Vue.use(IyeedUI, {
  lang: 'en-US'
})
```

You can also use `locale.use()` to specify the language.

```js
import IyeedUI, { locale } from 'iyeed-ui';

Vue.use(IyeedUI);
locale.use('en-US');
```

## Usage

### Basic Usage


### Load Error Info

### add-demo
