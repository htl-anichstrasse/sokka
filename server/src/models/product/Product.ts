import Database from "../../Database";
import ProductCategory from "./ProductCategory";

class Product implements Model {
    constructor(readonly id: number, public category_id: number, public name: string, public image: Blob, public price: number, public hidden: boolean) { }

    static get(id: number): Promise<Product> {
        return new Promise<Product>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_products WHERE id = ?;', [id]).then((result) => {
                if (result.length > 0) {
                    resolve(new Product(result[0].id, result[0].category_id, result[0].name, result[0].image, result[0].price, result[0].hidden));
                } else {
                    reject(new Error('Product not found'));
                }
            }).catch((err) => reject(err));
        });
    }

    getCategory(): Promise<ProductCategory> {
        return ProductCategory.get(this.category_id);
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default Product;