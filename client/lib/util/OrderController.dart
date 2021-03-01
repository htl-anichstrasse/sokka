import 'package:client/models/Order.dart';

import '';

class OrderController {
    static OrderController _instance = new OrderController.internal();
    factory OrderController() => _instance;

    final List<Order> _orders = new List<Order>();

    List<Order> getOrders() => this._orders;

    void appendToOrders({ final Order order }) {
        this._orders.add(order);
    }

    void appendIterableToOrders({ final List<Order> orders }) {
        this._orders.addAll(orders);
    }

    void clearOrders() => this._orders.clear();

    OrderController.internal();
}