import 'package:client/models/menu.dart';
import 'package:client/models/meal.dart';

class ShoppingBasketController {
    static ShoppingBasketController _instance = new ShoppingBasketController.internal();
    factory ShoppingBasketController() => _instance;

    List _basket = [];   


    List getBasket() {
        return this._basket;
    }

    void appendMenuToBasket(final Menu menu) {
        this._basket.add(menu);
    }

    void appendMealToBasket(final Meal meal) {
        this._basket.add(meal);
    }   

    ShoppingBasketController.internal();
}