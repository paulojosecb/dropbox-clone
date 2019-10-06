import { Request, Response } from 'express'
import User from '../models/User'

class UserController {
    public create = async (req: Request, res: Response): Promise<Response> => {
      const user = await User.create(req.body)
      return res.json(user)
    }
}

export default UserController
