import 'package:client/util/MenuController.dart';
import 'package:client/views/menu/panel/MenuPanel.dart';
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
            body: ListView.builder(
                itemCount: this._menuController.getMenus().length,
                itemBuilder: (BuildContext context, int index) => new MenuPanel((this._menuController.getMenus()[index])),
            )
        );

    }
}