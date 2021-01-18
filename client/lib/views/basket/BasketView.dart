import 'package:client/util/ShoppingBasketController.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:client/models/Menu.dart';
import 'package:google_fonts/google_fonts.dart';
class BasketView extends StatefulWidget {
    @override 
    _BasketViewState createState() => _BasketViewState();
}

class _BasketViewState extends State<BasketView> { 
    final ShoppingBasketController _shoppingBasketController = new ShoppingBasketController();

    @override
    Widget build(BuildContext context) {
        return new ListView.builder(
            padding: new EdgeInsets.all(10.0),
            itemCount: this._shoppingBasketController.getBasket().length,
            itemBuilder: (BuildContext context, int index) => new Dismissible(
                key: Key('${this._shoppingBasketController.getBasket()[index].getTitle}'),
                onDismissed: (DismissDirection direction) => {
                    setState(() => this._shoppingBasketController.getBasket().removeAt(index)),
                    Scaffold.of(context).showSnackBar(new SnackBar(
                            content: new Text(
                                '${this._shoppingBasketController.getBasket()[index].getTitle} has been removed from your basket',
                                style: GoogleFonts.montserrat(),
                            ),      // duration: new Duration(seconds: 1),
                        ),
                    ),
                },
                child: new Card(
                    child: new ListTile(
                        leading: this._shoppingBasketController.getBasket()[index] is Menu
                            ? Icon(Icons.restaurant_menu)
                            : Icon(Icons.fastfood),
                        title: new Text(
                            '${this._shoppingBasketController.getBasket()[index].getTitle}',
                            style: GoogleFonts.montserrat(
                                color: Colors.black,
                            ),
                        ),                    
                        trailing: new Text(
                            '${this._shoppingBasketController.getBasket()[index].getPrice.toStringAsFixed(2)} €',
                            style: GoogleFonts.montserrat(
                                color: Colors.black,
                            ),
                        ),
                    ),
                ),
            ),
        );
    }
}