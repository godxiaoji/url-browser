import parse from './parse'

type QueryValue = any

type QueryBundle = Record<string, QueryValue>

class URLHanlder {
  hash: string
  search: string
  host: string
  hostname: string
  pathname: string
  protocol: string
  port: string
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
  public addQuery(bundle: QueryBundle): URLHanlder

  /**
   * 增加query参数
   * @param name 参数名
   * @param value 参数值
   * @returns 自身
   */
  public addQuery(name: string, value: QueryValue): URLHanlder

  public addQuery(name: string | QueryBundle, value?: QueryValue) {
    let querys = name as QueryBundle

    if (typeof name === 'string') {
      querys = {
        [name]: value
      }
    }

    for (const k in querys) {
      const v = querys[k]
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
    let querys: string[] = []

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

  /**
   * 设置哈希
   * @param hash 哈希值（支持设置null清空）
   * @returns 自身
   */
  setHash(hash: string | null): URLHanlder {
    if (hash == null) {
      hash = ''
    } else if (hash.toString().indexOf('#') !== 0) {
      hash = '#' + hash
    }

    this.hash = hash
    this.href = this.origin + this.pathname + this.search + this.hash

    return this
  }

  /**
   * 获得完整URL地址
   * @returns url
   */
  toString() {
    return this.href
  }
}

function queryUpdate(self: URLHanlder) {
  const queries = []

  for (const i in self.query) {
    queries.push(i + '=' + encodeURIComponent(self.query[i]))
  }

  self.queries = queries
  self.queryString = queries.join('&')
  self.search = queries.length === 0 ? '' : '?' + self.queryString
  self.href = self.origin + self.pathname + self.search + self.hash

  return self
}

export default URLHanlder
