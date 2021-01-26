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
    double _totalPrice;

    @override
    void initState() {
        super.initState();
        this._totalPrice = 0.0;
    }

    @override
    Widget build(BuildContext context) {
        
        this._shoppingBasketController.getBasket().forEach((orderable) => {
            this._totalPrice += orderable.getPrice
        });

        return this._shoppingBasketController.getBasket().isNotEmpty ? new Scaffold(
            bottomNavigationBar: new BottomAppBar(
                color: new Color(0xFF00BFA5),
                child: new Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                        new Padding(
                            padding: new EdgeInsets.only(right: 100.0),
                            child: new Text(
                                '${this._totalPrice}',
                                style: GoogleFonts.montserrat(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold
                                ),
                            ),
                        ),
                        new FlatButton.icon(
                            icon: new Icon(Icons.payment_outlined, color: Colors.white70),
                            label: new Text(
                                'To checkout',
                                style: GoogleFonts.montserrat(
                                    color: Colors.white
                                )
                            ),
                            onPressed: null
                        ),
                    ],
                ),
            ),
            body: new ListView.builder(
                padding: new EdgeInsets.all(10.0),
                itemCount: this._shoppingBasketController.getBasket().length,
                itemBuilder: (BuildContext context, int index) => new Dismissible(
                    key: new UniqueKey(), // Key('${this._shoppingBasketController.getBasket()[index].getTitle}'),
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
            )
        )
        : new Scaffold(
            body: new SizedBox.expand(
                child: new Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                        new Container(
                            width: 200.0,
                            height: 200.0,
                            child: new Image(
                                image: new AssetImage('lib/styles/images/SadSokka.png'),
                                color: Colors.white,
                            ),
                        ),
                        new Container(
                            child: new Text(
                                'Your shopping basket is empty!',
                                style: GoogleFonts.montserrat(
                                    color: Colors.white,
                                    fontSize: 18.0,
                                ),
                            ),
                        ),
                    ],
                ),
            ),
        );
    }
}