import Product from '../model/product';
import Crud from '../interface/crud';

export default class ProductService implements Crud<Product> {
    private products: Array<Product>;

    constructor(products: Array<Product>) {
        this.products = products;
    }
    findAll(): Product[] {
        return this.products;
    }
    find(name: string): Product | null {
        return this.products.find((p) => p.getName() === name) || null;
    }
    save(product: Product): void {
        this.products.push(product);
    }
    update(name: string, updateProduct: Product): void {
        const product = this.find(name);
        product?.setName(updateProduct.getName());
    }
    delete(name: string): void {
        const i = this.products.findIndex((p) => p.getName() === name);
        this.products.splice(i, 1);
    }
}
