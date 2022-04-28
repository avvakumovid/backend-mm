import CategoriesService from "../service/categoriesService.js";

class CategoriesController {
  async createCategories(req, res) {
    const { name } = req.body;
    const { status, message } = await CategoriesService.createCategories(name);
    return res.status(status).json(message);
  }
}

export default new CategoriesController();
