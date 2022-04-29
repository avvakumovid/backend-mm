import UserService from "../service/userService.js";

class UserController {
  async getAllUsers(req, res) {
    const users = await UserService.getAllUsers();
    if (users.status > 200) {
      return res.status(users.status).json(users.message);
    }
    return res.status(users.status).json(users.users);
  }

  async getUser(req, res) {
    try {
      const { username } = req.params;
      if (!username) {
        return res.status(403).json({ message: "Не указан username" });
      }
      const response = await UserService.getUser(username);
      if (response.status > 200) {
        return res.status(response.status).json(response.message);
      }

      return res.status(response.status).json(response.user);
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Пользователь не найден" });
    }
  }

  async getUserById(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(403).json({ message: "Не указан userId" });
      }
      const response = await UserService.getUserById(userId);
      if (response.status > 200) {
        return res.status(response.status).json(response.message);
      }

      return res.status(response.status).json(response.user);
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Пользователь не найден" });
    }
  }

  async addTransaction(req, res) {
    const { categoriesName, summa, type } = req.body;
    const username = req.user.username;
    const response = await UserService.addTransaction(
      username,
      categoriesName,
      summa,
      type
    );
    return res.status(response.status).json(response.message);
  }

  async deleteTransaction(req, res) {
    const { transactionId, type } = req.query;
    const userId = req.user.id;
    const response = await UserService.deleteTransaction(
      userId,
      transactionId,
      type
    );
    return res.status(response.status).json(response.message);
  }
}

export default new UserController();
