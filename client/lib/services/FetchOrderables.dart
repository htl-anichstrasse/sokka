import 'package:client/models/Menu.dart';
import 'package:client/models/MenuEntry.dart';
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

    Future<void> initializeMenus() async{
        await this.appendMenus();
    }

    Future<void> initializeProducts() async {
        await this.appendProducts();
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

    Future<int> getAmountOfProducts() async {
        final response = await this._networkWrapper
            .get(
                PRODUCT_ROUTE,
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken()
                }
            );
        return response['data'].length;
    }

    Future<void> appendMenus() async {
        final auth = this._bearerAuth.createBearerAuthToken();
        final response = await this._networkWrapper
            .get(
                '$MENU_ROUTE',
                headers: {
                    'Authorization': auth
                },
            );
        final data = response['data'];

        for (var i = 0; i < data.length; i++) {
            var menu = data[i];
            List<MenuEntry> entries = new List<MenuEntry>();
            for (var entry in data[i]['entries']) {
                entries.add(new MenuEntry(titleID: entry['title_id'], menuID: entry['menu_id'],
                    product: await this.getProduct(entry['product_id'])));
            }
            this._menuController.appendToMenus(new Menu(menuID: menu['id'], name: menu['name'], entries: entries,
                image: await this.getImage(menu['image_id']), price: menu['price'].toDouble(),
                isHidden: menu['hidden'] == 1));
        }
    }

    Future<String> getProductName(final int productID) async {
        final response = await this._networkWrapper
            .get(
                '$PRODUCT_ROUTE?id=$productID',
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken(),
                },
            );
        return response['data'].where((product) => product['id'] == productID)['name'];
    }

    Future<void> appendProducts() async {
        final response = await this._networkWrapper
            .get(
                '$PRODUCT_ROUTE',
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken(),
                },
            );
        final data = response['data'];

        for (var product in data) {
            this._productController.appendToProducts(new Product(productID: product['id'], name: product['name'], price: product['price'].toDouble(),
                image: await this.getImage(product['image_id']), isHidden: product['hidden'] == 1));
        }
    }

    Future<Product> getProduct(final int productID) async {
        final response = await this._networkWrapper
            .get(
                '$PRODUCT_ROUTE?id=$productID',
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken(),
                },
            );
        final data = response['data'].where((product) => product['id'] == productID).toList()[0];

        return new Product(productID: productID, name: data['name'], price: data['price'].toDouble(),
            image: await this.getImage(data['image_id']), isHidden: data['hidden'] == 1);
    }

    Future<NetworkImage> getImage(final String imageID) async {
        return new NetworkImage('$IMAGE_ROUTE?id=$imageID');
    }
}