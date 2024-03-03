import axios from "axios";
import { CreateEntryDTO } from "../entities/createEntryDTO";

export class EntriesAPI {
  // static baseUrl = "http://localhost:3000/entry";
  static baseUrl = "http://10.0.2.2:3000/entry";

  static async fetchAll() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.log("error fetching entries", error);
    }
  }

  static async fetchEntry(id: string) {
    try {
      const response = await axios.get(this.baseUrl + "/" + id);
      return response.data;
    } catch (error) {
      console.log("error fetching entry", error);
    }
  }



  static async createEntry(entry: CreateEntryDTO) {
    try {
      const response = await axios.post(this.baseUrl, entry);
      return response.data
    } catch (error) {
      console.log("error creating entry", error);
    }
  }
}
