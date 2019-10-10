import { Router } from 'express'

import UserController from '../controllers/UserController'

const router = Router()

router.post('/login', UserController.login)
router.post('/signup', UserController.signUp)

export default router
