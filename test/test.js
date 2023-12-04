const assert = require('assert')
const URLHandler = require('../dist/url-handler')
const URL = require('url')

describe('#myUrl = new URLHandler("https://test.com/path/to?a=1&b=2#hash")', () => {
  const url = 'https://test.com/path?a=1&b=2#hash'

  describe('returns', () => {
    const myUrl = new URLHandler(url)
    const nodeUrl = URL.parse(url, true)

    it(`myUrl.host should be "${nodeUrl.host}"`, () => {
      assert.strictEqual(myUrl.host, nodeUrl.host)
    })

    it(`myUrl.protocol should be "${nodeUrl.protocol}"`, () => {
      assert.strictEqual(myUrl.protocol, nodeUrl.protocol)
    })

    it(`myUrl.port should be "${nodeUrl.port}"`, () => {
      assert.strictEqual(myUrl.port, nodeUrl.port)
    })

    it(`myUrl.pathname should be "${nodeUrl.pathname}"`, () => {
      assert.strictEqual(myUrl.pathname, nodeUrl.pathname)
    })

    it(`myUrl.path should be "${nodeUrl.path}"`, () => {
      assert.strictEqual(myUrl.path, nodeUrl.path)
    })

    it(`myUrl.search should be "${nodeUrl.search}"`, () => {
      assert.strictEqual(myUrl.search, nodeUrl.search)
    })

    it(`myUrl.queryString should be "a=1&b=2"'`, () => {
      assert.strictEqual(myUrl.queryString, 'a=1&b=2')
    })

    it(`myUrl.hash should be "${nodeUrl.hash}"`, () => {
      assert.strictEqual(myUrl.hash, nodeUrl.hash)
    })
  })

  describe('returns B', () => {
    const url =
      'https://www.test.com:8080'
    const myUrl = new URLHandler(url)
    const nodeUrl = URL.parse(url, true)

    it(`myUrl.host should be "${nodeUrl.host}"`, () => {
      assert.strictEqual(myUrl.host, nodeUrl.host)
    })

    it(`myUrl.port should be "${nodeUrl.port}"`, () => {
      assert.strictEqual(myUrl.port, nodeUrl.port)
    })

    it(`myUrl.protocol should be "${nodeUrl.protocol}"`, () => {
      assert.strictEqual(myUrl.protocol, nodeUrl.protocol)
    })

    it(`myUrl.pathname should be "${nodeUrl.pathname}"`, () => {
      assert.strictEqual(myUrl.pathname, nodeUrl.pathname)
    })

    it(`myUrl.path should be "${nodeUrl.path}"`, () => {
      assert.strictEqual(myUrl.path, nodeUrl.path)
    })

    it(`myUrl.search should be "${nodeUrl.search}"`, () => {
      assert.strictEqual(myUrl.search, nodeUrl.search)
    })

    it(`myUrl.hash should be "${nodeUrl.hash}"`, () => {
      assert.strictEqual(myUrl.hash, nodeUrl.hash)
    })
  })

  describe('returns C', () => {
    const url =
      'https://auth.test.com/?return_to=/oauth/authorize?client_id%3Dxxx%26redirect_uri%3Dhttp://www.test.com%26response_type%3Dcode%26state%3DBj74mY%26time%3D1701689505019%26inner%3Dtrue#aaa#'
    const myUrl = new URLHandler(url)
    const nodeUrl = URL.parse(url, true)


    it(`myUrl.host should be "${nodeUrl.host}"`, () => {
      assert.strictEqual(myUrl.host, nodeUrl.host)
    })

    it(`myUrl.port should be "${nodeUrl.port}"`, () => {
      assert.strictEqual(myUrl.port, nodeUrl.port)
    })

    it(`myUrl.protocol should be "${nodeUrl.protocol}"`, () => {
      assert.strictEqual(myUrl.protocol, nodeUrl.protocol)
    })

    it(`myUrl.pathname should be "${nodeUrl.pathname}"`, () => {
      assert.strictEqual(myUrl.pathname, nodeUrl.pathname)
    })

    it(`myUrl.path should be "${nodeUrl.path}"`, () => {
      assert.strictEqual(myUrl.path, nodeUrl.path)
    })

    it(`myUrl.search should be "${nodeUrl.search}"`, () => {
      assert.strictEqual(myUrl.search, nodeUrl.search)
    })

    it(`myUrl.hash should be "${nodeUrl.hash}"`, () => {
      assert.strictEqual(myUrl.hash, nodeUrl.hash)
    })
  })

  describe('addQuery', () => {
    it('myUrl.addQuery("a", 1) 增加单个参数', () => {
      assert.strictEqual(
        new URLHandler(url).addQuery('c', '测试').toString(),
        `https://test.com/path?a=1&b=2&c=${encodeURIComponent('测试')}#hash`
      )
    })

    it('myUrl.addQuery({"c": 3, "d": 4}) 增加多个参数', () => {
      assert.strictEqual(
        new URLHandler(url).addQuery({ c: 3, d: 4 }).toString(),
        'https://test.com/path?a=1&b=2&c=3&d=4#hash'
      )
    })

    it('myUrl.addQuery("e", {"a": 1, "b": 2}) 参数值是个对象，会进行序列化', () => {
      assert.strictEqual(
        new URLHandler(url).addQuery('e', { a: 1, b: 2 }).toString(),
        'https://test.com/path?a=1&b=2&e=' +
          encodeURIComponent(JSON.stringify({ a: 1, b: 2 })) +
          '#hash'
      )
    })
  })

  describe('removeQuery', () => {
    it('myUrl.removeQuery("b") 删除单个参数', () => {
      assert.strictEqual(
        new URLHandler(url).removeQuery('b').toString(),
        'https://test.com/path?a=1#hash'
      )
    })

    it('myUrl.removeQuery(["a", "b"]) 删除多个参数', () => {
      assert.strictEqual(
        new URLHandler(url).removeQuery(['a', 'b']).toString(),
        'https://test.com/path#hash'
      )
    })
  })

  describe('setHash', () => {
    it('myUrl.setHash("#hash2") 设置hash', () => {
      assert.strictEqual(
        new URLHandler(url).setHash('#hash2').toString(),
        'https://test.com/path?a=1&b=2#hash2'
      )
    })

    it('myUrl.setHash("hash3") 支持不加#号', () => {
      assert.strictEqual(
        new URLHandler(url).setHash('hash3').toString(),
        'https://test.com/path?a=1&b=2#hash3'
      )
    })

    it('myUrl.setHash(null) 设置为空', () => {
      assert.strictEqual(
        new URLHandler(url).setHash(null).toString(),
        'https://test.com/path?a=1&b=2'
      )
    })
  })
})
