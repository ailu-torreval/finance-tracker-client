import { Category } from "./category";

export class Entry {
  id: number;
  amount: number;
  date: Date;
  currency: string;
  name: string;
  // comment: string;
    category?: Category;

  constructor(
    id: number,
    amount: number,
    date: Date,
    currency: string,
    name: string,
    categoryId: number,
    category?: Category
  ) {
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.currency = currency;
    this.name = name;
    this.category = category;
  }
}
