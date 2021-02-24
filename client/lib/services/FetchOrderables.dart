import 'package:client/models/Menu.dart';
import 'package:client/models/Product.dart';
import 'package:client/services/BearerAuth.dart';
import 'package:client/util/MenuController.dart';
import 'package:client/util/NetworkWrapper.dart';
import 'package:client/util/ProductController.dart';
import 'package:flutter/material.dart';

class FetchOrderables {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final BearerAuth _bearerAuth = new BearerAuth();
    final MenuController _menuController = new MenuController();
    final ProductController _productController = new ProductController();

    static const MENU_ROUTE = 'https://api.sokka.me/menu/get';
    static const PRODUCT_ROUTE = 'https://api.sokka.me/product/get';
    static const IMAGE_ROUTE = 'https://api.sokka.me/image';

    final List<Menu> _menus = new List<Menu>();
    Menu _menu;

    void initializeMenus() {
        (() async {
            this._menu = await this.getMenu(1);
            
        })();
        this._menuController.appendToMenus(this._menu);
    }

    void initializeProducts() {

    }

    Future<int> getAmountOfMenus() async {
        final response = await this._networkWrapper
            .get(
                MENU_ROUTE,
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken()
                }
            );
        return response['data'].length;
    }

    Future<Menu> getMenu(final int menuID) async {
        final auth = this._bearerAuth.createBearerAuthToken();
        print(auth);
        final response = await this._networkWrapper
            .get(
                '$MENU_ROUTE?id=$menuID',
                headers: {
                    'Authorization': auth
                },
            );
        final data = response['data'][0];

        final List<String> products = [];
        for (var element in data['entries']) {
            final productName = await this.getProductName(element['id']);
            products.add(productName);
        }
        
        return new Menu(data['name'], products, new AssetImage('lib/styles/images/SadSokka.png'), data['price'].toDouble());;
    }

    Future<String> getProductName(final int productID) async {
        final response = await this._networkWrapper
            .get(
                '$PRODUCT_ROUTE?id=$productID',
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken(),
                },
            );

        return response['data'][0]['name'];
    }
}