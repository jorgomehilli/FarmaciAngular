export class Product{
    public id: number;
    public name: string;
    public price: string;
    public imgPath: string;

    constructor(name:string, price:string, imagePath:string){
        this.name = name;
        this.price = price;
        this.imgPath = imagePath;

    }
}