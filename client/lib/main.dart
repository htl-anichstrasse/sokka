import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:client/widgets/tab_controller/tab_controller.dart';

void main() => runApp(Sokka());

class Sokka extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        SystemChrome.setEnabledSystemUIOverlays([]);
        return new MaterialApp(
            debugShowCheckedModeBanner: true,
            theme: new ThemeData(
                primaryColor: Colors.tealAccent[700],
                scaffoldBackgroundColor: Colors.grey[850],
                canvasColor: Colors.grey[850],
                cardColor: Colors.tealAccent[100],
                textTheme: new TextTheme(
                    bodyText2: new TextStyle(color: Colors.black, fontFamily: 'Source Code Pro'),
                    headline4: new TextStyle(color: Colors.white),
                ),
                visualDensity: VisualDensity.adaptivePlatformDensity,
            ),
            home: new HomeTabController(),
        );
    }
}