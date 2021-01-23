import Database from "../../Database";

class ProductCategory implements Model {
    private constructor(readonly id: number, public name: string) { }

    static async get(id: number): Promise<ProductCategory> {
        let result = await Database.instance.query('SELECT * FROM sokka_product_categories WHERE id = ?;', [id]);
        return result.length > 0 ? new ProductCategory(result[0].id, result[0].name) : null;
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default ProductCategory;