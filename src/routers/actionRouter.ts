import express from 'express'

const router = express.Router()

router.get('/dir/:name/:path', (req, res) => {
  res.send(`Creating dir with ${req.params.name} on ${req.params.path}`)
})

router.delete('/dir/:uid/:path', (req, res) => {
  res.send(`Removing dir with ${req.params.uid}`)
})

router.get('/file/:uid/:path', (req, res) => {
  res.send(`Removing file with ${req.params.uid}`)
})

export default router
