const uuid = require('uuid')
const fs = require('fs')
const util = require('util')
const http = require('http')
const express = require('express')

const id = uuid.v4()

const app = express()

const logger = express.Router()

const statPromisified = util.promisify(fs.stat)

logger.use((req, res) => {
  const url = `./storage${req.baseUrl}${req.url}`

  try {
    fs.readdir(url, async (err, files) => {

      const result = await Promise.all(files.map(async file => {
        const stats = await statPromisified(`${url}${file}`)

        return {
          name: file,
          isFile: stats.isFile(),
          url: `${url}${file}`
        }
      }))

      res.send(result)
    })
  } catch (err) {
    console.log(err)
  }
})

app.use('/:uid', logger)

app.listen(3000, () => console.log('Listening...'))

// fs.readdir('./storage', (err, files) => {
//     files.forEach(file => {
//         fs.stat(`./storage/${file}`, (err, stats) => {
//             if (err) throw err
//             console.log(stats.isFile())
//         })
//     })
// })

// 2802b978-882d-4460-b4b5-bc9f06ea1b89

// http.createServer((req, res ) => {
//     console.log(req.url)
//     // res.write(req.url)
// }).listen(3000)
