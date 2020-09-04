import 'package:flutter/material.dart';
import 'package:client/widgets/menu/menu_panel.dart';
import 'package:client/widgets/account/account.dart';

class HomeTabController extends StatefulWidget {
    @override
    _HomeTabController createState() => _HomeTabController();
}

class _HomeTabController extends State<HomeTabController> {
    @override
    Widget build(BuildContext context) {
        return new DefaultTabController(
            length: 4,
            child: new Scaffold(
                appBar: new AppBar(
                    title: new Text('SOKKA', style: TextStyle(color: Colors.white)),
                    centerTitle: true,
                    leading: new IconButton(
                        icon: Icon(Icons.account_box, color: Colors.white),
                        onPressed: () => new Account(),
                    ),
                    actions: <Widget>[
                        new IconButton(
                            icon: Icon(Icons.settings, color: Colors.white),
                            onPressed: () => null,
                        ),
                    ],
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
                            new Tab(text: 'Meals', icon: Icon(Icons.set_meal)),
                            new Tab(text: 'Basket', icon: Icon(Icons.shopping_basket)),
                            new Tab(text: 'Codes', icon: Icon(Icons.qr_code)),
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
                                child: new Icon(Icons.set_meal, color: Colors.white),
                            ),
                            new Container(
                                child: new Icon(Icons.shopping_basket, color: Colors.white),
                            ),
                            new Container(
                                child: new Icon(Icons.qr_code, color: Colors.white),
                            ),
                        ],
                    ),
                ),
            ),
        );
    }
}