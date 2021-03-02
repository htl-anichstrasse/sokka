import 'package:flutter/material.dart';
import 'package:admin_client/screens/auth/LoadingSplashScreen.dart';
import 'package:admin_client/screens/auth/LoginScreen.dart';
import 'package:admin_client/screens/HomeScreen.dart';

final Map<String, WidgetBuilder> routes = {
    '/':        (BuildContext buildContext) => new HomeScreen(),
    '/login':   (BuildContext buildContext) => new LoginScreen(),
    '/loading': (BuildContext buildContext) => new LoadingSplashScreen()
};