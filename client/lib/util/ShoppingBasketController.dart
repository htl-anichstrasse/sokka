import 'package:client/models/Menu.dart';
import 'package:client/models/Product.dart';

class ShoppingBasketController {
    static ShoppingBasketController _instance = new ShoppingBasketController.internal();
    factory ShoppingBasketController() => _instance;

    List<dynamic> _basket = new List<dynamic>();

    List getBasket() {
        return this._basket;
    }

    void appendMenuToBasket(final Menu menu) {
        this._basket.add(menu);
    }

    void appendProductToBasket(final Product product) {
        this._basket.add(product);
    }   

    List<Menu> getAllMenus() {
        List<Menu> menus = new List<Menu>();
        this._basket.forEach((item) => item is Menu ? menus.add(item) : null);
        return menus;
    }

    List<Product> getAllProducts() {
        List<Product> products = new List<Product>();
        this._basket.forEach((item) => item is Product ? products.add(item) : null);
        return products;
    }

    ShoppingBasketController.internal();
}