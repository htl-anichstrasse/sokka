import 'package:client/models/Order.dart';

import '';

class OrderController {
    static OrderController _instance = new OrderController.internal();
    factory OrderController() => _instance;

    final List<Order> _orders = new List<Order>();

    List<Order> getOrders() => this._orders;

    void appendToMenus({ final Order order }) {
        this._orders.add(order);
    }

    void appendIterableToMenus({ final List<Order> orders }) {
        this._orders.addAll(orders);
    }

    OrderController.internal();
}