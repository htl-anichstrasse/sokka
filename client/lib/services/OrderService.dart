import 'package:client/models/Menu.dart';
import 'package:client/models/Order.dart';
import 'package:client/models/Product.dart';
import 'package:client/services/BearerAuth.dart';
import 'package:client/util/NetworkWrapper.dart';
import 'package:client/util/OrderController.dart';
import 'package:client/util/ShoppingBasketController.dart';
import 'package:intl/intl.dart';

class OrderService {
    final NetworkWrapper _networkWrapper = new NetworkWrapper();
    final BearerAuth _bearerAuth = new BearerAuth();
    final DateFormat _dateFormatter = new DateFormat('yyyy-MM-dd');
    final ShoppingBasketController _basketController = new ShoppingBasketController();
    final OrderController _orderController = new OrderController();

    static const ORDER_CREATE = 'https://api.sokka.me/order/create';
    static const ORDER_GET = 'https://api.sokka.me/order/get';

    Future<void> initializeOrders() async {
        await this.appendOrders();
    }

    Future<void> appendOrders() async {
        final response = await this._networkWrapper
            .get(
                ORDER_GET,
                headers: {
                    'Authorization': this._bearerAuth.createBearerAuthToken(),
                },
            );
        final data = response['orders'];

        for (var order in data) {
            final Map<String, int> menuOrders = new Map<String, int>();
            final Map<String, int> productOrders = new Map<String, int>();

            for (var menu in order['menuOrders']) {
                menuOrders[menu['menu']['name']] = menu['quantity'];
            }
            for (var product in order['productOrders']) {
                productOrders[product['product']['name']] = product['quantity'];
            }
            this._orderController.appendToOrders(order: new Order(orderID: order['id'],
                userID: order['user_id'], rebate: order['rebate'], subTotal: order['total'].toDouble() ,timestamp: _dateFormatter.format(DateTime.parse(order['timestamp'])),
                menuOrders: menuOrders, productOrders: productOrders));
        }
    }

    Future<dynamic> createOrder() async {
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
        return response;
    }

    Future<List<Map<String, int>>> loadProducts() async {
        final List<Product> products = this._basketController.getAllProducts();
        final Map<int, int> productIDtoQuantity = new Map<int, int>();
        List<Map<String, int>> payload = new List<Map<String, int>>.filled(products.length, new Map());

        products.forEach((product) => productIDtoQuantity[product.getID] = !productIDtoQuantity.containsKey(product.getID)
            ? 1
            : productIDtoQuantity[product.getID] + 1);

        final List<int> productIDs = productIDtoQuantity.keys.toList();
        final List<int> quantities = productIDtoQuantity.values.toList();

        for (var i = 0; i < productIDs.length; i++) {
            payload[i] = { 'product_id': productIDs[i], 'quantity': quantities[i] };
        }
        payload = payload.where((product) => product['product_id'] != null).toList();
        
        return payload;
    }

    Future<List<Map<String, int>>> loadMenus() async {
        final List<Menu> menus = this._basketController.getAllMenus();
        final Map<int, int> menuIDToQuantitiy = new Map<int, int>();
        List<Map<String, int>> payload = new List<Map<String, int>>.filled(menus.length, new Map());

        menus.forEach((menu) => menuIDToQuantitiy[menu.getID] = !menuIDToQuantitiy.containsKey(menu.getID)
            ? 1
            : menuIDToQuantitiy[menu.getID] + 1);

        final List<int> menuIDs = menuIDToQuantitiy.keys.toList();
        final List<int> quantities = menuIDToQuantitiy.values.toList();

        for (var i = 0; i < menuIDs.length; i++) {
            payload[i] = { 'menu_id': menuIDs[i], 'quantity': quantities[i] };
        }
        payload = payload.where((menu) => menu['menu_id'] != null).toList();

        return payload;
    }
}