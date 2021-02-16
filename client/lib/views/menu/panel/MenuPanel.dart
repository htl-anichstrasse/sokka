import 'dart:ui';

import 'package:client/util/MenuController.dart';
import 'package:flutter/material.dart';
import 'package:client/models/Menu.dart';
import 'package:client/util/ShoppingBasketController.dart';
import 'package:google_fonts/google_fonts.dart';

/// ----------------------------------------------------------------------
/// Render-Widget for displaying a menu as foldable expansion panel in the
/// menus section in the app.
/// ----------------------------------------------------------------------
class MenuPanel extends StatefulWidget {
    final Menu _menu;

    MenuPanel(this._menu);

    @override
    _MenuPanelState createState() => _MenuPanelState(this._menu);
}

class _MenuPanelState extends State<MenuPanel> {
    final ShoppingBasketController _shoppingBasketController = new ShoppingBasketController();
    final Menu _menu;

    _MenuPanelState(this._menu);

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
                                                                this._menu.getTitle,
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
                                                                    new Container(
                                                                        padding: EdgeInsets.only(bottom: 5.0),
                                                                        child: new Text(
                                                                            this._menu.getAppetizer,
                                                                            style: GoogleFonts.montserrat(
                                                                                color: Colors.black,
                                                                                fontSize: 14
                                                                            ),
                                                                        ),
                                                                    ),
                                                                    new Container(
                                                                        padding: EdgeInsets.only(bottom: 5.0),
                                                                        child: new Text(
                                                                            this._menu.getMainCourse,
                                                                            style: GoogleFonts.montserrat(
                                                                                color: Colors.black,
                                                                                fontSize: 14
                                                                            ),
                                                                        ),    
                                                                    ),
                                                                    new Container(
                                                                        padding: EdgeInsets.only(bottom: 5.0),
                                                                        child: new Text(
                                                                            this._menu.getDessert,
                                                                            style: GoogleFonts.montserrat(
                                                                                color: Colors.black,
                                                                                fontSize: 14
                                                                            ),
                                                                        ),
                                                                    ),
                                                                ],
                                                            ),
                                                        ),
                                                    ],
                                                ),
                                            ),
                                            new SizedBox(
                                                width: MediaQuery.of(context).size.width * 0.45,
                                                child: new Image(
                                                    image: new AssetImage('lib/styles/images/SadSokka.png'),
                                                )
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
                                                padding: EdgeInsets.only(left: 15.0, bottom: 5.0),
                                                child: new FlatButton.icon(
                                                    onPressed: () => {
                                                        this._shoppingBasketController.appendMenuToBasket(this._menu),
                                                        Scaffold.of(context).showSnackBar(new SnackBar(
                                                            content: new Text(
                                                                'Menu: "${this._menu.getTitle}" has been added to your basket!',
                                                                style: GoogleFonts.montserrat()
                                                            ),
                                                            duration: new Duration(seconds: 1),
                                                        ))
                                                    },
                                                    label: new Text(
                                                        'Add to basket',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black,
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
}