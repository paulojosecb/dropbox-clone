import fs, { stat } from 'fs'
import util from 'util'

import express from 'express'

const statPromisified = util.promisify(fs.stat)
const router = express.Router()

router.use(async (req, res) => {
  const url = `./.${req.baseUrl}${req.url}`

  const urlStats = await statPromisified(url)

  if (urlStats.isFile()) {
    res.download(url)
  } else {
    fs.readdir(url, async (err, files) => {
      try {
        if (err) throw err

        const result = await Promise.all(files.map(async file => {
          const stats = await statPromisified(`${url}/${file}`)

          return {
            name: file,
            isFile: stats.isFile(),
            url: `${req.url === '/' ? '' : req.url}/${file}`
          }
        }))

        res.send(result)
      } catch (err) {
        res.send(err)
      }
    })
  }
})

export default router
