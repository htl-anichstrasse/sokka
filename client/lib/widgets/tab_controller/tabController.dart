import 'package:flutter/material.dart';
import 'package:client/widgets/menu/menu.dart';

class HomeTabController extends StatefulWidget {
  @override
  _HomeTabController createState() => _HomeTabController();
}

class _HomeTabController extends State<HomeTabController> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text('SOKKA', style: TextStyle(color: Colors.white)),
          centerTitle: true,
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.account_box, color: Colors.white),
              onPressed: () => null,
            ),
            IconButton(
              icon: Icon(Icons.settings, color: Colors.white,),
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
              Tab(text: 'Wallet', icon: Icon(Icons.account_balance_wallet)),
              Tab(text: 'Menus', icon: Icon(Icons.restaurant_menu)),
              Tab(text: 'Basket', icon: Icon(Icons.shopping_basket)),
            ],
          ),
        ),
        body: TabBarView(
          children: <Widget>[
            Container(child: Icon(Icons.account_balance_wallet, color: Colors.white,)),
            Container(
              child: ListView.builder(
                itemCount: 5,
                itemBuilder: (BuildContext context, int index) {
                  return Menu(index + 1);
                },
              ),
            ),
            Container(child: Icon(Icons.shopping_basket, color: Colors.white,)),
          ],
        ),
      ),
    );
  }
}