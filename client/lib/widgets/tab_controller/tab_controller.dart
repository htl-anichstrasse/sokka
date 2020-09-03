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
        return DefaultTabController(
            length: 4,
            child: Scaffold(
                appBar: AppBar(
                    title: Text('SOKKA', style: TextStyle(color: Colors.white)),
                    centerTitle: true,
                    leading: IconButton(
                        icon: Icon(Icons.account_box, color: Colors.white),
                        onPressed: () => Account(),
                    ),
                    actions: <Widget>[
                        IconButton(
                            icon: Icon(Icons.settings, color: Colors.white),
                            onPressed: () => null,
                        ),
                    ],
                ),
                bottomNavigationBar: Container(
                    color: Colors.tealAccent[700],
                    child: TabBar(
                        labelColor: Colors.white,
                        unselectedLabelColor: Colors.white70,
                        indicatorSize: TabBarIndicatorSize.tab,
                        indicatorPadding: EdgeInsets.all(5.0),
                        indicatorColor: Colors.tealAccent[100],
                        tabs: [
                            Tab(text: 'Menus', icon: Icon(Icons.restaurant_menu)),
                            Tab(text: 'Meals', icon: Icon(Icons.set_meal)),
                            Tab(text: 'Basket', icon: Icon(Icons.shopping_basket)),
                            Tab(text: 'Codes', icon: Icon(Icons.qr_code)),
                        ],
                    ),
                ),
                body: SafeArea(
                    child: TabBarView(
                        children: <Widget>[
                            Container(
                                child: ListView.builder(
                                    itemCount: 5,
                                    itemBuilder: (BuildContext context, int index) => MenuPanel(index + 1)
                                ),
                            ),
                            Container(
                                child: Icon(Icons.set_meal, color: Colors.white),
                            ),
                            Container(
                                child: Icon(Icons.shopping_basket, color: Colors.white),
                            ),
                            Container(
                                child: Icon(Icons.qr_code, color: Colors.white),
                            ),
                        ],
                    ),
                ),
            ),
        );
    }
}