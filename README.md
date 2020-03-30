# URLBrowser

URL 处理插件。

## Install

### CDN

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/url-browser@1.0.0/dist/url-browser.js"></script>
```

### NPM

```
npm i url-browser -S
```

在 module 中引入

```
import URLBrowser from 'url-browser'

const myUrl = new URLBrowser('https://test.com/path?a=1&b=2#hash')

```

## Methods

### URLBrowser.prototype.addQuery(name: string | {[propName: string]: string}, value?: any)

### URLBrowser.prototype.removeQuery(name: string | string[])

### URLBrowser.prototype.setHash(hash: string)

## Author

[Travis](https://github.com/godxiaoji)
