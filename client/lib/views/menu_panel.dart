import 'package:flutter/material.dart';
import 'package:client/models/menu.dart';

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
        _menus = [
            new Menu(this._menuIndex, false, 'Veggie', 'Couscous salad', 'Spring rolls', 'Banana split', 4.50),
        ];
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
                        expansionCallback: (int index, bool _isExpanded) => setState(() => {
                            _menus[index].setExpanded = !_menus[index].getExpanded
                        }),
                        children: _menus.map((Menu menu) {
                            return new ExpansionPanel(
                                headerBuilder: (BuildContext context, bool isExpandend) {
                                    return new ListTile(
                                        title: new Text(
                                            '${menu.getTitle} ${menu.getMenuIndex}',
                                            textAlign: TextAlign.left,
                                        ),
                                    );
                                },
                                isExpanded: menu.getExpanded,
                                body: this._buildPanelBody(menu)
                            );
                        }).toList(),
                    ),
                ),
            ],
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