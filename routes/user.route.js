import express from 'express'
import * as controller from '../controllers/user.controller.js'
import { createNewAccessToken } from '../utils/generateTokens.js';
const router = express.Router();


router.post('/register', controller.register)

router.post('/login', controller.login)

router.get('/protected', controller.verifyToken, controller.protectedFunc)

router.get('/token', createNewAccessToken)

export default router