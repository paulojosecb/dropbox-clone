import fs from 'fs'

import express from 'express'
import rimraf from 'rimraf'

import UploadController from '../controllers/UploadController'

const router = express.Router()

router.post('/dir', (req, res) => {
  const { id, path, name } = req.body
  console.log(name)
  if (!id) {
    res.json({
      error: 'Not Authorized'
    })
  } else {
    if (!name) {
      res.json({
        error: 'Bad formatted request'
      })
    } else {
      fs.mkdir(`././storage/${id}${path !== '' ? `/${path}/` : '/'}${name}`, (err) => {
        if (err) {
          res.json({
            error: 'Error creating directory'
          })
        } else {
          res.json({
            Sucess: 'Directory created'
          })
        }
      })
    }
  }
})

router.post('/delete/dir', (req, res) => {
  const { id, path } = req.body

  if (!id) {
    res.json({
      error: 'Not authorized'
    })
  } else {
    if (!path) {
      res.json({
        error: 'Bad formatted request'
      })
    } else {
      rimraf(`././storage/${id}/${path}`, (err) => {
        if (err) {
          res.json({
            error: 'Error deleting directory'
          })
        } else {
          res.json({
            sucess: 'Directory deleted'
          })
        }
      })
    }
  }
})

router.post('/delete/file', (req, res) => {
  const { id, path } = req.body

  if (!id) {
    res.json({
      error: 'Not authorized'
    })
  } else {
    if (!path) {
      res.json({
        error: 'Bad formatted request'
      })
    } else {
      fs.unlink(`././storage/${id}/${path}`, (err) => {
        if (err) {
          res.json({
            error: 'Error deleting file'
          })
        } else {
          res.json({
            sucess: 'File deleted'
          })
        }
      })
    }
  }
})

router.post('/upload/:id/:path', UploadController.upload)
router.post('/upload/:id', UploadController.rootUpload)

export default router
