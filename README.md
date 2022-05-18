# URLHandler

URL 处理插件。

## Install

### CDN

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@godxiaoji/url-handler@1.1.1/dist/url-handler.js"></script>
```

### NPM

```
npm i @godxiaoji/url-handler -S
```

在 module 中引入

```
import URLHandler from '@godxiaoji/url-handler'

const myUrl = new URLHandler('https://test.com/path?a=1&b=2#hash')

```

## Methods

### URLHandler.prototype.addQuery(name: string | {[propName: string]: string}, value?: any)

### URLHandler.prototype.removeQuery(name: string | string[])

### URLHandler.prototype.setHash(hash: string)

## Author

[Travis](https://github.com/godxiaoji)
