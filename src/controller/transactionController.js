import TransactionService from "../service/transactionService"
import CategoriesService from "../service/CategoriesService"


class TransactionController {
    async createTransaction (req, res){
        const {categoriesName, summa} = req.body
        const categories =  await CategoriesService.getCategoriesByName(categoriesName);
        if(categories.status > 200){
            res.status(categories.status).json(categories.message)
        }
        const {status, message} = await TransactionService.createTransaction(categories, summa)
        
        return res.status(status).json(message)
    }
}

export default new TransactionController()