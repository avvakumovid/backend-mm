import Transaction from "../model/transaction.js";
import categoriesService from "./categoriesService.js";

class TransactionService {
  async createTransaction(categoriesName, summa, name) {
    const response = await categoriesService.getCategoriesByName(
      categoriesName
    );
    if (response.status > 200) {
      return { status: response.status, message: response.message };
    }
    const newTransaction = new Transaction({
      categories: response.categories,
      summa,
      name,
    });

    await newTransaction.save();

    // const transaction = await Transaction.findById(newTransaction.id)

    return { status: 200, transaction: newTransaction };
  }

  async getTransactionById(id) {
    const transaction = Transaction.findById(id);
    if (!transaction) {
      return { status: 400, message: "Транзакция не найдена" };
    }
    return { status: 200, transaction };
  }

  async removeTransactionById(id) {
    let transactionId;
    let summa;
    // let transaction = await
    Transaction.findByIdAndRemove(id, function (err, docs) {
      if (err) {
        console.log(err);
        return { status: 400, message: err };
      } else {
        transactionId = docs._id;
        summa = docs.summa;
        console.log(docs);
      }
    });

    // transactionId = transaction._id;
    // summa = transaction.summa;
    // if (!transaction) {
    //   return { status: 400, message: "Транзакция не найдена" };
    // }

    return { status: 200, id, summa };
  }

  async updateTransactionById(id, changes) {
    try {
      const transaction = Transaction.findByIdAndUpdate(
        id,
        { $set: changes },
        function (err, trans) {
          console.log(trans);
        }
      );
      return { status: 200, message: "Транзакция обновленна" };
    } catch (e) {
      return { status: 400, message: e.message };
    }
  }
}

export default new TransactionService();
