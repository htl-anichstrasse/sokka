import 'package:client/handlers/basket_handler/basket_handler.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:client/models/menu.dart';

class Basket extends StatefulWidget {
    @override 
    _BasketState createState() => _BasketState();
}

class _BasketState extends State<Basket> {
    @override
    Widget build(BuildContext context) {
        return new ListView.builder(
            itemCount: BasketHandler.getInstance().getBasket().length,
            itemBuilder: (BuildContext context, int index) => new Card(
                child: new ListTile(
                    leading: BasketHandler.getInstance().getBasket()[index] is Menu ? Icon(Icons.restaurant) : Icon(Icons.fastfood),
                    title: new Text('${BasketHandler.getInstance().getBasket()[index].getTitle}'),
                    trailing: new Icon(Icons.remove_shopping_cart),
                ),
            ),
        );
    }   
}