import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import UserController from "../controller/userController.js";
import { check } from "express-validator";

const router = new Router();

router.post(
  "/addTransaction",
  [
    authMiddleware,
    check("categoriesName", "Категория не мождет быть пустая").notEmpty(),
    check("summa", "Сумма не мождет быть пустая").notEmpty(),
    check("type", "Тип не мождет быть пустой").notEmpty(),
    check("name", "Название не мождет быть пустое").notEmpty(),
  ],

  UserController.addTransaction
);
router.put(
  "/removeTransaction",
  authMiddleware,
  UserController.deleteTransaction
);
router.put(
  "/updateTransaction",
  authMiddleware,
  UserController.updateTransaction
);

export default router;
