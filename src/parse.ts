/**
 * URL Parse
 * @param {String} url
 */
function parse(url: string) {
  if (typeof url !== 'string') {
    throw new TypeError('"url" must be a string type.')
  }

  try {
    // https://test.com/path?a=1&b=2#hash
    let temp: string[] = url.split('//')
    const protocol = temp.shift()

    // test.com/path?a=1&b=2#hash
    temp = temp.join('//').split('/')

    // test.com
    const host = temp.shift() as string
    const hostname = host.split(':')[0]
    const port = host.split(':')[1] || ''

    let pathname = ''
    let search = ''
    let hash = ''

    // path ? a=1&b=2#hash
    temp = temp.join('/').split('?')

    if (temp[1]) {
      // have queryString
      pathname = '/' + temp.shift()
      temp = temp.join('?').split('#')
      search = '?' + temp.shift()
    } else if (temp[0]) {
      temp = temp[0].split('#')
      pathname = '/' + temp.shift()
    }

    if (pathname === '') {
      pathname = '/'
    }

    if (temp[0]) {
      hash = '#' + temp.join('#')
    }

    const queryString = search.substring(1)
    const query: Record<string, string | string[]> = {}
    const queries: string[] = []

    if (search) {
      queryString.split('&').forEach(v => {
        queries.push(v)

        const [key, value] = v.split('=')
        if (query[key] != null) {
          if (typeof query[key] === 'string') {
            query[key] = [query[key]] as string[]
          }
          const queryArray = query[key] as string[]
          queryArray.push(decodeURIComponent(value))
        } else {
          query[key] = decodeURIComponent(value)
        }
      })
    }

    return {
      hash: hash || null,
      search: search || null,
      host,
      hostname,
      path: pathname + search,
      pathname,
      protocol,
      port: port || null,
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

export default parse
