import { Response, Request } from 'express'
import mongoose from 'mongoose'

import User from '../models/User'

class LoginController {
    public login = async (req: Request, res: Response): Promise<Response> => {
      const { email, password } = req.body

      if (!email || !password) {
        return res.json({
          error: 'Bad formatted request'
        })
      }

      try {
        const query = { email: email }
        const user = await User.find(query)
        return res.json('Login')
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
        return res.json(user)
      } catch (err) {
        return res.json(err)
      }
    }
}

export default new LoginController()
