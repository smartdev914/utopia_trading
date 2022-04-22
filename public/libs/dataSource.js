const getValueFrom = (o, s) => {
    s = s.replace(/\[(\w+)\]/g, '.$1')
    s = s.replace(/^\./, '')
    const a = s.split('.')
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i]
        if (k in o) {
            o = o[k]
        } else {
            return
        }
    }
    return o
}

window.dataSourceWidget = class dataSourceWidget {
    constructor(query, variables, displayed_data, key) {
        this.query = query
        this.variables = variables
        this.displayed_data = displayed_data
        this.key = key
        this.setupData = function (json) {
            return 'data' in json ? getValueFrom(json.data, this.displayed_data) : null
        }
        this.fetcher = function () {
            const keyHeader = { 'X-API-KEY': this.key }
            return fetch('https://graphql.bitquery.io', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    ...keyHeader,
                },
                body: JSON.stringify({ query: this.query, variables: this.variables }),
                credentials: 'same-origin',
            })
        }
    }
}
