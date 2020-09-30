import 'package:flutter/material.dart';
import 'package:client/models/menu.dart';
import 'package:client/models/meal.dart';

class BasketHandler {
    static BasketHandler _instance;
    List _basket;   

    BasketHandler() {
        if (BasketHandler._instance != null) {
            throw new Exception('[Basket]: Handler has already been instantiated!');
        }
        _instance = this;
        this._basket = [];
    }

    static BasketHandler getInstance() {
        if (BasketHandler._instance != null) {
            return BasketHandler._instance;
        }
        BasketHandler._instance = new BasketHandler();
        return BasketHandler._instance;
    }

    List getBasket() {
        return this._basket;
    }

    void appendMenuToBasket(final Menu menu) {
        this._basket.add(menu);
    }

    void appendMealToBasket(final Meal meal) {
        this._basket.add(meal);
    }   
}