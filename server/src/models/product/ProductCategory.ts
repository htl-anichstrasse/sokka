import Database from "../../Database";

class ProductCategory implements Model {
    private constructor(readonly id: number, public name: string) { }

    static get(id: number): Promise<ProductCategory> {
        return new Promise<ProductCategory>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_product_categories WHERE id = ?;', [id]).then((result) => {
                if (result.length > 0) {
                    resolve(new ProductCategory(result[0].id, result[0].name));
                } else {
                    reject(new Error('ProductCategory not found'));
                }
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default ProductCategory;