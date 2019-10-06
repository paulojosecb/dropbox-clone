import fs from 'fs'
import util from 'util'

import express from 'express'

const statPromisified = util.promisify(fs.stat)
const router = express.Router()

router.use((req, res) => {
  const url = `./storage${req.baseUrl}${req.url}`

  fs.readdir(url, async (err, files) => {
    try {
      if (err) throw err

      const result = await Promise.all(files.map(async file => {
        const stats = await statPromisified(`${url}${file}`)

        return {
          name: file,
          isFile: stats.isFile(),
          url: `${url}${file}`
        }
      }))

      res.send(result)
    } catch (err) {
      res.send(err)
    }
  })
})

export default router
