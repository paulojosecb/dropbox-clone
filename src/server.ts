import fs from 'fs'
import path from 'path'
import http from 'http'
import url from 'url'

http.createServer((req, res) => {
  const sanitizePath = path.normalize(req.url!).replace(/^(\.\.[\/\\])+/, '')
  const pathname = path.join(__dirname, sanitizePath)

  fs.stat(pathname, (err) => {
    if (err) {
      res.statusCode = 404
      res.end('File not found')
    }

    if (fs.statSync(pathname).isDirectory()) {
      fs.readdir(pathname, (err, files) => {
        res.end(files[0])
      })
    }

    // read file from file system
    fs.readFile(pathname, function (err, data) {
      if (err) {
        res.statusCode = 500
        res.end(`Error getting the file: ${err}.`)
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext
        // if the file is found, set Content-type and send data
        //   res.setHeader('Content-type', mimeType[ext] || 'text/plain')
        res.end(data)
      }
    })
  })
}).listen(3000)
