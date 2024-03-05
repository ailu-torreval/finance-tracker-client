export class Category {
    name: string;
    id?: number | undefined;

    constructor(name: string, id?:number) {
        this.name = name;
        this.id = id;
    }
}