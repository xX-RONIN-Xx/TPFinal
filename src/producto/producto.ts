export class Producto {
    private _id: string;
    private name: string;
    private description: string;
    private price: number;
    private stock: number;
    private category: string;
    private image: string;

    constructor(id: string, name: string, description: string, price: number, stock: number, category: string, image: string) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.image = image;
    }

    public getID(): string {
        return this._id;
    }
    public setID(value: string) {
        this._id = value;
    }
    public getname() {
        return this.name;
    }
    public getDescription(): string {
        return this.description;
    }
    public setDescription(value: string) {
        this.description = value;
    }
    public getPrice(): number {
        return this.price;
    }
    public setPrice(value: number) {
        this.price = value;
    }

    public getStock(): number {
        return this.stock;
    }
    public setStock(value: number) {
        this.stock = value;
    }
    public getCategory(): string {
        return this.category;
    }
    public setCategory(value: string) {
        this.category = value;
    }
    public getImage(): string {
        return this.image;
    }
    public setImage(value: string) {
        this.image = value;
    }


}