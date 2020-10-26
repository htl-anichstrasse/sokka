import 'package:client/handlers/basket_handler/basket_handler.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:client/models/menu.dart';

class BasketView extends StatefulWidget {
    @override 
    _BasketViewState createState() => _BasketViewState();
}

class _BasketViewState extends State<BasketView> {
    @override
    Widget build(BuildContext context) {
        return new ListView.builder(
            itemCount: BasketHandler.getInstance().getBasket().length,
            itemBuilder: (BuildContext context, int index) => new Dismissible(
                key: Key('${BasketHandler.getInstance().getBasket()[index].getTitle} $index'),
                onDismissed: (DismissDirection direction) => {
                    setState(() => BasketHandler.getInstance().getBasket().removeAt(index)),
                    Scaffold.of(context).showSnackBar(new SnackBar(
                            content: new Text('${BasketHandler.getInstance().getBasket()[index].getTitle} has been removed from your basket'),
                            // duration: new Duration(seconds: 1),
                        )
                    ),
                },
                child: new Card(
                    child: new ListTile(
                        leading: BasketHandler.getInstance().getBasket()[index] is Menu ? Icon(Icons.restaurant_menu) : Icon(Icons.fastfood),
                        title: new Text('${BasketHandler.getInstance().getBasket()[index].getTitle}'),
                    ),
                ),
            ),
        );
    }
}