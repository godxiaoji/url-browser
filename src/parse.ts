/**
 * URL解析
 * @param {String} url
 */
function parse(url: string) {
  if (typeof url !== 'string') {
    throw new TypeError('"url" must be a string type.')
  }

  try {
    let temp = url.split('//')
    const protocol = temp[0]

    temp = temp[1].split('/')

    const host = temp.shift() as string
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
    const query: Record<string, string> = {}
    const queries: string[] = []

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

export default parse
