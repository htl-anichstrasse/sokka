import 'package:flutter/material.dart';

class Menu extends StatefulWidget {
  final int _menuIndex;

  Menu(this._menuIndex);

  @override
  _MenuState createState() => new _MenuState(this._menuIndex);
}

class _MenuState extends State<Menu> {
  final int _menuIndex;

  List<Item> items = <Item>[];

  _MenuState(this._menuIndex);

  @override
  void initState() {
    super.initState();
    items.add(
      Item(
        this._menuIndex,
        false,
        'Menu',
        Padding(
          padding: EdgeInsets.only(right: 20.0, left: 20.0, bottom: 20.0),
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  Text('Appetizer')
                ],
              ),
              Row(
                children: <Widget>[
                  Text('Main Course')
                ],
              ),
              Row(
                children: <Widget>[
                  Text('Dessert')
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  
    

  @override
  Widget build(BuildContext context) {
    return ListView(
      shrinkWrap: true,
      physics: ClampingScrollPhysics(),
      children: <Widget>[
        Padding(
          padding: EdgeInsets.all(10.0),
          child: ExpansionPanelList(
            expansionCallback: (int item, bool _isExpanded) => setState(() => {
              items[item]._isExpandend = !items[item]._isExpandend
            }),
            children: items.map((Item item) {
              return ExpansionPanel(
                headerBuilder: (BuildContext context, bool isExpandend) {
                  return ListTile(
                    title: Text(
                      item._header + ' ${item._menuNumber}',
                      textAlign: TextAlign.left,
                      style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.w400),
                    ),
                  );
                },
                isExpanded: item._isExpandend,
                body: item._body
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}

class Item {
  final int _menuNumber;
  bool _isExpandend;
  final String _header;
  final Widget _body;

  Item(this._menuNumber, this._isExpandend, this._header, this._body);
}

