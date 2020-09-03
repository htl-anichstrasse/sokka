import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:client/widgets/tab_controller/tab_controller.dart';

void main() => runApp(Sokka());

class Sokka extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIOverlays([]);
    return MaterialApp(
        debugShowCheckedModeBanner: true,
        theme: ThemeData(
          primaryColor: Colors.tealAccent[700],
          scaffoldBackgroundColor: Colors.grey[850],
          cardColor: Colors.tealAccent[100],
          textTheme: TextTheme(
            bodyText2: TextStyle(color: Colors.black, fontFamily: 'Source Code Pro'),
            headline4: TextStyle(color: Colors.white),
          ),
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: HomeTabController());
  }
}
