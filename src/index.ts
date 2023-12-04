import parse from './parse'

type QueryValue = unknown

type QueryBundle = Record<string, QueryValue>

class URLHandler {
  hash: string | null
  search: string | null
  host: string
  hostname: string
  pathname: string
  protocol: string
  port: string | null
  href: string
  origin: string
  query: Record<string, string>
  queries: string[]
  queryString: string

  /**
   * 构造函数
   * @param url url
   * @param base 固定前缀
   * @returns 自身
   */
  constructor(url: string, base = '') {
    const data = parse(base + url)

    for (const i in data) {
      this[i] = data[i]
    }

    return this
  }

  /**
   * 增加query参数
   * @param bundle 参数对象
   * @returns 自身
   */
  public addQuery(bundle: QueryBundle): URLHandler

  /**
   * 增加query参数
   * @param name 参数名
   * @param value 参数值
   * @returns 自身
   */
  public addQuery(name: string, value: QueryValue): URLHandler

  public addQuery(name: string | QueryBundle, value?: QueryValue) {
    let queries = name as QueryBundle

    if (typeof name === 'string') {
      queries = {
        [name]: value
      }
    }

    for (const k in queries) {
      const v = queries[k]
      if (v != null) {
        this.query[k.toString()] =
          v == null
            ? ''
            : typeof v === 'object'
            ? JSON.stringify(v)
            : v.toString()
      }
    }

    return queryUpdate(this)
  }

  /**
   * 删除query参数
   * @param name 参数名/参数名数组
   * @returns 自身
   */
  public removeQuery(name: string | string[]) {
    let queries: string[] = []

    if (typeof name === 'string') {
      queries = [name]
    } else if (name instanceof Array) {
      queries = name
    }

    queries.forEach(v => {
      delete this.query[v]
    })

    return queryUpdate(this)
  }

  /**
   * 设置哈希
   * @param hash 哈希值（支持设置null清空）
   * @returns 自身
   */
  public setHash(hash: string | null): URLHandler {
    if (hash == null) {
      hash = null
    } else if (hash.toString().indexOf('#') !== 0) {
      hash = '#' + hash
    }

    this.hash = hash
    return queryUpdate(this)
  }

  /**
   * 获得完整URL地址
   * @returns url
   */
  toString() {
    return this.href
  }
}

function queryUpdate(self: URLHandler) {
  const queries = []

  for (const i in self.query) {
    queries.push(i + '=' + encodeURIComponent(self.query[i]))
  }

  self.queries = queries
  self.queryString = queries.join('&')
  self.search = queries.length === 0 ? null : '?' + self.queryString
  self.href = self.origin + self.pathname + (self.search || '') + (self.hash || '')

  return self
}

export default URLHandler
