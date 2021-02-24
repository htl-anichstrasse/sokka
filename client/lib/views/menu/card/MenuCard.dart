import 'dart:ui';

import 'package:client/models/MenuEntry.dart';
import 'package:flutter/material.dart';
import 'package:client/models/Menu.dart';
import 'package:client/util/ShoppingBasketController.dart';
import 'package:google_fonts/google_fonts.dart';

/// ----------------------------------------------------------------------
/// Render-Widget for displaying a menu as foldable expansion panel in the
/// menus section in the app.
/// ----------------------------------------------------------------------
class MenuCard extends StatefulWidget {
    final Menu _menu;

    MenuCard(this._menu);

    @override
    _MenuCardState createState() => _MenuCardState(this._menu);
}

class _MenuCardState extends State<MenuCard> {
    final ShoppingBasketController _shoppingBasketController = new ShoppingBasketController();
    final Menu _menu;

    _MenuCardState(this._menu);

    @override
    Widget build(BuildContext context) {
        return new Card(
            color: Colors.transparent,
            shape: new RoundedRectangleBorder(
                borderRadius: new BorderRadius.circular(20.0),
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
                                children: <Widget> [
                                    new Row(
                                        children: <Widget>[
                                            new SizedBox(
                                                width: MediaQuery.of(context).size.width * 0.50,
                                                child: new Column(
                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                    children: <Widget>[
                                                        new ListTile(
                                                            title: new Text(
                                                                this._menu.getName,
                                                                style: GoogleFonts.montserrat(
                                                                    color: Colors.black,
                                                                    fontSize: 18.0,
                                                                ),
                                                            ),
                                                        ),
                                                        new Padding(
                                                            padding: new EdgeInsets.only(left: 30.0, bottom: 10.0),
                                                            child: new Column(
                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                children: <Widget>[
                                                                    for (MenuEntry entry in this._menu.getEntries)
                                                                        this._createItemContainer(entry),
                                                                ],
                                                            ),
                                                        ),
                                                        new Padding(
                                                            padding: new EdgeInsets.only(left: 30.0, top: 5.0),
                                                            child: new Text(
                                                                '${this._menu.getPrice.toStringAsFixed(2)} €',
                                                                style: GoogleFonts.montserrat(
                                                                    color: Colors.black,

                                                                ),
                                                            ),
                                                        ),
                                                    ],
                                                ),
                                            ),
                                            new SizedBox(
                                                width: MediaQuery.of(context).size.width * 0.45,
                                                child: new Padding(
                                                    padding: new EdgeInsets.only(right: 12, top: 12),
                                                    child: new ClipRRect(
                                                        borderRadius: new BorderRadius.circular(10.0),
                                                        child: new Image(
                                                            image: this._menu.getImage
                                                        ),
                                                    ),
                                                ),
                                            ),
                                        ],
                                    ),
                                    new Divider(
                                        thickness: 1.0,
                                        color: Colors.black,
                                        indent: 20.0,
                                        endIndent: 20.0,
                                    ),
                                    new Row(
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        children: <Widget>[
                                            new Container(
                                                padding: new EdgeInsets.only(left: 25.0, bottom: 10.0, right: 25.0),
                                                child: new FlatButton.icon(
                                                    onPressed: () => {
                                                        this._shoppingBasketController.appendMenuToBasket(this._menu),
                                                        Scaffold.of(context).showSnackBar(new SnackBar(
                                                            content: new Text(
                                                                'Menu: "${this._menu.getName}" has been added to your basket!',
                                                                style: GoogleFonts.montserrat()
                                                            ),
                                                            duration: new Duration(seconds: 1),
                                                        ))
                                                    },
                                                    label: new Text(
                                                        'Add to basket',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black,
                                                            fontSize: 14.0
                                                        ),
                                                    ),
                                                    icon: new Icon(
                                                        Icons.shopping_basket,
                                                        color: Colors.black,
                                                    ),
                                                ),
                                            ),
                                        ],
                                    ),
                                ],
                            ),
                    ),
                ),
            ),
        );
    }

    Widget _createItemContainer(final MenuEntry entry) {
        return new Container(
            padding: EdgeInsets.only(bottom: 5.0),
            child: new Text(
                entry.getProduct.getName,
                style: GoogleFonts.montserrat(
                    color: Colors.black,
                    fontSize: 14
                ),
            ),
        );
    }
}