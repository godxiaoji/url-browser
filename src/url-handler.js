/**
 * @namespace URL
 * @version 1.0.0
 * @author Travis [godxiaoji@gmail.com]
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.URLHandler = factory();
  }
}(typeof self !== 'undefined' ? self : this, (function () {
  'use strict';

  class URL {
    constructor(url, base = '') {
      const data = parse(base + url)

      for (let i in data) {
        this[i] = data[i]
      }

      return this
    }

    addQuery (name, value) {
      let querys = name

      if (typeof name === 'string') {
        querys = {
          [name]: value
        }
      }

      for (let k in querys) {
        const v = querys[k]
        if (v != null) {
          this.query[k.toString()] =
            typeof v === 'object' ? JSON.stringify(v) : v.toString()
        }
      }

      return queryUpdate(this)
    }

    removeQuery (name) {
      let querys = []

      if (typeof name === 'string') {
        querys = [name]
      } else if (name instanceof Array) {
        querys = name
      }

      querys.forEach(v => {
        delete this.query[v]
      })

      return queryUpdate(this)
    }

    setHash (hash) {
      if (hash == null) {
        hash = ''
      } else if (hash.toString().indexOf('#') !== 0) {
        hash = '#' + hash
      }

      this.hash = hash
      this.href = this.origin + this.pathname + this.search + this.hash

      return this
    }

    toString () {
      return this.href
    }
  }

  function queryUpdate (self) {
    const queries = []

    for (let i in self.query) {
      queries.push(i + '=' + encodeURIComponent(self.query[i]))
    }

    self.queries = queries
    self.queryString = queries.join('&')
    self.search = queries.length === 0 ? '' : '?' + self.queryString
    self.href = self.origin + self.pathname + self.search + self.hash

    return self
  }

  /**
   * URL解析
   * @param {String} url
   */
  const parse = function (url) {
    if (typeof url !== 'string') {
      throw new TypeError('"url" must be a string type.')
    }

    try {
      let temp = url.split('//')
      const protocol = temp[0]

      temp = temp[1].split('/')

      const host = temp.shift()
      const hostname = host.split(':')[0]
      const port = host.split(':')[1] || ''

      let pathname = ''
      let search = ''
      let hash = ''

      temp = temp.join('/').split('?')

      if (temp[1]) {
        // 说明有queryString
        pathname = '/' + temp[0]
        temp = temp[1].split('#')
        search = '?' + temp.shift()
      } else if (temp[0]) {
        temp = temp[0].split('#')
        pathname = '/' + temp.shift()
      }

      if (temp[0]) {
        hash = '#' + temp[0]
      }

      const queryString = search.substr(1)
      const query = {}
      const queries = []

      if (search) {
        queryString.split('&').forEach(v => {
          queries.push(v)
          query[v.split('=')[0]] = decodeURIComponent(v.split('=')[1])
        })
      }

      return {
        hash,
        search,
        host,
        hostname,
        pathname,
        protocol,
        port,
        href: url,
        origin: protocol + '//' + host,
        query,
        queries,
        queryString
      }
    } catch (e) {
      throw new Error('Invalid URL.')
    }
  }

  return URL
})));
