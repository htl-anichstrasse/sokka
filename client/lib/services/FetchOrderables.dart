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

    void initializeMenus() {
        Menu menu;
        (() async {
            menu = await this.getMenu(1);
        })();
        this._menuController.appendToMenus(menu);
    }

    void initializeProducts() {

    }
    /*
    Future<Menu> constructAndAddMenu(final int menuID) async {
        final String name = await this.getMenuName(menuID);
        final productIDs = await this.getMenuProducts(menuID);
        final products = [];
        productIDs.forEach((id) => products.add(this.getProductName(id)));
        final price = await this.getMenuPrice(menuID);
        final image = null;
        this._menus.add(new Menu(name, products, image, price));
    }
    */

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
        // TODO: somehow get all the product names of a menu.
        final List<String> products = [];
        return new Menu(data['name'], data['entries'], new AssetImage('lib/styles/images/SadSokka.png'), data['price']);
    }

    /*
    Future<AssetImage> getImage(final int imageID) async {
        final response = await this._networkWrapper
            .get(
                IMAGE_ROUTE,
                headers: {} 
            );
        
    }
    */


    /*
    Future<double> getMenuPrice(final int menuID) async {
        final response = await this._networkWrapper
            .get(
                '$MENU_ROUTE_NOIMAGE?id=$menuID',
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken(),
                },
            );
        return response.body['data'][0]['price'];
    }

    Future<List<int>> getMenuProducts(final int menuID) async {
        final List<int> productIDs = [];
        final response = await this._networkWrapper
            .get(
                '$MENU_ROUTE_NOIMAGE?id=$menuID',
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken(),
                },
            );
        response.body['data'][0]['entries'].forEach((element)
            => productIDs.add(element['id']));

        return productIDs;
    }
    */
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