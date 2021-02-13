import Database from "../../Database";

class ProductCategory implements Model {
    private constructor(readonly id: number, public name: string) { }

    static async get(id: number): Promise<ProductCategory> {
        let result = await Database.instance.query('SELECT * FROM sokka_product_categories WHERE id = ?;', [id]);
        return result.length > 0 ? new ProductCategory(result[0].id, result[0].name) : null;
    }

    static async getAll(): Promise<ProductCategory[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_menus_categories;');
        let productCategories = [];
        for (let productCategory of result) {
            productCategories.push(new ProductCategory(productCategory.id, productCategory.name));
        }
        return productCategories;
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default ProductCategory;