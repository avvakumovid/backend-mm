import {Router} from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import UserController from '../controller/userController.js';


const router = new Router()

router.post('/addTransaction', authMiddleware, UserController.addTransaction)


export default router