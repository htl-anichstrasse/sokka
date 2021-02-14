import 'package:client/util/MenuController.dart';
import 'package:client/util/NetworkWrapper.dart';
import 'package:client/util/ProductController.dart';

class FetchOrderabels {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final MenuController _menuController = new MenuController();
    final ProductController _productController = new ProductController();

    static const MENU_ROUTE = 'https://api.sokka.me/menu/get';
    static const PRODUCT_ROUTE = 'https://api.sokka.me/product/get';
}