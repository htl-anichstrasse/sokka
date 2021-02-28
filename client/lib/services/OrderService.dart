import 'package:client/models/Menu.dart';
import 'package:client/models/Product.dart';
import 'package:client/services/BearerAuth.dart';
import 'package:client/util/NetworkWrapper.dart';
import 'package:client/util/ShoppingBasketController.dart';

class OrderService {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final BearerAuth _bearerAuth = new BearerAuth();
    final ShoppingBasketController _basketController = new ShoppingBasketController();

    static const ORDER_CREATE = 'https://api.sokka.me/order/create';

    Future<void> createOrder() async {
        final response = await this._networkWrapper
            .post(
                ORDER_CREATE,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this._bearerAuth.createBearerAuthToken(),
                },
                body: {
                    'products': await this.loadProducts(),
                    'menus': await this.loadMenus(),
                },
            );
        print(response);
    }

    Future<List<Map<String, int>>> loadProducts() async {
        final List<Product> products = this._basketController.getAllProducts();
        final Map<int, int> productIDtoQuantity = new Map<int, int>();
        final List<Map<String, int>> payload = new List<Map<String, int>>.filled(products.length, new Map());

        products.forEach((product) => productIDtoQuantity[product.getID] = !productIDtoQuantity.containsKey(product.getID)
            ? 1
            : productIDtoQuantity[product.getID] + 1);

        final List<int> productIDs = productIDtoQuantity.keys.toList();
        final List<int> quantities = productIDtoQuantity.values.toList();

        for (var i = 0; i < productIDs.length; i++) {
            payload[i] = { 'product_id': productIDs[i], 'quantity': quantities[i] };
        }

        return payload;
    }

    Future<List<Map<String, int>>> loadMenus() async {
        final List<Menu> menus = this._basketController.getAllMenus();
        final Map<int, int> menuIDToQuantitiy = new Map<int, int>();
        final List<Map<String, int>> payload = new List<Map<String, int>>.filled(menus.length, new Map());

        menus.forEach((product) => menuIDToQuantitiy[product.getID] = !menuIDToQuantitiy.containsKey(product.getID)
            ? 1
            : menuIDToQuantitiy[product.getID] + 1);

        final List<int> menuIDs = menuIDToQuantitiy.keys.toList();
        final List<int> quantities = menuIDToQuantitiy.values.toList();

        for (var i = 0; i < menuIDs.length; i++) {
            payload[i] = { 'menu_id': menuIDs[i], 'quantity': quantities[i] };
        }

        return payload;
    }
}