const test = require ('ava')
const http = require ('http')

function request(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            res.on('data', (buffer) => {
                resolve(buffer.toString('utf8'))
            })
        }).on('error', (e) => {
            reject(e)
        })
    })
}

test('Form in Index', async t => {
    const html = await request('http://localhost:3000/')
    console.log('html', html)
    t.regex(html, /<form/)
})