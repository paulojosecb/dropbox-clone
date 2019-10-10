import { Response, Request } from 'express'
import multer from 'multer'

class UploadController {
    public upload = (req: Request, res: Response): void => {
      const { id, path } = req.params

      console.log(path)

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `././storage/${id}/${path}`)
        },
        filename: function (req, file, cb) {
          // req.body is empty... here is where req.body.new_file_name doesn't exists
          cb(null, file.originalname)
        }
      })

      const upload = multer({ storage: storage }).single('file')

      upload(req, res, (err) => {
        if (err) {
          res.json({
            error: 'Error uploading file'
          })
        } else {
          res.send('Ola')
        }
      })
    }

    public rootUpload = (req: Request, res: Response): void => {
      const { id } = req.params

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `././storage/${id}`)
        },
        filename: function (req, file, cb) {
          // req.body is empty... here is where req.body.new_file_name doesn't exists
          cb(null, file.originalname)
        }
      })

      const upload = multer({ storage: storage }).single('file')

      upload(req, res, (err) => {
        if (err) {
          res.json({
            error: 'Error uploading file'
          })
        } else {
          res.send('Ola')
        }
      })
    }
}

export default new UploadController()
