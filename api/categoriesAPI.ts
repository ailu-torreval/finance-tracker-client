import axios from "axios";
import { Category } from "../entities/category";

export class CategoriesAPI {
  static baseUrl = "http://10.0.2.2:3000/category";

  static async fetchAll() {
    try {
        const response =  await axios.get(this.baseUrl);
        return response.data;
    } catch(error) {
        console.log("failed at fetching categories", error)
    }
  }

  static async fetchCategory(id: string) {
    try {
        const response =  await axios.get(this.baseUrl + "/" + id);
        return response.data;
    } catch(error) {
        console.log("failed at fetching category" + id, error)
    }
  }

  static async createCategory(category: Category) {
    try {
        const response = await axios.post(this.baseUrl, category);
        return response.data;
    } catch(error) {
        console.log("failed creating category", error)
    }
  }

  static async updateCategory(categoryName: string, id: string) {
    const newCategoryObject = {name: categoryName}
    try {
      const response = await axios.patch(this.baseUrl + "/" + id, newCategoryObject);
      return response.data;
    } catch (error) {
      console.log("error updating category", error);
    }
  }

  static async deleteCategory(id: string) {
    try {
      const response = await axios.delete(this.baseUrl + "/" + id);
      return response.data;
    } catch (error) {
      console.log("error deleting category", error);
    }
  }

}
