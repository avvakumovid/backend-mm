import Transaction from "../model/transaction.js";
import categoriesService from "./categoriesService.js";

class TransactionService {
  async createTransaction(categoriesName, summa) {
    const response = await categoriesService.getCategoriesByName(
      categoriesName
    );
    if (response.status > 200) {
      return { status: response.status, message: response.message };
    }
    const newTransaction = new Transaction({
      categories: response.categories,
      summa,
    });

    await newTransaction.save();

    // const transaction = await Transaction.findById(newTransaction.id)

    return { status: 200, transaction: newTransaction };
  }
}

export default new TransactionService();
