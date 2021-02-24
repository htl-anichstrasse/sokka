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

    ShoppingBasketController.internal();
}