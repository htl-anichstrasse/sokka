import 'package:client/views/LoadingSplashScreen.dart';
import 'package:client/views/SignUpScreen.dart';
import 'package:flutter/material.dart';
import 'package:client/views/HomeScreen.dart';
import 'package:client/views/LoginScreen.dart';

final Map<String, WidgetBuilder> routes = {
    '/':        (BuildContext buildContext) => new HomeScreen(),
    '/login':   (BuildContext buildContext) => new LoginScreen(),
    '/signup':  (BuildContext buildContext) => new SignUpScreen(),
    '/loading': (BuildContext buildContext) => new LoadingSplashScreen()
};