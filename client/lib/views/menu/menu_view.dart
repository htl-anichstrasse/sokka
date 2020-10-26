import 'package:client/handlers/menu_handler/menu_handler.dart';
import 'package:client/views/menu/panel/menu_panel.dart';
import 'package:flutter/material.dart';

class MenuView extends StatefulWidget {
    @override 
    _MenuViewState createState() => _MenuViewState();
}

class _MenuViewState extends State<MenuView> {
    @override
    Widget build(BuildContext context) {
        return new ListView.builder(
            itemCount: MenuHandler.getInstance().getMenus().length,
            itemBuilder: (BuildContext context, int index) => new MenuPanel((MenuHandler.getInstance().getMenus()[index])),
        );
    }
}