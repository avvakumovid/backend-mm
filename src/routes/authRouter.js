import {Router} from 'express';
import AuthController from '../controller/authController.js'
import {check} from 'express-validator';
import authMiddleware from '../middleware/authMiddleware.js';


const router = new Router()

router.post('/registration', [
    check('username', 'Имя пользлваьеля не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 символов').isLength({min: 4})
], AuthController.registration)
router.post('/login', AuthController.login)
router.get('/auth', authMiddleware, AuthController.auth)


export default router