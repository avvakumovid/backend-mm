import User from "../model/user.js";
import TransactionService from "./transactionService.js";

class UserService {
  async createUser(username, password) {
    try {
      const user = new User({ username, password });
      await user.save();
      return { status: 200, message: "Пользователь создан" };
    } catch (e) {
      console.log(e);
      return { status: 400, message: "Registration error" };
    }
  }

  async getUser(username) {
    const user = await User.findOne({ username });
    if (user) {
      return { status: 200, user };
    }
    return { status: 400, message: "Пользователь не найден" };
  }

  async getUserById(id) {
    const user = await User.findById(id)
      .populate({
        path: "income",
        populate: {
          path: "categories",
        },
      })
      .populate({
        path: "expenses",
        populate: {
          path: "categories",
        },
      });
    if (user) {
      return { status: 200, user };
    }
    return { status: 400, message: "Пользователь не найден" };
  }

  async getAllUsers() {
    const users = await User.find();
    if (users) {
      return { status: 200, users };
    }
    return { status: 400, message: "Список пользователей пуст" };
  }

  async addTransaction(username, categoriesName, summa, type, name) {
    const responseUser = await this.getUser(username);
    if (responseUser.status > 200) {
      return responseUser;
    }
    const responseTransaction = await TransactionService.createTransaction(
      categoriesName,
      summa,
      name
    );
    if (responseTransaction.status !== 200) {
      return responseTransaction;
    }

    responseUser.user[type].push(responseTransaction.transaction);
    responseUser.user.totalMoney += responseTransaction.transaction.summa;

    await responseUser.user.save();
    return { status: 200, message: "Транзакция проведена" };
  }

  async deleteTransaction(userId, transactionId, type) {
    const response = await TransactionService.removeTransactionById(
      transactionId
    );

    if (response.status > 200) {
      return transaction;
    }

    const { id, summa } = response;

    User.findByIdAndUpdate(
      userId,
      // { totalMoney: 239 },
      {
        $pull: { [type]: id },
        $inc: { totalMoney: -parseInt(summa) },
      },

      function (err, model) {
        if (err) {
          console.log(err);
        }
      }
    );

    // await responseUser.save();
    return { status: 200, message: "Транзакция удалена" };
  }

  async updateTransaction(transactionId, changes) {
    const response = await TransactionService.removeTransactionById(
      transactionId
    );

    if (response.status > 200) {
      return transaction;
    }
  }
}

export default new UserService();
