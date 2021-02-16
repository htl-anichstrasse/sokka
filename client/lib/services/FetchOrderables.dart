import 'package:client/services/BearerAuth.dart';
import 'package:client/util/MenuController.dart';
import 'package:client/util/NetworkWrapper.dart';
import 'package:client/util/ProductController.dart';

class FetchOrderabels {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final BearerAuth _bearerAuth = new BearerAuth();
    final MenuController _menuController = new MenuController();
    final ProductController _productController = new ProductController();

    static const MENU_ROUTE = 'https://api.sokka.me/menu/get';
    static const MENU_ROUTE_NOIMAGE = 'https://api.sokka.me/menu/get?noimage=true';
    static const PRODUCT_ROUTE = 'https://api.sokka.me/product/get';
    static const PRODUCT_ROUTE_NOIMAGE = 'https://api.soka.me/product/get?noimage=true';

    Future<List<dynamic>> getAllMenusWithoutImage() async {
        return await this._networkWrapper
            .post(
                MENU_ROUTE_NOIMAGE,
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken()
                }
            );
    }

    Future<int> getAmountOfMenus() async {
        final response = await this._networkWrapper
            .post(
                MENU_ROUTE_NOIMAGE,
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken()
                }
            );
        return response.length;
    }
}