import 'package:flutter/material.dart';
import 'package:client/models/menu.dart';
import 'package:client/views/menu/menu_panel.dart';
import 'package:client/handlers/menu_handler/menu_handler.dart';
import 'package:client/handlers/basket_handler/basket_handler.dart';
import 'package:client/views/account/account_view.dart';
import 'package:client/views/basket/basket_view.dart';

class HomeTabController extends StatefulWidget {
    @override
    _HomeTabController createState() => _HomeTabController();
}       

class _HomeTabController extends State<HomeTabController> {
    final List<String> _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    @override
    Widget build(BuildContext context) {
        return new DefaultTabController(
            length: 4,
            child: new Scaffold(
                appBar: new AppBar(
                    title: new Text('${_days[new DateTime.now().weekday - 1]} - ${new DateTime.now().day}.${new DateTime.now().month}.${new DateTime.now().year}'),
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
                                    child: new Text('SOKKA'),
                                ),
                            ),
                            new ListTile(
                                leading: new Icon(Icons.account_circle, color: Colors.white),
                                title: new Text('Account'),
                                onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (context) => new Account())),
                                onLongPress: () => null,
                            ),
                            new ListTile(
                                leading: new Icon(Icons.account_balance_wallet, color:Colors.white),
                                title: new Text('Wallet'),
                                onTap:() => null,
                                onLongPress: () => null,
                            ),
                            new Spacer(),
                            new Container(
                                child: new ListTile(
                                    leading: new Icon(Icons.settings, color: Colors.white),
                                    title: new Text('Settings'),
                                    onTap: () => null,
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
                                    itemCount: MenuHandler.getInstance().getMenus().length,
                                    itemBuilder: (BuildContext context, int index) => new MenuPanel(MenuHandler.getInstance().getMenus()[index])
                                ),
                            ),
                            new Container(
                                child: new Icon(Icons.fastfood, color: Colors.white),
                            ),
                            new Container(
                                child: new Basket(),
                                // new Icon(Icons.shopping_basket, color: Colors.white),
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