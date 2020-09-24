import 'dart:io';
import 'package:flutter/material.dart';
import 'package:client/models/menu.dart';
import 'package:client/handlers/menu_handler/menu_handler.dart';

/// ----------------------------------------------------------------------
/// Render-Widget for displaying a menu as foldable expansion panel in the
/// menus section in the app.
/// ----------------------------------------------------------------------
class MenuPanel extends StatefulWidget {
    final int _menuIndex;

    MenuPanel(this._menuIndex);

    @override
    _MenuPanelState createState() => _MenuPanelState(this._menuIndex);
}

class _MenuPanelState extends State<MenuPanel> {
    final int _menuIndex;

    List<Menu> _menus = <Menu>[];

    _MenuPanelState(this._menuIndex);

    @override
    void initState() {
        super.initState();
    }

    @override
    Widget build(BuildContext context) {
        return ListView(
            shrinkWrap: true,
            physics: ClampingScrollPhysics(),
            children: <Widget>[
                new Padding(
                    padding: new EdgeInsets.all(10.0),
                    child: new ExpansionPanelList(
                        expansionCallback: (final int index, bool isExpanded) => setState(() => {
                            MenuHandler.getInstance().getMenus()[index].setExpanded = !MenuHandler.getInstance().getMenus()[index].getExpanded
                        }),
                        children: MenuHandler.getInstance().getMenus().map((Menu menu) {
                            this._buildPanel(menu);
                        }).toList(),                    
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
                        '${menu.getTitle} ${menu.getMenuIndex + 1}',
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
                        onPressed: null,
                        label: new Text('${menu.getPrice.toStringAsFixed(2)} €'),
                        icon: new Icon(Icons.shopping_basket),
                    ),
                ],
            ),
        );
    }
}