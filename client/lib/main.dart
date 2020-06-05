import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIOverlays([]);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.tealAccent[700],
        scaffoldBackgroundColor: Colors.grey[850],
        textTheme: TextTheme(
          bodyText2: TextStyle(color: Colors.black, fontFamily: 'Source Code Pro'),
          headline4: TextStyle(color: Colors.white),
        ),
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: TabController()
    );
  }
}

class TabController extends StatefulWidget {
  @override
  _TabController createState() => _TabController();
}

class _TabController extends State<TabController> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text('S O K K A'),
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
        bottomNavigationBar: menu(),
        body: TabBarView(
          children: <Widget>[
            Container(child: Icon(Icons.account_balance_wallet, color: Colors.white,)),
            Container(child: Icon(Icons.restaurant_menu, color: Colors.white,)),
            Container(child: Icon(Icons.shopping_basket, color: Colors.white,)),
          ],
        ),
      ),
    );
  }        
}

Widget menu() {
  return Container(
    color: Colors.tealAccent[700],
    child: TabBar(
      labelColor: Colors.white,
      unselectedLabelColor: Colors.white70,
      indicatorSize: TabBarIndicatorSize.tab,
      indicatorPadding: EdgeInsets.all(5.0),
      indicatorColor: Colors.blue,
      tabs: [
        Tab(text: 'Wallet', icon: Icon(Icons.account_balance_wallet)),
        Tab(text: 'Menus', icon: Icon(Icons.restaurant_menu)),
        Tab(text: 'Basket', icon: Icon(Icons.shopping_basket)),
      ],
    ),
  );
}