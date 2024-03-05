import axios from "axios";
import { EntryDTO } from "../entities/entryDTO";

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

  static async createEntry(entry: EntryDTO) {
    try {
      const response = await axios.post(this.baseUrl, entry);
      return response.data;
    } catch (error) {
      console.log("error creating entry", error);
    }
  }

  static async updateEntry(entry: EntryDTO, id: string) {
    try {
      const response = await axios.patch(this.baseUrl + "/" + id, entry);
      return response.data;
    } catch (error) {
      console.log("error updating entry", error);
    }
  }

  static async deleteEntry(id: string) {
    try {
      const response = await axios.delete(this.baseUrl + "/" + id);
      return response.data;
    } catch (error) {
      console.log("error deleting entry", error);
    }
  }
}
