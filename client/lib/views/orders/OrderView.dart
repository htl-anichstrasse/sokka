import 'package:client/util/OrderController.dart';
import 'package:flutter/material.dart';
import 'package:client/services/OrderService.dart';
import 'package:client/views/orders/panel/OrderPanel.dart';
import 'package:flutter/widgets.dart';

class OrderView extends StatefulWidget {
    @override 
    _OrderViewState createState() => _OrderViewState();
}

class _OrderViewState extends State<OrderView> { 
    final OrderController _orderController = new OrderController();
    final OrderService _orderService = new OrderService();

    @override
    void initState() {
        super.initState();
        for (var order in this._orderController.getOrders()) {
            print('\n');
            print(order.getMenuOrders);
            print(order.getProductOrders);
            print('\n');
        }
    }

    @override
    Widget build(BuildContext context) {
        return new Builder(
            builder: (context) => new Scaffold(
                body: new Container(
                    decoration: new BoxDecoration(
                        image: new DecorationImage(
                            image: new AssetImage('lib/styles/images/MenuBackground.png'),
                            fit: BoxFit.cover
                        ),
                    ),
                    child: new ListView.builder(
                        itemCount: this._orderController.getOrders().length,
                        itemBuilder: (context, int index) => new OrderPanel(this._orderController.getOrders()[index]),
                    ),
                ),
            ),
        );
    }
}