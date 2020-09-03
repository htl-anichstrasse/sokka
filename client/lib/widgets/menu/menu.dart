import 'package:flutter/material.dart';

/// -------------------------------------------------------------------------------
/// Stores all relevant data, such as the different meals and the price of a menu.
/// -------------------------------------------------------------------------------
class Menu {
    int _menuIndex;
    bool _expanded;
    String _header;
    Widget _body;

    Menu(final int menuIndex, final bool expanded, final String header, final String appetizer, final String mainCourse, final String dessert, final double price) {
        this._expanded = expanded;
        this._header = header;
        this._body = new Padding(
            padding: new EdgeInsets.only(right: 20.0, left: 20.0, bottom: 20.0),
            child: new Column(
                children: <Widget>[
                    new Row(
                        children: <Widget>[
                            new Text(appetizer),
                        ],
                    ),
                    new Row(
                        children: <Widget>[
                            new Text(mainCourse),
                        ],
                    ),
                    new Row(
                        children: <Widget>[
                            new Text(dessert),
                        ],
                    ),
                    new FlatButton.icon(
                        onPressed: null,
                        label: new Text('${price.toStringAsFixed(2)} €'),
                        icon: new Icon(Icons.shopping_basket),
                    ),
                ],
            ),
        );
    }

    int get getMenuIndex => _menuIndex;

    bool get getExpanded => _expanded;
    set setExpanded(bool expanded) => _expanded = expanded;

    String get getHeader => _header;
    set setHeader(String header) => _header = header;

    Widget get getBody => _body;
    set setBody(Widget body) => _body = body;
}