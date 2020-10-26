import 'package:flutter/material.dart';
import 'package:client/models/menu.dart';
import 'package:client/handlers/basket_handler/basket_handler.dart';

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
                        '${menu.getTitle} ${menu.getMenuIndex != null ? menu.getMenuIndex + 1 : ''}',
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
                            new Text(menu.getAppetizer),
                        ],
                    ),
                    new Row(
                        children: <Widget>[
                            new Text(menu.getMainCourse),
                        ],
                    ),
                    new Row(
                        children: <Widget>[
                            new Text(menu.getDessert),
                        ],
                    ),
                    new FlatButton.icon(
                        onPressed: () => {
                            BasketHandler.getInstance().appendMenuToBasket(menu),
                            Scaffold.of(context).showSnackBar(new SnackBar(
                                content: new Text('Menu: "${menu.getTitle}" has been added to your basket!'),
                                // duration: new Duration(seconds: 1),
                            ))
                        },
                        label: new Text('${menu.getPrice.toStringAsFixed(2)} €', style: new TextStyle(color: Colors.grey),),
                        icon: new Icon(Icons.shopping_basket, color: Colors.grey,),
                    ),
                ],
            ),
        );
    }
}