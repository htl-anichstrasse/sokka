import 'package:client/util/OrderController.dart';
import 'package:flutter/material.dart';
import 'package:client/services/OrderService.dart';
import 'package:client/views/orders/panel/OrderPanel.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class OrderView extends StatefulWidget {
    @override 
    _OrderViewState createState() => _OrderViewState();
}

class _OrderViewState extends State<OrderView> { 
    final OrderController _orderController = new OrderController();
    final OrderService _orderService = new OrderService();

    @override
    Widget build(BuildContext context) {
        return this._orderController.getOrders().isNotEmpty 
            ? new Builder(
                builder: (context) => new Scaffold(
                    body: new Container(
                        padding: EdgeInsets.all(5.0),
                        decoration: new BoxDecoration(
                            image: new DecorationImage(
                                image: new AssetImage('lib/styles/images/OrderBackground.png'),
                                fit: BoxFit.cover
                            ),
                        ),
                        child: new ListView.builder(
                            itemCount: this._orderController.getOrders().length,
                            itemBuilder: (context, int index) => new OrderPanel(this._orderController.getOrders()[index]),
                        ),
                    ),
                ),
            )
            : new Builder(
                builder: (context) => new Scaffold(
                    body: new Container(
                        padding: EdgeInsets.all(5.0),
                        decoration: new BoxDecoration(
                            image: new DecorationImage(
                                image: new AssetImage('lib/styles/images/OrderBackground.png'),
                                fit: BoxFit.cover
                            ),
                        ),
                        child: new SizedBox.expand(
                            child: new Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                    new Container(
                                        width: 200.0,
                                        height: 200.0,
                                        decoration: new BoxDecoration(
                                            color: Colors.white,
                                            shape: BoxShape.circle,
                                            boxShadow: <BoxShadow>[
                                                new BoxShadow(blurRadius: 8.0, color: Colors.black, spreadRadius: 1),
                                            ],
                                        ),
                                        child: new CircleAvatar(
                                            backgroundColor: Colors.tealAccent[700],
                                            child: new Image(
                                                image: new AssetImage('lib/styles/images/SadSokka.png'),
                                                color: Colors.white,
                                                height: 180.0,
                                            ),
                                        ),
                                    ),
                                    new Container(
                                        padding: new EdgeInsets.only(top: 50.0),
                                        child: new Text(
                                            'You haven\'t placed any orders so far!',
                                            style: GoogleFonts.montserrat(
                                                color: Colors.white,
                                                fontSize: 18.0,
                                            ),
                                        ),
                                    ),
                                ],
                            ),
                        ),
                    ),
                ),
            );
    }
}