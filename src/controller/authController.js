import UserService from '../service/userService.js'
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

function generateAccessToken(id, username) {
    const payload = {id, username}
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class AuthController {

    async registration(req, res) {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({message: 'Ошибка при регистрации', error})
        }
        const {username, password} = req.body;
        const candidate = await UserService.getUser(username)
        if(candidate.status === 200){
            return res.status(400).json({message: 'Пользователь с таким username уже существует'})
        }
        const hashPassword = bcrypt.hashSync(password, 7)
        const response = await UserService.createUser(username, hashPassword);
        return res.status(response.status).json(response.message)
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const response = await UserService.getUser(username)
            if (response.status > 200) {
                return res.status(response.status).json(response.message)
            }
            const validatePassword = bcrypt.compareSync(password, response.user.password)
            if (!validatePassword) {
                return res.status(400).json({message: `Неверный пароль`})
            }
            const token = generateAccessToken(response.user._id, response.user.username)
            return res.json(token)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async auth(req, res) {
        try {
            const {user} = await UserService.getUserById(req.user.id)
            // const token = generateAccessToken(user._id, user.username)

            return res.json({
                // token,
                user: {
                    id: user.id,
                    username: user.username,
                    totalMoney: user.totalMoney,
                    income: user.income,
                    expenses: user.expenses
                }
            })
        } catch (e) {
            console.log(e)
        }
    }


}

export default new AuthController()