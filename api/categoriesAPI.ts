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

  static async createCategory(category: Category) {
    try {
        const response = await axios.post(this.baseUrl, category);
        return response.data;
    } catch(error) {
        console.log("failed creating category", error)
    }
  }

}
