import 'dart:math';

import 'package:flutter/material.dart';
import 'package:client/components/menu/menu_panel.dart';
import 'package:client/components/account/account.dart';
import 'package:flutter/services.dart';

class HomeTabController extends StatefulWidget {
    @override
    _HomeTabController createState() => _HomeTabController();
}

class _HomeTabController extends State<HomeTabController> {
    final _key = GlobalKey<ScaffoldState>();

    @override
    Widget build(BuildContext context) {
        return new DefaultTabController(
            length: 4,
            child: new Scaffold(
                key: _key,
                appBar: new AppBar(
                    title: new Text('${new DateTime.now().day}.${new DateTime.now().month}.${new DateTime.now().year}', style: TextStyle(color: Colors.white)),
                    centerTitle: true,
                    iconTheme: new IconThemeData(color: Colors.white),
                ),
                drawer: new Drawer(
                    child: new Column(
                        children: <Widget>[
                            new DrawerHeader(
                                decoration: new BoxDecoration(color: Colors.tealAccent[700]),
                                child: new Align(
                                    alignment: Alignment.topCenter,
                                    child: new Text('SOKKA', style: new TextStyle(color: Colors.white, fontSize: 25))
                                ),
                            ),
                            new ListTile(
                                leading: new Icon(Icons.account_circle, color: Colors.white),
                                title: new Text('Account', style: new TextStyle(color: Colors.white)),
                                onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (context) => new Account())),
                            ),
                            new ListTile(
                                leading: new Icon(Icons.account_balance_wallet, color:Colors.white),
                                title: new Text('Wallet', style: new TextStyle(color: Colors.white))
                            ),
                            new Spacer(),
                            new Container(
                                decoration: new BoxDecoration(color: Colors.red),
                                child: new ListTile(
                                    leading: new Transform.rotate(
                                        angle: 180 * pi / 180,
                                        child: Icon(Icons.exit_to_app, color: Colors.white)
                                    ),
                                    title: new Text('Hold to exit the app', style: new TextStyle(color: Colors.white)),
                                    onTap: () => null,
                                    onLongPress: () => SystemChannels.platform.invokeMethod('SystemNavigator.pop'),
                                ),
                            ),
                        ],
                    ),
                ),
                bottomNavigationBar: new Container(
                    color: Colors.tealAccent[700],
                    child: new TabBar(
                        labelColor: Colors.white,
                        unselectedLabelColor: Colors.white70,
                        indicatorSize: TabBarIndicatorSize.tab,
                        indicatorPadding: new EdgeInsets.all(5.0),
                        indicatorColor: Colors.tealAccent[100],
                        tabs: [
                            new Tab(text: 'Menus', icon: Icon(Icons.restaurant_menu)),
                            new Tab(text: 'Meals', icon: Icon(Icons.fastfood)),
                            new Tab(text: 'Basket', icon: Icon(Icons.shopping_basket)),
                            new Tab(text: 'Codes', icon: Icon(Icons.code)),
                        ],
                    ),
                ),
                body: new SafeArea(
                    child: new TabBarView(
                        children: <Widget>[
                            new Container(
                                child: new ListView.builder(
                                    itemCount: 5,
                                    itemBuilder: (BuildContext context, int index) => MenuPanel(index + 1)
                                ),
                            ),
                            new Container(
                                child: new Icon(Icons.fastfood, color: Colors.white),
                            ),
                            new Container(
                                child: new Icon(Icons.shopping_basket, color: Colors.white),
                            ),
                            new Container(
                                child: new Icon(Icons.code, color: Colors.white),
                            ),
                        ],
                    ),
                ),
            ),
        );
    }
}