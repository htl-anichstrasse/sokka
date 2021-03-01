import 'dart:ui';

import 'package:client/models/Product.dart';
import 'package:client/util/ShoppingBasketController.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ProductTile extends StatefulWidget {
    final Product _product;

    ProductTile(this._product);

    @override
    _ProductTileState createState() => _ProductTileState(this._product);
}

class _ProductTileState extends State<ProductTile> {
    final ShoppingBasketController _shoppingBasketController = new ShoppingBasketController();
    final Product _product;

    _ProductTileState(this._product);

    @override
    Widget build(BuildContext context) {
        return new Card(
            color: Colors.transparent,
            shape: new RoundedRectangleBorder(
                borderRadius: new BorderRadius.circular(5.0),
            ),
            clipBehavior: Clip.antiAlias,
            child: new ClipRRect(
                child: new BackdropFilter(
                    filter: new ImageFilter.blur(sigmaX: 16.0, sigmaY: 16.0),
                    child: new Container(
                        decoration: new BoxDecoration(
                            gradient: new LinearGradient(
                                colors: <Color>[
                                    Colors.white.withOpacity(0.7),
                                    Colors.white.withOpacity(0.05),
                                ],
                                stops: [0.0, 1.0],
                                begin: FractionalOffset.topLeft,
                                end: FractionalOffset.bottomRight,
                                tileMode: TileMode.repeated
                            ),
                        ),
                        child: new Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                                new SizedBox(
                                    child: new Padding(
                                        padding: new EdgeInsets.all(12.0),
                                        child: new ClipRRect(
                                            borderRadius: new BorderRadius.circular(5.0),
                                            child: new Image(
                                                image: this._product.getImage
                                            ),
                                        ),
                                    ),
                                ),
                                new SizedBox(
                                    height: 5.0,
                                    child: new Divider(
                                        color: Colors.black,
                                        thickness: 1.0,
                                        indent: 15.0,
                                        endIndent: 15.0,
                                    ),
                                ),
                                new SizedBox(
                                    height: 50.0,
                                    child: new ListTile(
                                        title: new Text(
                                            this._product.getName,
                                            style: GoogleFonts.montserrat(
                                                color: Colors.black,
                                                fontSize: 18.0,
                                            ),
                                        ),
                                    ),
                                ),
                                new Padding(
                                    padding: new EdgeInsets.only(left: 25.0, bottom: 5.0),
                                    child: new Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: <Widget>[
                                            new Container(
                                                child: new Text(
                                                    '${this._product.getPrice.toStringAsFixed(2)} €',
                                                    style: GoogleFonts.montserrat(
                                                        color: Colors.black,
                                                        fontSize: 14.0,
                                                    ),
                                                ),
                                            ),
                                        ],
                                    ),
                                ),
                                new SizedBox(
                                    height: 5.0,
                                    child: new Divider(
                                        color: Colors.black,
                                        thickness: 1.0,
                                        indent: 15.0,
                                        endIndent: 15.0,
                                    ),
                                ),
                                new Container(
                                    padding: new EdgeInsets.only(left: 5.0, bottom: 5.0, right: 25.0),
                                    child: new FlatButton.icon(
                                        onPressed: () => {
                                            this._shoppingBasketController.appendProductToBasket(this._product),
                                            Scaffold.of(context).showSnackBar(new SnackBar(
                                                content: new Text(
                                                    'Product: "${this._product.getName}" has been added to your basket!',
                                                    style: GoogleFonts.montserrat()
                                                ),
                                                duration: new Duration(seconds: 1),
                                            ))
                                        },
                                        label: new Text(
                                            'Add to basket',
                                            maxLines: 2,
                                            style: GoogleFonts.montserrat(
                                                color: Colors.black,
                                                fontSize: 14.0
                                            ),
                                        ),
                                        icon: new Icon(
                                            Icons.shopping_basket,
                                            color: Colors.black,
                                            size: 17,
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