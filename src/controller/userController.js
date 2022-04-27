import UserService from "../services/userService"

class UserController {
    
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers()
            return res.json(users)
        } catch (e) {

        }
    }

    async getUser(req, res) {
        try {
            const {username} = req.params
            if (!username) {
                return res.status(403).json({message: 'Не указан username'})
            }
            const user = await UserService.getUser(username)
            return res.json(user);
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Пользователь не найден'})
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.user.id
            // console.log(userId)
            if (!userId) {
                return res.status(403).json({message: 'Не указан id'})
            }
            const user = await UserService.getUserById(userId)
            return res.json(user);
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Пользователь не найден'})
        }
    }
}

export default new UserController()