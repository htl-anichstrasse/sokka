import 'package:flutter/material.dart';
import 'package:client/views/home_screen.dart';
import 'package:client/views/login_screen.dart';

final Map<String, WidgetBuilder> routes = {
    '/':        (BuildContext buildContext) => new HomeScreen(),
    '/login':   (BuildContext buildContext) => new LoginScreen(),
    '/signup':  (BuildContext buildContext) => null
};