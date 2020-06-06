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
        bottomNavigationBar: menu(),
        body: TabBarView(
          children: <Widget>[
            TabViewContainer('1', 'Gemüsesuppe', 'Hühnercurry mit Jasminreis', 'Bananen-Split'),
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
      indicatorColor: Colors.tealAccent[100],
      tabs: [
        Tab(text: 'Wallet', icon: Icon(Icons.account_balance_wallet)),
        Tab(text: 'Menus', icon: Icon(Icons.restaurant_menu)),
        Tab(text: 'Basket', icon: Icon(Icons.shopping_basket)),
      ],
    ),
  );
}

class TabViewContainer extends StatelessWidget {
  final String _menu;
  String _appetizer;
  String _mainCourse;
  String _dessert;

  TabViewContainer(this._menu, final String appetizer, final String mainCourse, final String dessert) {
    this._appetizer = appetizer;
    this._mainCourse = mainCourse;
    this._dessert = dessert;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      color: Colors.amber[300],
      width: 40,
      child: ListView(
        padding: EdgeInsets.all(8.0),
        children: <Widget>[
          Container(
            height: 50,
            color: Colors.amber[600],
            child: Text(
              'Menu 1',
              style: TextStyle(color: Colors.white),
            ),
          ),
          Container(
            height: 50.0,
            child: Text(
              this._appetizer,
              style: TextStyle(color: Colors.white),
            ),
          ),
          Container(
            height: 50.0,
            child: Text(
              this._mainCourse,
              style: TextStyle(color: Colors.white),
            ),
          ),
          Container(
            height: 50.0,
            child: Text(
              this._dessert,
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}