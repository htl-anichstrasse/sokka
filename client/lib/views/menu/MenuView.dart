import 'package:client/util/MenuController.dart';
import 'package:client/views/menu/card/MenuCard.dart';
import 'package:flutter/material.dart';

class MenuView extends StatefulWidget {
    @override 
    _MenuViewState createState() => _MenuViewState();
}

class _MenuViewState extends State<MenuView> {
    final MenuController _menuController = new MenuController();

    @override
    Widget build(BuildContext context) {
        return new Scaffold(
            body: new Container(
                decoration: new BoxDecoration(
                    image: new DecorationImage(
                        image: new AssetImage('lib/styles/images/LoginBackground.png'),
                        fit: BoxFit.cover,
                    ),
                ),
                padding: EdgeInsets.all(5.0),
                child: new ListView.builder(
                    itemCount: this._menuController.getMenus().length,
                    itemBuilder: (BuildContext context, int index)
                        => new MenuCard((this._menuController.getMenus()[index])),
                ),
            ),
        );
    }
}