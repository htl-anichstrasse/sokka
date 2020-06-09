import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:client/widgets/tab_controller/tabController.dart';
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
        cardColor: Colors.amber[300],
        textTheme: TextTheme(
          bodyText2: TextStyle(color: Colors.black, fontFamily: 'Source Code Pro'),
          headline4: TextStyle(color: Colors.white),
        ),
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomeTabController()
    );
  }
}