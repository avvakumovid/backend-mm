import {Router} from 'express';
import CategoriesController from '../controller/categoriesController.js';


const router = new Router()

router.post('/create', CategoriesController.createCategories)


export default router