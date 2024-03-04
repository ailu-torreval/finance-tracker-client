import { Category } from "./category";

export class EntryDTO {
  amount: number;
  date: Date;
  currency: string;
  name: string;
  // comment: string;
  categoryId: number | undefined;

  constructor(
    amount: number,
    date: Date,
    currency: string,
    name: string,
    categoryId: number
  ) {
    this.amount = amount;
    this.date = date;
    this.currency = currency;
    this.name = name;
    this.categoryId = categoryId;
  }
}
