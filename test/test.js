const assert = require('assert')
const URLHandler = require('../dist/url-handler')

describe('#myUrl = new URLHandler("https://test.com/path?a=1&b=2#hash")', () => {
  const url = 'https://test.com/path?a=1&b=2#hash'

  describe('returns', () => {
    const myUrl = new URLHandler(url)

    it('myUrl.host should be "test.com"', () => {
      assert.strictEqual(myUrl.host, 'test.com')
    })

    it('myUrl.protocol should be "https:"', () => {
      assert.strictEqual(myUrl.protocol, 'https:')
    })

    it('myUrl.pathname should be "/path"', () => {
      assert.strictEqual(myUrl.pathname, '/path')
    })

    it('myUrl.queryString should be "a=1&b=2"', () => {
      assert.strictEqual(myUrl.queryString, 'a=1&b=2')
    })

    it('myUrl.hash should be "#hash"', () => {
      assert.strictEqual(myUrl.hash, '#hash')
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
