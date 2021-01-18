import 'package:client/models/Product.dart';

class ProductController {
    static ProductController _instance = new ProductController.internal();
    factory ProductController() => _instance;

    List<Product> _products = [];

    List<Product> getProducts() {
        return this._products;
    }

    void appendToProducts(final Product product) {
        this._products.add(product);
    }

    void appentdIterableToProducts(final List<Product> products) {
        this._products.addAll(products);
    }

    void removeFromProductsAt(final int index) {
        this._products.removeAt(index);
    }

    void resetProducts() {
        this._products.clear();
    }

    ProductController.internal();
}