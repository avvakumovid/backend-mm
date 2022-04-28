import Categories from "../model/categories.js";

class CategoriesService {
  async createCategories(name) {
    try {
      const categories = new Categories({ name });
      await categories.save();
      return { status: 200, message: "Категория создана" };
    } catch (e) {
      console.log(e);
      return { status: 400, message: e };
    }
  }

  async getCategoriesByName(name) {
    try {
      const categories = await Categories.findOne({ name });
      if (!categories) {
        return { status: 400, message: "Категория не найдена" };
      }
      return { status: 200, categories };
    } catch (e) {
      console.log(e);
      return { status: 400, message: e };
    }
  }
}

export default new CategoriesService();
