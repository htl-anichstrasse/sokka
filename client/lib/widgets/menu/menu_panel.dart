import 'package:flutter/material.dart';
import 'package:client/widgets/menu/menu.dart';

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
        _menus.add(new Menu(this._menuIndex, false, 'Menu', 'appetizer', 'main course', 'dessert', 5.00));
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
                                            '${menu.getHeader} ${menu.getMenuIndex}',
                                            textAlign: TextAlign.left,
                                            style: new TextStyle(fontSize: 20.0, fontWeight: FontWeight.w400),
                                        ),
                                    );
                                },
                                isExpanded: menu.getExpanded,
                                body: menu.getBody
                            );
                        }).toList(),
                    ),
                ),
            ],
        );
    }
}