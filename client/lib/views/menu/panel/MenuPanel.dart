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
        return ListView(
            shrinkWrap: true,
            physics: ClampingScrollPhysics(),
            children: <Padding>[
                new Padding(
                    padding: new EdgeInsets.all(10.0),
                    child: new ExpansionPanelList(
                        expansionCallback: (final int index, bool isExpanded) => setState(() => {
                            this._menu.setExpanded = !this._menu.getExpanded
                        }),
                        children: <ExpansionPanel>[
                            this._buildPanel(this._menu)
                        ],                 
                    ),
                ),
            ],
        );
    }

    ExpansionPanel _buildPanel(final Menu menu) {
        return new ExpansionPanel(
            headerBuilder: (BuildContext context, bool isExpanded) {
                return new ListTile(
                    title: new Text(
                        '${menu.getTitle} ${menu.getIndex != null ? menu.getIndex + 1 : ''}',
                        style: GoogleFonts.montserrat(
                            color: Colors.black,
                        ),
                    ),
                );
            },
            isExpanded: menu.getExpanded,  
            body: this._buildPanelBody(menu)
        );
    }

    Widget _buildPanelBody(final Menu menu) {
        return new Padding(
            padding: new EdgeInsets.only(right: 20.0, left: 20.0, bottom: 20.0),
            child: new Column(
                children: <Widget>[
                    new Row(
                        children: <Widget>[
                            new Text(
                                menu.getAppetizer,
                                style: GoogleFonts.montserrat(
                                    color: Colors.black,
                                ),
                            ),
                        ],
                    ),
                    new Row(
                        children: <Widget>[
                            new Text(
                                menu.getMainCourse,
                                style: GoogleFonts.montserrat(
                                    color: Colors.black,
                                ),
                            ),
                        ],
                    ),
                    new Row(
                        children: <Widget>[
                            new Text(
                                menu.getDessert,
                                style: GoogleFonts.montserrat(
                                    color: Colors.black,
                                ),
                            ),
                        ],
                    ),
                    new Container(
                        margin: new EdgeInsets.only(top: 5.0),
                        child: new Row(
                            children: <Widget>[
                                new Text(
                                    '${menu.getPrice.toStringAsFixed(2)} €',
                                    style: GoogleFonts.montserrat(
                                        color: Colors.black
                                    ),
                                ),
                            ],
                        ),
                    ),
                    new Container(
                        alignment: Alignment.center,
                        margin: new EdgeInsets.only(top: 10.0),
                        child: new FlatButton.icon(
                            onPressed: () => {
                                this._shoppingBasketController.appendMenuToBasket(menu),
                                Scaffold.of(context).showSnackBar(new SnackBar(
                                    content: new Text(
                                        'Menu: "${menu.getTitle}" has been added to your basket!',
                                        style: GoogleFonts.montserrat()
                                    ),
                                ))
                            },
                            label: new Text(
                                'Add to basket',
                                style: GoogleFonts.montserrat(
                                    color: new Color(0xFF008C78),
                                ),
                            ),
                            icon: new Icon(
                                Icons.shopping_basket,
                                color: new Color(0xFF008C78),
                            ),
                        ),
                    ),
                ],
            ),
        );
    }
}