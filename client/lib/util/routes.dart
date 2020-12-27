import 'package:client/views/signup/SignUpScreen.dart';
import 'package:flutter/material.dart';
import 'package:client/views/HomeScreen.dart';
import 'package:client/views/LoginScreen.dart';

final Map<String, WidgetBuilder> routes = {
    '/':        (BuildContext buildContext) => new HomeScreen(),
    '/login':   (BuildContext buildContext) => new LoginScreen(),
    '/signup':  (BuildContext buildContext) => new SignUpScreen(),
};