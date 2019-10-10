import util from 'util'
import fs from 'fs'

import { Response, Request } from 'express'

import User from '../models/User'

const mkdirPromisified = util.promisify(fs.mkdir)

class LoginController {
    public login = async (req: Request, res: Response): Promise<Response> => {
      const { email, password } = req.body

      console.log(email)

      if (!email || !password) {
        return res.json({
          error: 'Bad formatted request'
        })
      }

      try {
        const query = { email: email }
        const user = await User.find(query)
        return res.json(user[0])
      } catch (err) {
        return res.json(err)
      }
    }

    public signUp = async (req: Request, res: Response): Promise<Response> => {
      const { email, password } = req.body

      if (!email || !password) {
        return res.json({
          error: 'Bad formatted request'
        })
      }

      try {
        const user = await User.create({ email, password })
        await mkdirPromisified(`././storage/${user._id}`)
        return res.json(user)
      } catch (err) {
        return res.json(err)
      }
    }
}

export default new LoginController()
